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
    const touchToMouse = function (event) {
        // if (event.touches.length > 1) return; //allow default multi-touch gestures to work
        var touch = event.changedTouches[0];
        var type = "";

        switch (event.type) {
            case "touchstart":
                type = "mousedown"; break;
            case "touchmove":
                type = "mousemove"; break;
            case "touchend":
                type = "mouseup"; break;
            default:
                return;
        }

        // https://developer.mozilla.org/en/DOM/event.initMouseEvent for API
        const simulatedEvent = new MouseEvent(type, {
            screenX: touch.screenX,
            screenY: touch.screenY,
            clientX: touch.clientX,
            clientY: touch.clientY,
            view: window,
            cancelable: true,
            bubbles: true, 
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            detail: 1,
            button: 0
        })
        // var simulatedEvent = document.createEvent("MouseEvent");
        // simulatedEvent.initMouseEvent(type, true, true, window, 1,
        //     touch.screenX, touch.screenY,
        //     touch.clientX, touch.clientY, false,
        //     false, false, false, 0, null);

        touch.target.dispatchEvent(simulatedEvent);
        event.preventDefault();
    };
    window.ontouchstart = touchToMouse;
    window.ontouchmove = touchToMouse;
    window.ontouchend = touchToMouse;
})();
