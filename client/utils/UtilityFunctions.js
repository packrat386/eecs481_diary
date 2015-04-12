
var UtilityFunctions = {
	getSecureParseFile: function(url){
		var subbedUrl = url.replace("http://", "https://s3.amazonaws.com/");
		return subbedUrl;
	}
}

module.exports = UtilityFunctions;