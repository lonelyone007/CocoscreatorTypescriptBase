'use strict';

var path = require('path');
var fs = require('fs');
var tinify = require('tinify');

var src = '/assets/Script/Sdk/';
var dest = '/assets/Script/Sdk/GameSdk.ts';
var wechatbuilddest='/build/wechatgame/libs/wx-downloader.js'

function copyFile(src, dst)
{
  var script = fs.readFileSync(src, 'utf8');
  fs.writeFileSync(dst, script);
}

function onStart (options, callback) {
  var srcPath = options.project + src;
  Editor.log('onstart', options, callback, options.platform);
  var platformPath = path.join(srcPath, options.platform + '.ts');
  Editor.log('platformPath ' + platformPath);
  if (fs.existsSync(platformPath))
  {
      Editor.log('file exist ');

      var destPath = options.project + dest;
      copyFile(platformPath, destPath);
      Editor.assetdb.refresh('db:/' + dest, function (err, results) { callback(); });
  } else {
    callback();
  }
}

function onChangeFiles (options, callback) {
  Editor.log('onchangefiles', options, callback);
  callback();
}

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function walk(dir) {
  //根据文件路径读取文件，返回文件列表
    let results = []
    let list = fs.readdirSync(dir)
    list.forEach(function(file) {
        file = dir + '/' + file
        let stat = fs.statSync(file)
        if (stat && stat.isDirectory()) 
          results = results.concat(walk(file))
        else 
          results.push(file)
    })
    return results;
}

function compressPngs(root) {
  tinify.key = "qsfNqdllS3xEP9IN5aV21Ob63QlSP6rd"; 
  // tinify.proxy = "http://user:pass@192.168.0.1:8080";
  let results = walk(root + '/res/raw-assets/');
  Editor.log(results);
  var promises = [];
  for (const r of results) {
    var suffix = r.substr(r.lastIndexOf('.'.toLowerCase()));
    if (suffix == '.png') {
      promises.push(tinify.fromFile(r).toFile(r));
    }
  }

  Promise.all(promises).then((res) => {
    Editor.log(res);
  });
}

function onFinished (options, callback) {
  Editor.log('onfinished', options, callback);
  compressPngs(options.dest);
  var srcPath = options.project + src;
  var platformPath = path.join(srcPath, 'LocalSdk.ts');
  //var wxdownloadpath=options.project+"/"+"wx-downloader.js"; 
  if (fs.existsSync(platformPath)) {
    var destPath = options.project + dest;
    copyFile(platformPath, destPath);
    // wechatbuilddest=options.project+wechatbuilddest;
    // Editor.log(wechatbuilddest); 
    //copyFile(wxdownloadpath, options.project + wechatbuilddest);
    Editor.assetdb.refresh('db:/' + dest, function (err, results) { callback(); });
  } else {
    callback();
  }
}

module.exports = {
  load () { 
    // execute when package loaded
        Editor.Builder.on('before-change-files', onChangeFiles);
        Editor.Builder.on('build-start', onStart);
        Editor.Builder.on('build-finished', onFinished);
  },

  unload () {
    // execute when package unloaded
        Editor.Builder.removeListener('before-change-files', onChangeFiles);
        Editor.Builder.removeListener('build-start', onStart);
        Editor.Builder.removeListener('build-finished', onFinished);
  },

  // register your ipc messages here
  messages: {
    'updatesdk' () {
      Editor.log('更新SDK!');
      var srcPath =  src + 'LocalSdk.ts';
      copyFile(path.join(Editor.projectInfo.path, srcPath), path.join(Editor.projectInfo.path, dest));
      Editor.assetdb.refresh('db://assets/Script/Sdk/', function (err, results) { });
    },
    'updatecsv' () {
      Editor.log('更新表!');
      Editor.assetdb.refresh('db://assets/configs/', function (err, results) { }); 
    }
  },

};