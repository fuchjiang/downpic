
//解析字符串
this.parseImg = function(host, str, srcAttr) {
	// console.log(str);
	// console.log(host, str, srcAttr);
	var result = [];
	var reg = null;
	var imgsrc = '';
	if (srcAttr) {
		//某些网站延迟加载img 如lsrc src2等
		reg = new RegExp('<img.*?' + srcAttr + '=(\'|\")(.*?)(\'|\").*?\/?>', 'gim');
	}else{
		//默认提取src
		reg = /<img.*?src=('|")(.*?)('|").*?\/?>/gim;
	}
	// console.log(reg);
	while( (img = reg.exec(str)) != null ){
		if( img[2].indexOf('http://') != -1){
			//绝对地址
			imgsrc = img[2];
		}else if( img[2].indexOf('/') == 0 ){
			//相对地址
			imgsrc = 'http://' + host + img[2];
		}
		// console.log(imgsrc);
		result.push(imgsrc);
	}
	return result;
};