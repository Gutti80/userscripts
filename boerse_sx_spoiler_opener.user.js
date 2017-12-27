// ==UserScript==
// @name        Boerse SX Spoiler Opener
// @namespace   asdfgh4xx0r
// @description Alle Spoiler automatisch öffnen
// @include     http://www.boerse.sx/*
// @version     1
// @grant       none
// ==/UserScript==

var elements = document.getElementsByClassName("wrap-spoiler");
	
	for(var i = 0; i < elements.length; i++)
    {
        if(elements[i].firstChild.firstChild.className == 'head-spoiler folded') {
          	elements[i].firstChild.firstChild.click();
        }
}