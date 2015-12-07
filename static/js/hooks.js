var _ = require('ep_etherpad-lite/static/js/underscore');

exports.aceInitInnerdocbodyHead = function(hook_name, args, cb) {
  args.iframeHTML.push('<link rel="stylesheet" type="text/css" href="/static/plugins/ep_glorantha_runes/static/css/ace.css"/>');
  return cb();
};

exports.aceAttribsToClasses = function(hook_name, args) {
  debugger;
  if (args.key == 'gloranthaRunes')
  {
    return ["gloranthaRunes"];
  }
};

function doInsertSymbol(char) {
  var rep = this.rep,
  documentAttributeManager = this.documentAttributeManager;
  
  if (!(rep.selStart && rep.selEnd) || !char){
    return;
  }
  
  documentAttributeManager.setAttributesOnRange(rep.selStart, rep.selEnd, [["gloranthaRunes", ""]]);
  this.editorInfo.ace_replaceRange(rep.selStart, rep.selEnd, char);
}

exports.aceInitialized = function(hook_name, context) {
  var editorInfo = context.editorInfo;
  editorInfo.ace_doInsertSymbol = _(doInsertSymbol).bind(context);
}

exports.aceCreateDomLine = function(hook_name, args, cb) {
  if (args.cls.indexOf('gloranthaRunes:') >= 0) {
    var clss = [];
    var argClss = args.cls.split(" ");
     var value;

    for (var i = 0; i < argClss.length; i++) {
      var cls = argClss[i];
      if (cls.indexOf("gloranthaRunes:") != -1) {
	value = cls.substr(cls.indexOf(":")+1);
      } else {
	clss.push(cls);
      }
    }

      return cb([{cls: clss.join(" "), extraOpenTags: "<span class='specialCharacters'><span class='media'>" + exports.cleanEmbedCode(unescape(value)) + "</span><span class='character'>", extraCloseTags: '</span>'}]);
  }

  return cb();
};


var wrap = function (obj) {
  var wrapper = $("<div></div>");
  wrapper.append(obj);
  return wrapper;
}
