var jade = require('jade');
var fs = require('fs')
var options = {
	filename: "fatman"
};
var locals = {};
var outputDirr = __dirname + '/' + 'cordova_files';

function writeFile(path, data, callback){
	fs.writeFile(path, data, function (err) {
    if (err) {
      callback(err);
    } else {
      console.log('Wrote: ' + path);
      callback();
    }
  });
}

function readAndCompileTemplate(path, callback){
	var fn = jade.compileFile(path, options);
	var html = fn(locals);
	callback(html);
}

function processTemplates(){
	var indexPath = "./views/index.jade";
	readAndCompileTemplate(indexPath, function(html){
		var outputFilename = outputDirr + '/index.html';
		writeFile(outputFilename, html,function(err){
			if(err){
				console.log("There was an error: ", err);
				process.exit(1);
			}
			else{
				console.log("Finishing Process with success!!!");
				process.exit(0);
			}
		})
	})
}
processTemplates();

