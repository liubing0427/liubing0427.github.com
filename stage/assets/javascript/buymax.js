$(function(){
    function LoadIframe(name,url){
        var newIframeObject=document.createElement("IFRAME");
        newIframeObject.src=url;
        newIframeObject.width=$(".cssanimation").width();
        newIframeObject.height=685;   
	$(name).after(newIframeObject);
      };
    LoadIframe("#buymax","https://fiddle.jshell.net/rubatong/2oyLc2av/3/embedded/result/");
    LoadIframe("#duola","https://jsfiddle.net/rubatong/99j0zc2d/8/embedded/result/");
    $("iframe").attr("frameborder",0);
});
