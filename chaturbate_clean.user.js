// ==UserScript==
// @name           Chaturbate Clean
// @description    removes all add's, sub-selector on the tab's, shows video if you have no access, full screen with chat
// @version 2.6
// @updateURL	   https://openuserjs.org/meta/ladroop/Chaturbate_Clean.meta.js
// @namespace      chaturbate_goes_ladroop
// @include        https://chaturbate.com/*
// @include        https://*.chaturbate.com/*
// @noframes
// @grant          none
// @run-at         document-start
// @license	       MIT
// ==/UserScript==


function do_script() {

	version = 2.6;


// use unused add space
	ad = document.getElementsByClassName('ad');
	verstr='<strong>Chaturbate Clean V'+version.toFixed(1)+' Made by Ladroop.</strong> <br>';
	if (ad[0]){ad[0].innerHTML=verstr}

// advert options on menu bars - only save "login", "main", "broadcast", "tags" and "my collection"
	bar=document.getElementById("nav");
	if (bar){
		barl=bar.getElementsByTagName('li');
		i=barl.length-1;
		while (i != -1){
			d=barl[i].innerHTML;
			if ((d.indexOf('/login') != -1)||(d.indexOf('href="/"') != -1)||(d.indexOf('href="/b/') != -1)||(d.indexOf('/my_') != -1)||(d.indexOf('/tags') != -1)){i--}
			else{barl[i].parentNode.removeChild(barl[i]);i--}
	}	}

// blog spam
	ad = document.getElementsByClassName('featured_blog_posts')[0];
	if (ad){ad.parentNode.removeChild(ad)}

// footer spam
	ad = document.getElementsByClassName('featured_text')[0];
	if (ad){ad.parentNode.removeChild(ad)}

// announcement banner (if present)
	ad = document.getElementsByClassName('top-section')[0];
	if (ad){
		ad = ad.getElementsByTagName('img')[0];
		if (ad){ad.parentNode.removeChild(ad)}
	}

// advanced search
	if((document.location.href.indexOf("spy-on-cams")==-1)&&(document.location.href.indexOf("followed-cams")==-1)&&(document.location.href.indexOf("/tag")==-1)){
	if (document.getElementsByClassName('c-1 endless_page_template')[0]){
		if (document.getElementsByClassName('sub-nav')[0]){
		newli=document.createElement('li');
		data='<form><select onchange=\'loc=document.location.href.split("/");pos=loc[0]+"/"+loc[1]+"/"+loc[2]+this.options[this.selectedIndex].value;document.location.href=pos;\' style="margin: 0px 0px 0px 0px; background: #DDE9F5; color:#5E81A4; border-radius: 4px 4px 0px 0px;padding: 3px 1px 4px 12px; font-weight: 400; font-size: 13px; font-family: \'UbuntuMedium\',Arial,Helvetica,sans-serif;" >'
		+'<option value="/XX-cams">ALL CAMS IN CATEGORY</option>'
		+'<option value="/exhibitionist-cams/XX">EXHIBITIONIST CAMS</option>'
		+'<option value="/hd-cams/XX">HD CAMS</option>'
		+'<option value="/new-cams/XX">NEW CAMS</option>'
		+'<option value="/teen-cams/XX">TEEN CAMS (18+)</option>'
		+'<option value="/18to21-cams/XX">18 TO 21 CAMS</option>'
		+'<option value="/21to35-cams/XX">21 TO 35 CAMS</option>'
		+'<option value="/30to50-cams/XX">30 TO 50 CAMS</option>'
		+'<option value="/mature-cams/XX">MATURE CAMS (50+)</option>'
		+'<option value="/north-american-cams/XX">NORTH AMERICAN CAMS</option>'
		+'<option value="/euro-russian-cams/XX">EURO RUSSIAN CAMS</option>'
		+'<option value="/south-american-cams/XX">SOUTH AMERICAN CAMS</option>'
		+'<option value="/philippines-cams/XX">PHILIPPINES CAMS</option>'
		+'<option value="/asian-cams/XX">ASIAN CAMS</option>'
		+'<option value="/other-region-cams/XX">OTHER REGION CAMS</option>'
		+'<option value="/6-tokens-per-minute-private-cams/XX">6 TOKENS PER MINUTE</option>'
		+'<option value="/12-tokens-per-minute-private-cams/XX">12 TOKENS PER MINUTE</option>'
		+'<option value="/18-tokens-per-minute-private-cams/XX">18 TOKENS PER MINUTE</option>'
		+'<option value="/30-tokens-per-minute-private-cams/XX">30 TOKENS PER MINUTE</option>'
		+'<option value="/60-tokens-per-minute-private-cams/XX">60 TOKENS PER MINUTE</option>'
		+'<option value="/90-tokens-per-minute-private-cams/XX">90 TOKENS PER MINUTE</option>'
		+'</select></form>';
		uloc=document.location.href+"//////";
		loc=uloc.split("/");
		check=loc[3]+loc[4];
		gen="";
		if(check.indexOf("male") != -1){gen="male"}
		if(check.indexOf("female") != -1){gen="female"}
		if(check.indexOf("couple") != -1){gen="couple"}
		if(check.indexOf("trans") != -1){gen="trans"}
		re=/XX/gi;
		data=data.replace(re,gen);
		if (gen === ""){data=data.replace("-cams","")}
		data=data.replace('<option value="/'+loc[3],'<option selected value="/'+loc[3]);
		newli.innerHTML=data;
		tabs=document.getElementsByClassName('sub-nav')[0].getElementsByTagName("li");
		if (loc[4]!==""){
			for (n=0; n<tabs.length-1; n++){
				tabs[n].className="";
				if (tabs[n].getElementsByTagName("a")[0].href.indexOf("/"+loc[4])!=-1){
					tabs[n].className="active";
				}
			}
		}
		document.getElementsByClassName('sub-nav')[0].appendChild(newli);
	}}}

// remove out of position images on profiles
	container = document.getElementById("tabs_content_container");
	if (container){
		bar=document.getElementById("nav");
		newli=document.createElement('li');
		newli.innerHTML='<a href=# id="clean"></a>';
		bar.appendChild(newli);
		document.getElementById("clean").addEventListener("click", cleancookie);
		cleanup();
	}

// remove lock pictures from thumbs on profiles
	pictures = document.getElementsByClassName('preview');
	if (pictures){
		for (i=0; i<pictures.length; i++){
			if(pictures[i].getAttribute("alt") =="Locked"){
				pictures[i].parentNode.removeChild(pictures[i]);
	}	}	}

//fix external links redirection
	var link = document.getElementsByTagName('a');
	for (i=0; i<link.length; i++){
		if (link[i].href.indexOf('?url=') != -1){
			linkhref=decodeURIComponent(link[i].href);
			newlinkhref=linkhref.split("?url=")[1];
			link[i].href=newlinkhref;
	}	}


//check if there is video and what type and make settings
	varea=document.getElementById("player");
	if (varea){
		if (document.getElementById("xmovie")){
			varea=document.getElementById("xmovie");
		}
		if (document.getElementById("still_video_object_html5_api")){
			varea=document.getElementById("still_video_object_html5_api");
		}

	newli = document.createElement('li');
	newli.innerHTML="<div class='button_share'> <a href=#>FULL SCREEN WITH CHAT</a></div>";
	newli.addEventListener('click',function(){fullscreenapi();}, false);
	document.getElementsByClassName("socials")[0].appendChild(newli);

	newli = document.createElement('li');
	newli.innerHTML="<div class='button_share'> <a href=#>VIDEO CONTROLS</a></div>";
	newli.addEventListener('click',function(){vcont();}, false);
	document.getElementsByClassName("socials")[0].appendChild(newli);

	newul = document.createElement('ul');
	newul.id="vcont";
	newul.style.display="none";
	newul.style.width = "300px";
	newul.className="socials";
	document.getElementsByClassName("headline")[0].appendChild(newul);

	newli = document.createElement('li');
	newli.innerHTML="<div class='button_share'> <a href=#>MIRROR VIDEO</a></div>";
	newli.addEventListener('click',function(){mirror();}, false);
	newul.appendChild(newli);
	mir=0;

	newli = document.createElement('li');
	newli.innerHTML="<div class='button_share'> <a href=#>INVERT VIDEO</a></div>";
	newli.addEventListener('click',function(){invert();}, false);
	newul.appendChild(newli);

	newli = document.createElement('li');
	newli.innerHTML="<div class='button_share'><a href=#>BRIGHTNESS</a><input type='range' id='myRange' value=50 style='width: 150px;'><a href=# style='float:right;'></a></div>";
	newli.addEventListener("change",function(){badjust();}, false);
	newul.appendChild(newli);

	newli = document.createElement('li');
	newli.innerHTML="<div class='button_share'><a href=#>CONTRAST&nbsp;&nbsp;&nbsp;&nbsp;</a><input type='range' id='myRange2' value=50 style='width: 150px;' ><a href=# style='float:right;'></a></div>";
	newli.addEventListener("change",function(){cadjust();}, false);
	newul.appendChild(newli);

	newli = document.createElement('li');
	newli.innerHTML="<div class='button_share'><a href=#>SATURATION</a><input type='range' id='myRange3' value=50 style='width: 150px;' ><a href=# style='float:right;'></a></div>";
	newli.addEventListener("change",function(){sadjust();}, false);
	newul.appendChild(newli);

	newli = document.createElement('li');
	newli.innerHTML="<div class='button_share'><a href=#>HUE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a><input type='range' id='myRange4' value=360  min=180 max=540 style='width: 150px;'><a href=# style='float:right;'></a></div>";
	newli.addEventListener("change",function(){hadjust();}, false);
	newul.appendChild(newli);

	newli = document.createElement('li');
	newli.innerHTML="<div class='button_share'><a href=#>RESET ALL</a></div>";
	newli.addEventListener("click",function(){vreset();}, false);
	newul.appendChild(newli);

	varea.style.filter="brightness(100%) contrast(100%) invert(0%) saturate(100%) hue-rotate(0deg)";

//fix html5 video area size bug
	if (document.getElementById("still_video_object_html5_api")){
      document.getElementById("player").style.height=parseInt(document.getElementById("player").style.height)-32+"px";
      sizeadj();
   }

// fix app area bug
	apparea=document.getElementsByClassName("tip_shell")[0];
	apparea.style.width="100%";

// add full screen enter/exit handler
    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);

	}// end if video

// wait one second and check if you have no access, if not create a new video box and kill all timers
	setTimeout(function(){
	area = document.getElementsByClassName('block')[0];
	if (area){
		if (area.innerHTML.length < 700){
			splits = document.location.href.split("/");
			bname=splits[3];
			if (bname!="roomlogin"){
				if (bname=="p"){bname=splits[4]}
					newvid=document.createElement('div');
					newvid.setAttribute("style","clear:both;float:left;margin-left:10px;margin-top:10px;margin-bottom:10px;margin-right:200px;border-width:5px;border-style:double;resize:both;overflow:hidden;width: 640px; height: 480px;")
					newvid.innerHTML="<img id='vidimg' src='https://ssl-ccstatic.highwebmedia.com/images/cam_notice_background.jpg' height=100% width=100%></img>";
					area.appendChild(newvid);
						errcnt=1;
						cimg = new Image();

						cimg.onload = function(){
							document.getElementById("vidimg").src=cimg.src;
							setTimeout(function(){ cimg.src = 'https://cbjpeg-serve.stream.highwebmedia.com/stream?room='+bname+'&f='+ new Date().getTime();errcnt=1 }, 100);
						}

						cimg.onerror = function(){
							errcnt++;
							wtime=100*errcnt;
							if (wtime>6000){wtime=6000}
							setTimeout(function(){ cimg.src = 'https://cbjpeg-serve.stream.highwebmedia.com/stream?room='+bname+'&f='+ new Date().getTime(); }, wtime);
						}

						cimg.src = 'https://cbjpeg-serve.stream.highwebmedia.com/stream?room='+bname+'&'+ new Date().getTime();

						for (i = 1; i < 9999; i++){window.clearInterval(i)}

		}	}	}
	}, 1000);

}//end main

// video adjust functions
	function vcont(){
		if (document.getElementById("vcont").style.display=="none"){
			document.getElementById("vcont").style.display="block";
		}else{
			document.getElementById("vcont").style.display="none";
		}
	}

	function badjust(){
		br=document.getElementById("myRange").value*2;
		ofil=varea.style.filter;
		ofils=ofil.split(" ");
		varea.style.filter="brightness("+br+"%) "+ofils[1]+" "+ofils[2]+" "+ofils[3]+" "+ofils[4];
	}

	function cadjust(){
		br=document.getElementById("myRange2").value*2;
		ofil=varea.style.filter;
		ofils=ofil.split(" ");
		varea.style.filter=ofils[0]+" contrast("+br+"%) "+ofils[2]+" "+ofils[3]+" "+ofils[4];
	}

	function invert(){
		ofil=varea.style.filter;
		ofils=ofil.split(" ");
		inv=" invert(100%) ";
		if (ofils[2]=="invert(100%)"){inv=" invert(0%) "}
		varea.style.filter=ofils[0]+" "+ofils[1]+inv+ofils[3]+" "+ofils[4];
	}

	function sadjust(){
		br=document.getElementById("myRange3").value*2;
		ofil=varea.style.filter;
		ofils=ofil.split(" ");
		varea.style.filter=ofils[0]+" "+ofils[1]+" "+ofils[2]+" saturate("+br+"%) "+ofils[4];
	}

	function hadjust(){
		br=document.getElementById("myRange4").value;
		if (br > 359){br=br-360}
		ofil=varea.style.filter;
		ofils=ofil.split(" ");
		varea.style.filter=ofils[0]+" "+ofils[1]+" "+ofils[2]+" "+ofils[3]+" hue-rotate("+br+"deg)";
	}

	function mirror(){
		if (mir===0){
			varea.style.transform="matrix(-1, 0, 0, 1, 0, 0)";
			mir=1;
		}else{
			varea.style.transform="none";
			mir=0;
		}
	}

	function vreset(){
		varea.style.filter="brightness(100%) contrast(100%) invert(0%) saturate(100%) hue-rotate(0deg)";
		varea.style.transform="none";mir=0;
		document.getElementById("myRange").value=50;
		document.getElementById("myRange2").value=50;
		document.getElementById("myRange3").value=50;
		document.getElementById("myRange4").value=360;
	}

// to remove or restore floating images on a profile according to cookie
	function cleanup(){
		var taglist=new Array("a","p","i","strong","b","u","ul","ol","li","h1","h2","h3","img","font","br");
		claction=readCookie("pclean");
		if (!claction){
			document.getElementById("clean").innerHTML= "CLEAN PROFILE = <font color=#00AA00>ON</font>";
		}else{
			document.getElementById("clean").innerHTML= "CLEAN PROFILE = <font color=#DC5500>OFF</font>";
		}
		for (n=0; n<taglist.length-1; n++){
			if (!claction){
				blockelm (taglist[n]);
			}else{
				unblockelm (taglist[n]);
		}	}

// after clean up set spy/private/group price in the profile

	if (document.getElementById('einfo')){
		einfo=document.getElementById('einfo');
		einfo.parentNode.removeChild(einfo);
	}
	pnod=document.getElementById('tabs_content_container');
	rnod=pnod.getElementsByTagName('h1')[0];
	nnod=document.createElement('dl');
	spyprc=window.defchat_settings.spy_price;
	pvtprc=window.defchat_settings.private_price;
	grpprc=window.defchat_settings.group_price;
	noexhib=window.defchat_settings.allow_tipping;
	topictxt="";
	if(!document.getElementById("player")){
		topictxt="<dt>Last Roomtopic:</dt><dd>"+decodeURIComponent(window.defchat_settings.default_subject)+"</dd>";
	}

	spytxt="<dt>Spy:</dt><dd>"+spyprc+" Tkns/Min.</dd>";
	pvttxt="<dt>Private:</dt><dd>"+pvtprc+" Tkns/Min.</dd>";
	grptxt="<dt>Group:</dt><dd>"+grpprc+" Tkns/Min.</dd>";

	if (pvtprc==0){
		spytxt="<dt>Spy:</dt><dd>Not Possible.</dd>";
		pvttxt="<dt>Private:</dt><dd>Disabled.</dd>";
	}
	if (spyprc==0){
		spytxt="<dt>Spy:</dt><dd>Disabled.</dd>";
	}
	if (grpprc==0){
		grptxt="<dt>Group:</dt><dd>Disabled.</dd>";
	}
	extxt="";
	if (noexhib==false){
		extxt="<dt>Status:</dt><dd>Exhibitionist</dd>";
	}
	nnod.innerHTML=pvttxt+spytxt+grptxt+extxt+topictxt;
	nnod.style.margin=0;
	nnod.style.padding=0;
	nnod.id="einfo";
	pnod.insertBefore(nnod, rnod.nextSibling);

	}

	function blockelm(tag){
		image = container.getElementsByTagName(tag);
		for (i=0; i<image.length; i++){
			if (image[i].style.position){
				if ((image[i].style.position.indexOf("absolute")!=-1)||(image[i].style.position.indexOf("fixed")!=-1)){
					image[i].setAttribute("ostyle", "1");
					image[i].style.display="none";
	}	}	}	}

	function unblockelm(tag){
		image = container.getElementsByTagName(tag);
		for (i=0; i<image.length; i++){
			if (image[i].style.position){
				if (image[i].getAttribute("ostyle")){
					image[i].style.display="block";
	}	}	}	}


// swap cleanup cookie and cleanup
	function cleancookie(){
		if (readCookie("pclean")){
			eraseCookie("pclean");
		}else{
			createCookie("pclean",1,30)}
		cleanup();
	}

// full screen function
	function fullscreenapi(){
		isfullscreen=false;// just in case
        myfullscreen=true;
		elem = document.getElementById("defchat").getElementsByClassName("section")[0];
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullScreen) {
			elem.webkitRequestFullscreen();
		}
	}

//full screen enter/exit handler and prevent double full screen in html5
	function exitHandler(){
	    if (isfullscreen){ //exit
			isfullscreen=false;
			document.getElementById("player").style.width=orgplayerw+"px";
			createCookie("player_width",orgplayerw,1);
            elem.style.width="";
       		sizeadj();
            if (document.getElementsByClassName("vjs-fullscreen-control")) {
              document.getElementsByClassName("vjs-fullscreen-control")[0].style.visibility="visible";
            }
		}
		else{ //enter
            if(!myfullscreen) {return}
            myfullscreen=false;
			isfullscreen=true;
			orgplayerw=parseInt(document.getElementById("player").style.width);
    		orgplayerh=parseInt(document.getElementById("player").style.height);
			ratio=orgplayerw/orgplayerh;
 			fsplheight=screen.height-92;
	  		if (document.getElementById("still_video_object_html5_api")){
				fsplheight=fsplheight-32;
			}
			fsplwidth=Math.round(fsplheight*ratio);
			if (screen.width-fsplwidth < 275){
				fsplwidth=screen.width-275;
			}
			document.getElementById("player").style.width=fsplwidth+"px";
			createCookie("player_width",fsplwidth,1);
			elem.style.width="100%";
			sizeadj();
            if (document.getElementsByClassName("vjs-fullscreen-control")) {
              document.getElementsByClassName("vjs-fullscreen-control")[0].style.visibility="hidden";
            }
		}
	}

//player resize
	function sizeadj() {
		resizable_player.update_sizes();
	}


// cookie functions
	function createCookie(name,value,days,domain){
	if (domain){
	var domain=";domain=."+domain;
	}else var domain = "";
	if (days) {
	var date = new Date();
	date.setTime(date.getTime()+(days*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	}else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/"+domain;
	}

	function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
	var c = ca[i];
	while (c.charAt(0)==' ') c = c.substring(1,c.length);
	if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
	}

	function eraseCookie(name,domain){
	createCookie(name,"",-1,domain);
	}

window.addEventListener("DOMContentLoaded", function() { do_script() }, false);

// fix initial player size bug
	if (!readCookie("player_width")){createC("player_width","640",1)};
// to skip agree screen
	createCookie("agreeterms","1",30);
// this cookie removes most add's
	if (!readCookie("noads")){createCookie("noads","1",30);window.location.reload(true)}
// notice and rotating add
	createCookie("np3","0",1);
	createCookie("dism_msg52","1",1);
	createCookie("dism_msg53","1",1);
	createCookie("dism_msg54","1",1);
	createCookie("dism_msg55","1",1);
	createCookie("dism_msg56","1",1);
	createCookie("dism_msg57","1",1);
//.user.js

