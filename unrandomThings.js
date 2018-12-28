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

function phase (year, month, day){
  var days = ((365.25 * year) + (30.6 * month) + day - 694039.09) / 29.5305882;
  var phase = days % 1;
  phase = phase * 8;
  phase = phase.toFixed();

  if(phase == 8) {
    phase = 0;
  }

  return phase;
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
    var seed = time.getUTCSeconds()
                + phase(time.getFullYear(), time.getMonth() + 1, time.getDate())
                + name(String(username));
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
