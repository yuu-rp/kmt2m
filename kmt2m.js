// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-06-13
// @description  try to take over the world!
// @author       You
// @match        https://kumonapp.digital.kumon.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kumon.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.addEventListener('touchstart', (e) => {
	    console.log("touchstart");
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        const src = e.changedTouches[0];
	    const ev = new PointerEvent("pointerdown", { isTrusted:true, pointerType:'mouse', x:src.clientX, y:src.clientY, clientX: src.clientX, clientY: src.clientY, button:0, screenX: src.screenX, screenY: src.screenY, pressure:0.5 });
	    console.log(ev);
	    window.dispatchEvent(ev);
    });

    window.addEventListener('touchend', (e) => {
	    console.log("touchend");
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        const src = e.changedTouches[0];
        const ev = new PointerEvent("pointerup", { isTrusted: true, pointerType: 'mouse', x: src.clientX, y: src.clientY, clientX: src.clientX, clientY: src.clientY, button:0, screenX: src.screenX, screenY: src.screenY, pressure:0 });
	    console.log(ev);
        window.dispatchEvent(ev);
    });

    window.addEventListener('touchmove', (e) => {
    	console.log("touchmove");
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        const src = e.changedTouches[0];
        const ev = new PointerEvent("pointermove", { isTrusted: true, pointerType: 'mouse', x: src.clientX, y: src.clientY, clientX: src.clientX, clientY: src.clientY, button:0, screenX: src.screenX, screenY: src.screenY, pressure:0.5 });
	    console.log(ev);
        window.dispatchEvent(ev);
    });

})();
