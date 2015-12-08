$(document).ready(function () {
  $(".insertGloranthaRune").click(function () {
    var module = $("#gloranthaRuneModal");
    if (module.css('display') != "none") {
      module.slideUp("fast");
    } else {
      module.slideDown("fast");
    }
  });

  $("#gloranthaRuneModal").on('click', '.gloranthaRune', function(){
    var char = ($(this).text());
    var padeditor = require('ep_etherpad-lite/static/js/pad_editor').padeditor;
    $("#gloranthaRuneModal").slideUp("fast");
    padeditor.ace.callWithAce(function (ace) {
      var rep = ace.ace_getRep();
      ace.ace_replaceRange(rep.selStart, rep.selEnd, char);
    }, "gloranthaRunes", true);
    padeditor.ace.callWithAce(function (ace) {
      var rep = ace.ace_getRep();
      rep.selStart[1]--;
      ace.ace_doInsertColorz(char);
      rep.selStart[1]++;
      ace.ace_focus();
    }, "gloranthaRunes", true);
  });

  var runes = ",./01234567?ABCEFGHKLMOPQRSVWXYabcdefghijklnopstuwxy";
  var i = 0;
  var total = 65535;
  while (i < runes.length){
    //var hex = (0xe800|i).toString(16);
    $('.gloranthaRunes').append("<li class='gloranthaRune glorantha-rune'>"+runes[i]+"</li>");
    i++;
  }

});
