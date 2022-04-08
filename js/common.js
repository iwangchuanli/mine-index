
//when page loaded we should do something
window.addEventListener("load",loaded);
window.addEventListener("hashchange",loaded);
//get $_GET
function getQueryVariable(variable)
{
	var hash = window.location.hash.substring(2)
	if(hash.split("/")[0] == variable){
		return hash.split("/")[1] || true
	}

	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){
			if(pair[1]) return pair[1];
			else return true;
		}
	}
	return(false);
}
//using in pay/donate page to turn back to index
function toIndex(){
	// mainsec.rotateCard(90,0.5,"Y");
	window.location.href=mainsec.fromurl;
}
//using in index to direct to donate page
function todonate(){
	var u = "index.html"+(getQueryVariable("page")?"?page="+getQueryVariable("page"):"");
	u = encodeURIComponent(u);
	// mainsec.rotateCard(90,0.5,"Y");
	window.location.href="donate.html?from="+u;
}
//self run function to show the back button
(function(){
	if(getQueryVariable("from")){
		if(window.location.pathname == "/index.html" || window.location.pathname == "/") {
			return
		}
		mainsec.backButton = 1
		mainsec.fromurl=decodeURIComponent(getQueryVariable("from"))
	}
})();

window.addEventListener("beforeunload",function(){
	mainsec.rotateCard(90,0.4,"Y");
})