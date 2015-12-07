var path = require('path'), 
    express = require('ep_etherpad-lite/node_modules/express'),
    eejs = require("ep_etherpad-lite/node/eejs");

exports.eejsBlock_editbarMenuLeft = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_glorantha_runes/templates/editbarButtons.ejs");
  return cb();
}

exports.eejsBlock_body = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_glorantha_runes/templates/modals.ejs");
  return cb();
}

exports.eejsBlock_scripts = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_glorantha_runes/templates/scripts.ejs");
  return cb();
}

exports.eejsBlock_styles = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_glorantha_runes/templates/styles.ejs");
  return cb();
}

exports.eejsBlock_dd_insert = function (hook_name, args, cb){
  args.content = args.content + eejs.require('ep_glorantha_runes/templates/special_characters_menu.ejs');
}

