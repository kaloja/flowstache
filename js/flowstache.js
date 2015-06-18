/*
	Flowstache v1.2
	by Anton Furuholm, Mattias Haal & Filip Rundberg

	Copyright 2015 Flowstache
	Licensed under the MIT license
	http://opensource.org/licenses/MIT
*/

(function(ctx) {
	
	// Plugin data
	var data = {
		get: 'tag', // choose between 'user' and 'tag'
		userId: [USER ID], // if feed from user
		accessToken: '[ACCESS TOKEN]', // your access token
		tagName: 'surf', // if feed from tag
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
		var base, endpoint, final;
		base = 'https://api.instagram.com/v1';
		switch (data.get) {
			case 'user':
				if (typeof data.userId !== 'number') {
          throw new Error("No user specified. Use the 'userId' option.");
        }
        if (typeof data.accessToken !== 'string') {
          throw new Error("No access token. Use the 'accessToken' option.");
        }
				endpoint = 'users/' + data.userId + '/media/recent';
	      break;
	    case 'tag':
	    	if (typeof data.tagName !== 'string') {
          throw new Error("No tag name specified. Use the 'tagName' option.");
        }
				endpoint = 'tags/' + data.tagName + '/media/recent';
	      break;
	    default:
	    	throw new Error("Invalid option for get: '" + data.get + "'. Use one of the valid options: 'user' or 'tag'.");
		}
		final = base + '/' + endpoint;
  	final += '?access_token=' + data.accessToken + '&count=' + data.limit + '&callback=parse';
    return jsonp(final);
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