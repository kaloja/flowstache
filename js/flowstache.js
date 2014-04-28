/*
	Flowstache v1.0
	by Anton Furuholm, Mattias Haal & Filip Rundberg

	Copyright 2014 Flowstache
	Licensed under the MIT license
	http://opensource.org/licenses/MIT
*/

(function(ctx) {
	
	// Plugin data
	var data = {
		// userId: '[USER ID]', // if feed from user
		accessToken: '[ACCESS TOKEN]',
		tagName: '[TAG]', // if feed from tag
		limit: 3 // number of images to be displayed
	}

	// JSONP request
	function jsonp(url) {
		var script, head;
		script = document.createElement('script');
		script.src = url;
		head = document.getElementsByTagName('head')[0];
		head.appendChild(script);
	}

	// JSONP url
	(function url() {
		/* User */ // jsonp('https://api.instagram.com/v1/users/'+data.userId+'/media/recent/?access_token='+data.accessToken+'&count='+data.limit+'&callback=parse'); // if feed from user
		/* Tag */ jsonp('https://api.instagram.com/v1/tags/'+data.tagName+'/media/recent/?access_token='+data.accessToken+'&count='+data.limit+'&callback=parse'); // if feed from tag
	})();
	
	// JSONP callback
	function parse(response) {
		var template, html, flow;
		template = document.getElementById('target-tpl').innerHTML;
		html = Mustache.to_html(template, response);
		flow = document.getElementById('target').innerHTML = '<ul>'+html+'</ul>';
	}

	ctx.parse = parse;

})(this);
