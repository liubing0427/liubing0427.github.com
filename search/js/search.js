var flag = true;
var index = -1;
var oScript = null;
window.onload = function ()
{ 
    var time = new Date();
    var year = time.getFullYear();
    document.getElementById("cp").innerHTML = '©'+year+' <a href="https://www.997life.com">BingLiu</a>';
    var oTxt = document.getElementById('lst-ib');
    oTxt.onkeyup = function(e)
    {
        e = e || window.event;
        if(flag && e.keyCode != 13)
        {
            getdata();
        }
        else
        {
            flag = true;
        }
    };

    $("#lst-ib").bind('input', function(){
        if(oTxt.value=="")
        {
            document.getElementById("tr1").innerText = '';
        }
    });

    $("#lst-ib").blur(function(){
        var suglist = document.getElementById("suglist");
        if ($(suglist))
        {
            $(suglist).hide();
        }
    });
    var sethfPos=sethfPos||0;
    (function() {
        var p="https://search.997life.com/",
        m=(navigator.userAgent.indexOf("MSIE")!=-1 || navigator.userAgent.indexOf("Trident")!=-1)&&!window.opera,
        q=Math.random()*100,
        u="和谐搜索",
        c="";
        window.fa=function(x){
            try{
                if(window.sidebar){
                    window.sidebar.addPanel(u,p,"")
                }
                else {
                    if(window.opera&&window.print){
                        x.setAttribute("rel","sidebar");
                        x.setAttribute("href",p);
                        x.setAttribute("title",u);
                        x.click()
                    }
                    else {
                        window.external.AddFavorite(p,u)
                    }
                }
            }
            catch(w) {}
        };
        function d(x) {
                if(x){
                    var w=x.parentNode;
                    if(w){
                        w.style.marginBottom="20px";
                        w.style.marginTop="2px"
                    }
                }
        }
        if(m) {
            try{
                var v=/se /gi.test(navigator.userAgent);
                var n=/AppleWebKit/gi.test(navigator.userAgent)&&/theworld/gi.test(navigator.userAgent);
                var j=/theworld/gi.test(navigator.userAgent);
                var o=/360se/gi.test(navigator.userAgent);
                var a=/360chrome/gi.test(navigator.userAgent);
                var f=/greenbrowser/gi.test(navigator.userAgent);
                var s=/qqbrowser/gi.test(navigator.userAgent);
                var l=/tencenttraveler/gi.test(navigator.userAgent);
                var i=/maxthon/gi.test(navigator.userAgent);
                var t=/krbrowser/gi.test(navigator.userAgent);
                var k=/BIDUBrowser/gi.test(navigator.userAgent)&&(typeof window.external.GetVersion!="undefined");
                var b=false;
                try{
                    b=+external.twGetVersion(external.twGetSecurityID(window)).replace(/\./g,"")>1013
                }catch(r) {}
                if(v||b||n||j||o||a||f||s||l||i||t||k) {
                var h=sethfPos?document.getElementById("set_f"): document.getElementById("setf");
                    if(h){
                        h.style.display="inline";
                        if(sethfPos){
                            d(h);c="favorites"
                        }
                    }
                }
                else {
                    var g=sethfPos?document.getElementById("set_h"): document.getElementById("seth");
                    if(g){
                        g.style.display="inline";
                        if(sethfPos){
                            d(g);c="home"
                        }
                    }
                }
            }
            catch(r) {}
        }
        else {
            var h=sethfPos?document.getElementById("set_f"): document.getElementById("setf");
            if(h){
                h.style.display="inline"
            }
            if(sethfPos) {
                d(h);c="favorites"
            }
        }
        if(c&&sethfPos) {
        }
    })();
}

function getdata()
{
    var oTxt = document.getElementById('lst-ib');
    $("#st").empty();
    //避免造成代码冗余，出现众多script标签（由于每输入一个字符，就会动态生成script标签，因此每次需要清除上一次遗留下的script标签）
    if(oScript)
    {
        document.body.removeChild(oScript);
    }       
    oScript = document.createElement('script');
    //其中‘wd’是搜索的关键字，‘cb’是一个回调函数，该回调函数是我们取到数据要后执行的函数，oScript.src中cb=baidu即表示取到数据后执行baidu函数
    oScript.src = 'https://suggestion.baidu.com/su?wd='+oTxt.value+'&p=3&cb=baidu&from=superpage';
    document.body.appendChild(oScript);
}

//回调时调用的函数，将取得的联想词展示出来
function baidu (json)
{
    $(".lst-d").focus();
    index = -1;
    var oUl = document.getElementById('st');
    $("#st").empty();
    var suglist = document.createElement("ul");
    suglist.id = "suglist";
    var css_index = $("#index");
    var css_result = $("#css_result");
    if(json.s.length == 0&&$(".lst").val()==""){
        if(css_result.length){
            css_result.remove();
        }
        if(!css_index.length){
           css_index = document.createElement('link');
           css_index.href = "/assets/css/search.css";
           css_index.type = "text/css";
           css_index.id = "index";
           css_index.rel = "stylesheet";
           document.body.appendChild(css_index);
        }
    }
    for (var i = 0; i < json.s.length; i++) {
        var sugli = document.createElement("li");
        sugli.innerHTML = json['s'][i];
        sugli.className = "li-cl";
        suglist.appendChild(sugli)
    }
    oUl.appendChild(suglist);
    $(".li-cl").mousedown(function(){
        var li = $(this);
        $("#lst-ib").val(li.text());
        $(suglist).hide();
    });

    $(".li-cl").mouseover(function(){
        $(this).addClass("bdsug-s");
    });

    $(".li-cl").mouseout(function(){
        $(this).removeClass("bdsug-s");
    });
}

function sIndex(index) {
    var suglist = document.getElementById("suglist");
    var lis = $(suglist).find("li");
    $(lis).removeClass("bdsug-s");
    if (index != -1) {
        var li = $($(lis)[index]);
        $(li).addClass("bdsug-s");
        $("#lst-ib").val(li.text());
    } else {
    }
}

document.onkeydown = function(e) {
    var suglist = document.getElementById("suglist");
    if(suglist){
        e = e || window.event;
        if (e.keyCode == 9 || e.keyCode == 27) {//Tab || Esc
            if ($(suglist))
            {
                $(suglist).hide();
            }
        } else if (e.keyCode == 13) {//Enter
            //me.addStat("rsv_sug2", 0);
            document.getElementById("btnK").click();
            return false;
        } else if (e.keyCode == 86 && e.ctrlKey) {//V+ctrl
            //me.addStat("rsv_n", 2)
        } else if ($(suglist)) {
            if (e.keyCode == 38) {//up
                flag = false;
                e.preventDefault();
                var n = $(suglist).find("li").length;
                index--;
                if (index < -1) {
                    index = n - 1
                }
                sIndex(index);
            }
            if (e.keyCode == 40) {//down
                flag = false;
                e.preventDefault();
                var n = $(suglist).find("li").length;
                index++;
                if (index >= n) {
                    index = -1
                }
                sIndex(index);
            }
        } else {
            if (e.keyCode == 38 || e.keyCode == 40) {
                e.preventDefault();
                getdata();
            }
        }
    }
}

function Show_Hidden(){
    var suglist = $("#suglist");
	if ($(suglist).length)
	{
		$(suglist).hide();
	}
    if(document.getElementById("lst-ib").value!="")
    {
        var css_index = $("#index");
        var css_result = $("#css_result");
        if(css_index.length){
            css_index.remove();
        }
        if(!css_result.length){
           css_result = document.createElement('link');
           css_result.href = "/assets/css/result.css";
           css_result.type = "text/css";
           css_result.id = "css_result";
           css_result.rel = "stylesheet";
           document.body.appendChild(css_result);
        }
        document.getElementById("tr1").innerText = '根据相关法律法规和政策，"'+document.getElementById("lst-ib").value+'"的搜索结果未予显示';
        $("#tr1").css("display", "block");
    }
    else
    {
        document.getElementById("tr1").innerText = '';
        $("#tr1").css("display", "none");
    }
}

function h(obj){
    obj.style.behavior='url(#default#homepage)';
    var a = obj.setHomePage('https://www.997life.com/search');
}

function getLuckly(){
    window.location.href="https://www.997life.com/app/";
}

