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
    document.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        const src = e.changedTouches[0];
        document.dispatchEvent( new PointerEvent('pointerdown', {
                                     screenX: src.screenX,
                                     screenY: src.screenY,
                                     clientX: src.clientX,
                                     clientY: src.clientY,
                                     pressure:1
                                     })
        );
    });

    document.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        const src = e.changedTouches[0];
        document.dispatchEvent( new PointerEvent('pointerup', {
                                     screenX: src.screenX,
                                     screenY: src.screenY,
                                     clientX: src.clientX,
                                     clientY: src.clientY,
                                     pressure:0
                                     })
        );
    });

    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        const src = e.changedTouches[0];
        document.dispatchEvent( new PointerEvent('pointermove', {
                                     screenX: src.screenX,
                                     screenY: src.screenY,
                                     clientX: src.clientX,
                                     clientY: src.clientY,
                                     pressure:1
                                     })
        );
    });

})();
