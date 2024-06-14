// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-06-14
// @description  try to take over the world!
// @author       You
// @match        https://kumonapp.digital.kumon.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kumon.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const proto = EventTarget.prototype;
    const _addEventListener = EventTarget.prototype.addEventListener;
    Object.defineProperty(proto, "addEventListener", {
        value: function (type, fn, ...rest) {
            _addEventListener.call(this, type, function(...args) {
                if(type.startsWith('pointer')) {
                    console.log(`addEventListener of type %c${type}`+` was fired`, "color:cyan; background-color:black; font-weight:bold; padding:0.2rem;");
                    console.log('arguments:', args[0]);
                    if(args[0].pointerType=='touch') args[0].pointerType='pen';
                }
                console.log('delegating arguments:', args);
                return fn.apply(this, args);
            }, ...rest);
       }
    });

})();
