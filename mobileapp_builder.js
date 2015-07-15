var jade = require('jade');
var async  = require('async');
var fs = require('fs');
var options = {
	filename: "fatman"
};
var locals = {};
var outputDirr = __dirname + '/' + 'cordova_files';
var assetsRootFolder = __dirname + '/' + 'public/';
var assetsFolders = ["images", "javascripts", "stylesheets"];
var excludeFilesAndFolders = ["admin", ".DS_Store"];

function createOutputFolder(callback){
	fs.mkdir(outputDirr, callback);
}

function writeFile(path, data, callback){
	fs.writeFile(path, data, function (err) {
    if (err) {
      callback(err);
    } else {
      console.log('Wrote: ', path);
      callback();
    }
  });
}

function readAndCompileTemplate(path, callback){
	var fn = jade.compileFile(path, options);
	var html = fn(locals);
	callback(html);
}

function processTemplates(callback){
	var indexPath = "./views/index.jade";
	readAndCompileTemplate(indexPath, function(html){
		var outputFilename = outputDirr + '/index.html';
		fs.exists(outputDirr, function(exists){
			if(!exists){
				createOutputFolder(function(err){
					if(err){
						callback(err);
					}
					else{
						writeFile(outputFilename, html,callback);
					}
				});
			}
			else{
				writeFile(outputFilename, html,callback);
			}
		});
	});
}

function processAssets(callback){
	async.each(assetsFolders, readAssetsFolder, callback);
}

function readAssetsFolder(folderName, callback){
	var fromFolderPath = assetsRootFolder + folderName;
	var toFolderPath = outputDirr + '/' + folderName;
	console.log("About to copy assets files from folder: ",folderName);
	fs.exists(toFolderPath,function(exists){
		if(exists){
			readAndMoveFromFolder(folderName,fromFolderPath, callback);
		}
		else{
			console.log("About to create asset folder: ", toFolderPath);
			fs.mkdir(toFolderPath, function(err){
				if(err){
					console.log("failed to create folder: ", toFolderPath);
					callback(err);
				}
				else{
					readAndMoveFromFolder(folderName,fromFolderPath, callback);
				}
			});
		}
	});
}

function readAndMoveFromFolder(folderName,folderPath, callback){
	fs.readdir(folderPath, function(err, files){
		if(err){
			callback(err);
		}
		else{
			copyAssetsFolderToCordova(folderName,folderPath, files,callback);
		}
	});
}

function copyAssetsFolderToCordova(folderName,folderPath,files, callback){
	async.each(files, function(fileName, callback){
		console.log(fileName);
		if(excludeFilesAndFolders.indexOf(fileName) < 0){
			var filePath = folderPath + "/" + fileName;
			console.log("About to move file: ", filePath);
			fs.readFile(filePath, function (err, data) {
			  if (err){
			  	callback(err);
			  }
			  else{
			  	var outputFilename = outputDirr + '/' + folderName + '/' + fileName;
			  	writeFile(outputFilename, data,callback);
			  }
			});
		}
	},callback);
}

function startProcessing(){
	console.log("Starting building process of html/css/js files");
	async.parallel([processTemplates, processAssets], doneProcess);
}

function doneProcess(err, results){
	if(err){
		console.log("There was an error: ", err);
		process.exit(1);
	}
	else{
		console.log("Finishing Process with success!!!");
		process.exit(0);
	}
}

startProcessing();

