/*
* 0: New Moon
* 1: Waxing Crescent Moon
* 2: Quarter Moon
* 3: Waxing Gibbous Moon
* 4: Full Moon
* 5: Waning Gibbous Moon
* 6: Last Quarter Moon
* 7: Waning Crescent Moon
*/

function moonPhase (year, month, day){
  var days = ((365.25 * year) + (30.6 * month) + day - 694039.09) / 29.5305882;
  var phase = days % 1;
  phase = phase * 8;
  phase = phase.toFixed();

  if(phase == 8) {
    phase = 0;
  }

  return phase;
}

function sunAngle(time, longitude, latitude){

  var deg2rad = Math.PI / 180;

  //Koordynaty pozycji geograficznej
  //var long = 6.5;
  //var lat = 46.5;

  var long = longitude;
  var lat = latitude;

  //Dzien roku
  var now = time;
  var yearBegginning = new Date(time.getFullYear(), 0, 0);
  var dayOfYear = now - yearBegginning;
  dayOfYear = Math.floor(dayOfYear / 1000 / 60 / 60 / 24);

  //data julianska
  var hour = time.getHours() + (time.getMinutes() / 60) + (time.getSeconds() / 3600)
  var delta = time.getFullYear() - 1949;
  var leap = Math.floor(delta/4);
  var julianDate = 32916.5 + delta * 365 + leap + dayOfYear + hour / 24;
  var jdtime = julianDate - 51545;

  //Mean longitude
  var mnlong = 280.460 + (0.9856474 * jdtime);
  mnlong = mnlong % 360;
  if(mnlong < 0) mnlong = mnlong + 360;

  //Mean anomaly
  var mnanom = 257.528 + (0.9856003 * jdtime);
  mnanom = mnanom % 360;
  if(mnanom < 0 ) mnanom = mnanom + 360;
  mnanom = mnanom * deg2rad;

  //Ecliptic longitude and obliquity of ecliptic
  var eclong = mnlong + (1.915 * Math.sin(mnanom)) + (0.020 * Math.sin(2 * mnanom));
  eclong = eclong % 360;
  if(eclong < 0) eclong = eclong + 360;

  var oblqec = 23.439 - 0.0000004 * jdtime;
  eclong = eclong * deg2rad;
  oblqec = oblqec * deg2rad;

  //Celestial coordinates
  //Right ascension and declination
  var num = Math.cos(oblqec) * Math.sin(eclong);
  var den = Math.cos(eclong);
  var ra = Math.atan(num/den);
  if(den < 0) ra = ra + Math.PI;
  else ra = ra * Math.PI * 2;
  var dec = Math.asin(Math.sin(oblqec) * Math.sign(eclong));

  //Local coordinates (Greenwich by default)
  var gmst = 6.697375 + 0.0657098242 * jdtime + hour;
  gmst = gmst % 24;
  if(gmst < 0) gmst = gmst + 24.0;

  //Local mean sidereal time
  var lmst = gmst + (long / 15.0);
  lmst = lmst % 24;
  if(lmst < 0) lmst = lmst + 24.0;
  lmst = lmst * 15.0 * deg2rad;

  //Hour angle
  var ha = lmst - ra;
  if(ha < -Math.PI) ha = ha + (2 * Math.PI);
  else if (ha > Math.PI) ha = ha - (2 * Math.PI);

  //Latitude to radians
  lat = lat * (2 * Math.PI);

  //----------------------------
  //Azimuth and elevation
  var preEl = (Math.sin(dec) * Math.sin(lat)) + (Math.cos(dec) * Math.cos(lat) * Math.cos(ha));
  var elevation = Math.asin(preEl);
  var preAz = -Math.cos(dec) * Math.sin(ha) / Math.cos(elevation);
  var azimuth = Math.asin(preAz);

  var cosAzPos = 0 <= (Math.sin(dec) - (Math.sin(elevation) * Math.sin(lat)));
  var sinAzNeg = Math.sin(azimuth) < 0;
  if (cosAzPos && sinAzNeg) azimuth = azimuth + (2 * Math.PI);
  if (!cosAzPos) azimuth = Math.PI  - azimuth;

  elevation = elevation / deg2rad;
  azimuth = azimuth / deg2rad;
  lat = lat / deg2rad;

  //Normalizacja wyniku do liczby calkowitej w celu użycia w seedzie
  var endValue = elevation + azimuth;
  endValue = endValue * 10000;
  endValue = Math.floor(endValue);
  return endValue;
}

function name (username){
  var length = username.length;
  var sum = 0;

  for (var i = 0; i < length; i++){
    sum = sum + username.charCodeAt(i);
  }

  return sum;
}

module.exports = {

  randomTitle: function(list, username){
    var time = new Date();
    var seed = moonPhase(time.getFullYear(), time.getMonth() + 1, time.getDate())
                + name(String(username))
                + sunAngle(time, 6.5, 46.5);
    var randomElementId = seed % list.length;
    var picked = list[randomElementId];

    picked = "<p id='Picked'>" + picked + '</p>';

    return picked;
    },

  sin: function(month, day){
    if(month>day){
      var sinus = day / month;
      sinus = parseFloat(sinus.toFixed(2));
      return sinus;
    }
    return sinus;
  }
}
