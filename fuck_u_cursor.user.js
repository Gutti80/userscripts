// ==UserScript==
// @name          Fuck U Cursor
// @namespace     http://userstyles.org
// @description	  Fuck U Cursor
// @author        CARMAN10thebest ツ
// @homepage      https://userstyles.org/styles/143454
// @run-at        document-start
// @version       0.20170603231537
// ==/UserScript==
(function() {var css = [
	"/*by xXCARMANXx*/         ",
	"     ",
	"                   * {cursor: url(http://cur.cursors-4u.net/symbols/sym-1/sym46.cur), default!important}"
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