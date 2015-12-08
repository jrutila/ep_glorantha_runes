var _, $, jQuery;

var $ = require('ep_etherpad-lite/static/js/rjquery').$;
var _ = require('ep_etherpad-lite/static/js/underscore');
var Changeset = require('ep_etherpad-lite/static/js/Changeset');

exports.aceInitInnerdocbodyHead = function(hook_name, args, cb) {
  args.iframeHTML.push('<link rel="stylesheet" type="text/css" href="/static/plugins/ep_glorantha_runes/static/css/fontello-0d6af716/css/glorantha_runes.css"/>');
  args.iframeHTML.push('<link rel="stylesheet" type="text/css" href="/static/plugins/ep_glorantha_runes/static/css/font.css"/>');
  return cb();
};

// Bind the event handler to the toolbar buttons
var postAceInit = function(hook, context){
};

// Our colors attribute will result in a heaading:h1... :h6 class
function aceAttribsToClasses(hook, context){
  if(context.key.indexOf("kolor:") !== -1){
    var color = /(?:^| )kolor:(.*)/.exec(context.key);
    return ['kolor:' + color[1] ];
  }
  if(context.key == 'kolor'){
    return ['kolor:' + context.value ];
  }
}


// Here we convert the class color:red into a tag
exports.aceCreateDomLine = function(name, context){
  var cls = context.cls;
  var domline = context.domline;
  var colorsType = /(?:^| )kolor:(.*)/.exec(cls);
      
  if (colorsType){
    var modifier = {
      extraOpenTags: '<span class="glorantha-rune">',
      extraCloseTags: '</span>',
      cls: cls
    };
    return [modifier];
  }
  return [];
};



// Find out which lines are selected and assign them the colors attribute.
// Passing a level >= 0 will set a colors on the selected lines, level < 0 
// will remove it
function doInsertColorz(char){
  var level = 1;
  var rep = this.rep,
    documentAttributeManager = this.documentAttributeManager;
  if (!(rep.selStart && rep.selEnd) || !char){
    return;
  }
  
  var acs = documentAttributeManager.setAttributesOnRange(rep.selStart, rep.selEnd,[ 
    ['kolor', char]
  ]);
  //var xx = this.editorInfo.ace_replaceRange(rep.selStart, rep.selEnd, char);
  //this.editorInfo.ace_setBaseText(char);
  //this.editorInfo.ace_setAttributeOnSelection("kolor", "1");
  //var cs = this.editorInfo.ace_prepareUserChangeset();
  //debugger;
  //cs.changeset = cs.changeset.replace("$c", "$d")
  //this.editorInfo.ace_applyPreparedChangesetToBase();
}


// Once ace is initialized, we set ace_doInsertColors and bind it to the context
function aceInitialized(hook, context){
  var editorInfo = context.editorInfo;
  editorInfo.ace_doInsertColorz = _(doInsertColorz).bind(context);
}


// Export all hooks
exports.aceInitialized = aceInitialized;
exports.postAceInit = postAceInit;
exports.aceAttribsToClasses = aceAttribsToClasses;
