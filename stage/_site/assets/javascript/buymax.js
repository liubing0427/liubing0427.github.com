$(document).ready(function(){
    function LoadIframe(name,url){
        var newIframeObject=document.createElement("IFRAME");
        newIframeObject.src=url;
        newIframeObject.width=500;
        newIframeObject.height=550;        
	$(name).after(newIframeObject);
      };
      LoadIframe("#buymax","https://jsfiddle.net/rubatong/2oyLc2av/embedded/result/");
      LoadIframe("#duola","https://jsfiddle.net/rubatong/99j0zc2d/6/embedded/result/");
});
