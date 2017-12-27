// ==UserScript==
// @name          MyGully Spoiler Opener
// @namespace     http://userstyles.org
// @description	  open all spoilers on mygully.com
// @author        d34fdumbbl1nd
// @homepage      https://userstyles.org/styles/50259
// @include       http://mygully.com/*
// @include       https://mygully.com/*
// @include       http://*.mygully.com/*
// @include       https://*.mygully.com/*
// @run-at        document-start
// @version       0.20110703190556
// ==/UserScript==
(function() {var css = [
	"@namespace url(http://www.w3.org/1999/xhtml);",
	"div div.spoiler",
	"   {",
	"      display: block !important;",
	"   }"
].join("\n");
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node);
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
