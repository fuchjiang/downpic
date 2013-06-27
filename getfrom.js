var url = require('url');
var http = require('http');
var parseimg = require('./parseimg');
var getimg = require('./getimg');

var html = '';
var srcList = [];

this.getFrom = function( src ,srcAttr ){
	console.log('get from src: ' + src);
	var options = {
		host:url.parse(src).host,
		port:80,
		path:url.parse(src).pathname
	};
	http.get(options, function(res){
		res.on('data', function(data){
			html += data;
		}).on('end', function(){
			srcList = parseimg.parseImg(options.host, html, srcAttr);
			// console.log(srcList);
			for( var i = 0; i < srcList.length; i++ ){
				getimg.getImg(srcList[i]);
			}
		});
	});
};