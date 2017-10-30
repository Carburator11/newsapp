


module.exports ={
  dateFull: function(e){
      let now = new Date();
      let sec = now.getSeconds();
      let min = now.getMinutes();
      let hh  = now.getHours();
      let dd  = now.getDate();
      let mm  = now.getMonth()+1; //January is 0!
      let yyyy = now.getFullYear();
      if(sec<10){ sec='0'+sec;}
      if(min<10){ min='0'+min;}
      if(hh<10){ hh='0'+hh;}
      if(dd<10){ dd='0'+dd;}
      if(mm<10){ mm='0'+mm;}

      return hh+":"+min+":"+sec+" - "+dd+'/'+mm+'/'+yyyy;
    },

  dateShort: function(e){
      let now = new Date();
      let dd  = now.getDate();
      let mm  = now.getMonth()+1; //January is 0!
      let yyyy = now.getFullYear();
      if(dd<10){ dd='0'+dd;}
      if(mm<10){ mm='0'+mm;}
      return yyyy+""+mm+""+dd;
      }

}
