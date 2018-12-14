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

module.exports = {

  randomTitle: function(list){
    var time = new Date();
    var seed = time.getUTCSeconds() + phase(time.getFullYear(), time.getMonth() + 1, time.getDate());
    var randomElementId = seed % list.length;
    var picked = list[randomElementId];

    picked = "<p id='Picked'>" + picked + '</p>';

    return picked;
    },

  sin: function(month, day){
    var sinus = day / month;
    return sinus;
  }
}
