var g = require('./getfrom');

var pageUrl = '';
for(var i= 27; i<30; i++){
	pageUrl = 'http://www.moko.cc/mtg4/' + i + '/index.html';
	g.getFrom(pageUrl, 'src2');
}



