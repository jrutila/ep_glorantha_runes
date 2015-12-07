var _, $, jQuery;

var $ = require('ep_etherpad-lite/static/js/rjquery').$;
var _ = require('ep_etherpad-lite/static/js/underscore');

// All our colors are block elements, so we just return them.
var colors = ['black', 'red', 'green', 'blue', 'yellow', 'orange'];

exports.aceInitInnerdocbodyHead = function(hook_name, args, cb) {
  args.iframeHTML.push('<link rel="stylesheet" type="text/css" href="/static/plugins/ep_glorantha_runes/static/css/fontello-0d6af716/css/glorantha_runes.css"/>');
  args.iframeHTML.push('<link rel="stylesheet" type="text/css" href="/static/plugins/ep_glorantha_runes/static/css/font.css"/>');
  return cb();
};

// Bind the event handler to the toolbar buttons
var postAceInit = function(hook, context){
  debugger;
  var hs = $(".insertGloranthaRune");
  hs.on('click', function(){
    var value = "1";
    var intValue = parseInt(value,10);
    if(!_.isNaN(intValue)){
      context.ace.callWithAce(function(ace){
        ace.ace_doInsertColorz(intValue);
      },'insertColor' , true);
    }
  })
};

// Our colors attribute will result in a heaading:h1... :h6 class
function aceAttribsToClasses(hook, context){
  if(context.key.indexOf("kolor:") !== -1){
    var color = /(?:^| )kolor:([A-Za-z0-9]*)/.exec(context.key);
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
  var colorsType = /(?:^| )kolor:([A-Za-z0-9]*)/.exec(cls);

  var tagIndex;
  if (colorsType) tagIndex = _.indexOf(colors, colorsType[1]);

      
  if (tagIndex !== undefined && tagIndex >= 0){
    var tag = colors[tagIndex];
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
function doInsertColorz(level){
  var rep = this.rep,
    documentAttributeManager = this.documentAttributeManager;
  if (!(rep.selStart && rep.selEnd) || (level >= 0 && colors[level] === undefined)){
    return;
  }
  
  if(level >= 0){
    documentAttributeManager.setAttributesOnRange(rep.selStart, rep.selEnd, [
      ['kolor', colors[level]]
    ]);
  }else{
    documentAttributeManager.setAttributesOnRange(rep.selStart, rep.selEnd, [
      ['kolor', '']
    ]);
  }
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
