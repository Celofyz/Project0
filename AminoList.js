var amiList = [];

module.exports = {
  addAmino: function (amino){
    amiList.push(amino);
  },

  clearAminos: function (){
    amiList = [];
  },

  get: function(){
    var list = '';

    for(var i = 0; i < amiList.length; i++){
      if(i != amiList.length - 1){
        list = list + "<a id='notlast'>" + amiList[i] + "</a>" + "<br>";
      }else{
        list = list + "<a>" + amiList[i] + "</a>" + "<br>"; //ostatni element
      }

    }

    return list;
  }
}
