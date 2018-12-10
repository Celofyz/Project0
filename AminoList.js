var amiList = [];

module.exports = {
  addAmino: function (amino){
    amiList.push(amino);
  },

  get: function(){
    var list = '';

    amiList.forEach(function(element){
      list = list + element + "\n";
    });

    return list;
  }
}
