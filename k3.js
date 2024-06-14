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
                console.log(`addEventListener of type %c${type}`+` was fired`, "color:cyan; background-color:black; font-weight:bold; padding:0.2rem;");
                console.log('arguments:', args);
                if(type.startsWith('pointer') && args[0].pointerType=='touch') {
                    const _args = [new PointerEvent(args[0].type, {
                        isTrusted: args[0].isTrusted,
                        altKey: args[0].altKey,
                        altitudeAngle: args[0].altitudeAngle,
                        azimuthAngle: args[0].azimuthAngle,
                        bubbles: args[0].bubbles,
                        button: args[0].type=='pointermove' ? -1 : 0,
                        buttons: args[0].type=='pointerup' ? 0 : 1,
                        cancelBubble: args[0].cancelBubble,
                        cancelable: args[0].cancelable,
                        clientX: args[0].clientX,
                        clientY: args[0].clientY,
                        composed: args[0].composed,
                        ctrlKey: args[0].ctrlKey,
                        currentTarget: args[0].currentTarget,
                        defaultPrevented: args[0].defaultPrevented,
                        detail: args[0].detail,
                        eventPhrase: args[0].eventPhrase,
                        fromElement: args[0].fromElement,
                        height: args[0].type=='pointerup' ? 1 : 0,
                        isPrimary: true,
                        layerX: args[0].layerX,
                        layerY: args[0].layerY,
                        metaKey: args[0].metaKey,
                        movementX: args[0].movementX,
                        movementY: args[0].movementY,
                        offsetX: args[0].offsetX,
                        offsetY: args[0].offsetY,
                        pageX: args[0].pageX,
                        pageY: args[0].pageY,
                        pointerId: args[0].pointerId,
                        pointerType: 'pen',
                        pressure: args[0].type=='pointerup' ? 0 : 0.5,
                        relatedTarget: args[0].relatedTarget,
                        returnValue: args[0].returnValue,
                        screenX: args[0].screenX,
                        screenY: args[0].screenY,
                        shiftKey: args[0].shiftKey,
                        sourceCapabilities: args[0].sourceCapabilities,
                        srcElement: args[0].srcElement,
                        tangentialPressure: args[0].tangentialPressure,
                        target: args[0].target,
                        tiltX: 30,
                        tiltY: 15,
                        timeStamp: args[0].timeStamp,
                        toElement: args[0].toElement,
                        twist: args[0].twist,
                        type: args[0].type,
                        view: args[0].view,
                        which: args[0].type=='pointermove' ? 0 : 1,
                        width: args[0].type=='pointerup' ? 1 : 0,
                        x: args[0].x,
                        y: args[0].y
                        })];
                    console.log('delegating arguments:', _args);
                    return fn.apply(this, _args);
                }
                return fn.apply(this, args);
            }, ...rest);
       }
    });

})();
