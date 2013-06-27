var s = require('sys');
var fs = require('fs');
var url = require('url');
var http = require('http');
var srcObj = {};
// src : 'http://www.meizitu.com/wp-content/uploads/2012a/04/41/01.jpg'
this.getImg = function( src ){
	if( srcObj[src] ) {
		return;
	}
	if( !srcObj[src] ){
		srcObj[src] = true;
	}
	var ext = src.substring(src.lastIndexOf('.') + 1);
	//只下载jpg格式
	if ( ext != 'jpg' ) {
		return;
	}
	var fileName = src.substring(src.lastIndexOf('/') + 1);

	// s.puts('getimg 要下载这个地址: ' + src + '下载图片: ' + fileName);
	//保存地址
	var savePath = './download/';

	var options = {
		host:url.parse(src).host,
		port:80,
		path:url.parse(src).pathname
	};
	fileName = new Date().getTime() + '_' + fileName;

	http.get(options, function(res){
		// console.log(res.headers['content-length']);
		var fileSize = res.headers['content-length'];
		//过滤小图
		if (fileSize > 100000) {
			//返回一个新的可写流对象
			var file = fs.createWriteStream(savePath + fileName);

			res.on('data', function(data){
				//data 为buffer对象
				file.write(data);
			}).on('end', function(){
				file.end();
				console.log(src + ' download success');
			});
		}
	});
};