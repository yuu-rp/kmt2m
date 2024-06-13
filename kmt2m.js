// ==UserScript==
// @namespace     https://openuserjs.org/users/KvByte
// @name          Kumon Connect touch to mouse
// @description   Converts touch to mouse events, and adjust the interface for mobile.
// @copyright     2021, KvByte (https://openuserjs.org/users/KvByte)
// @license       MIT
// @version       0.1.07
// @include       https://kumonapp.digital.kumon.com/*
// @icon          https://kumonapp.digital.kumon.com/th/favicon.ico
// @grant         none
// @noframes
// ==/UserScript==

// ==OpenUserJS==
// @author KvByte
// ==/OpenUserJS==

(function () {
	'use strict';
	console.log("Start User Script");

	// Based on 'Mickey Shine' solution, created Tap to "click", and updated from initMouseEvent (deprecated) to MouseEvent (new)
	// https://stackoverflow.com/questions/1517924/javascript-mapping-touch-events-to-mouse-events
	let lastTouchStart = 0;
	function touchToMouseHandler(event) {
		// Get first touch input
		let touches = event.changedTouches,
			first = touches[0],
			type = "";

		// Get the correct type to simulate
		switch (event.type) {
			case "touchstart": type = "mousedown"; lastTouchStart = new Date().getTime(); break;
			case "touchmove": type = "mousemove"; break;
			case "touchend": type = "mouseup"; break;
			case "touchend": type = "mouseup"; break;
			default: return;
		}

		// dispatch the simulated type
		const mouseEventInitDictionary = {
			bubbles: true,
			cancelable: true,
			clientX: first.clientX,
			clientY: first.clientY,
			screenX: first.screenX,
			screenY: first.screenY
		}
		const mouseEvent = new MouseEvent(type, mouseEventInitDictionary);
		first.target.dispatchEvent(mouseEvent);

		// Convert Tap to "click" event
		if (type == "mouseup") {
			const currentTime = new Date().getTime();
			if (currentTime - lastTouchStart <= 200 /*ms*/) {
				// dispatch the click type
				const clickEvent = new MouseEvent("click", mouseEventInitDictionary);
				first.target.dispatchEvent(clickEvent);
			}
		}

		// cancels the bubbling of the touch event
		event.preventDefault();
	}

	function initTouchToMouseConverter(el) {
		el.addEventListener("touchstart", touchToMouseHandler, true);
		el.addEventListener("touchmove", touchToMouseHandler, true);
		el.addEventListener("touchend", touchToMouseHandler, true);
		el.addEventListener("touchcancel", touchToMouseHandler, true);
	}

    initTouchToMouseConverter(document);

})();
