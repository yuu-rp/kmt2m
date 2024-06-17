// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-06-16
// @description  try to take over the world!
// @author       You
// @match        https://class-navi.digital.kumon.com/th/index.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kumon.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ADD CSS
    const ss = document.createElement('style');
    ss.textContent = `
    .km-sct-extra::before {
      content: '';
      font-size: 0.5rem;
      text-align: center;
      display: flex;
      place-content: center;
      place-items: center;
      width: 100%;
      height: 100%;
    }
    .km-sct-extra.star::before {
      content: '⚫️';
    }
    .km-sct-extra.red::before {
      background-color: rgba(255, 0, 0, 0.4);
    }
    .km-sct-extra.orange::before {
      background-color: rgba(255, 153, 51, 0.4);
    }
    .km-sct-extra.yellow::before {
      background-color: rgba(255, 255, 0, 0.4);
    }
    `;
    document.head.appendChild(ss);
    const o = ['orange'];
    const y = ['yellow'];
    const r = ['red'];
    const x = ['star'];
    const ox = ['orange','star'];
    const rx = ['red','star'];
    const Markers = {
        math: {
            '6a': [['orange','star'],,,['orange','star'],,,,,,,['orange'],,,['star'],,,,,,,],
            '5a': [['yellow'],['orange','star'],,,,,['star'],,,,['orange','star'],,,,,,,,,['orange','star']],
            '4a': [['orange','star'],,,,['orange','star'],,,['orange','star'],,,['orange'],,,,['orange'],,,,,,],
            '3a': [,,,,,,['star'],['orange','star'],,,,,['red','star'],['orange','star'],,,['orange','star'],,['orange','star'],,],
            '2a': [['yellow'],['orange','star'],,['orange'],,['orange','star'],,['orange'],,['orange'],,,,['orange'],,['orange'],,['orange'],,['star']],
            'a' : [['yellow'],,['orange','star'],,['orange'],['star'],,['red','star'],['orange','star'],,,,,,['orange','star'],,,,,['red','star']],
            'b' : [['yellow'],['orange','star'],['orange','star'],,['orange','star'],['star'],,,,['red','star'],['yellow'],['yellow'],['orange','star'],['orange','star'],,['red','star'],['orange','star'],,['star'],['red','star']],
            'c' : [['yellow'],['orange','star'],,,,['orange','star'],,,,,['star','red'],['orange','star'],['orange','star'],,,['star'],['orange','star'],['star'],['star'],,],
            'd' : [['yellow'],['orange','star'],,,['star'],['yellow'],['yellow'],['star','red'],['orange','star'],,,,,['orange','star'],['star','red'],['orange','star'],['orange','star'],,['star','red'],['star']],
            'e' : [['yellow'],['orange','star'],['star'],['orange','star'],['star'],,,,,['star'],['orange'],['star'],['star'],,['orange','star'],,['orange','star'],,['star'],,],
            'f' : [['yellow'],['orange','star'],['orange','star'],['orange','star'],,['star'],['orange','star'],['orange','star'],,,,,['star'],['orange','star'],,,['red','star'],['red','star'],['orange','star'],['orange','star']],
            'g' : [['yellow'],['yellow'],['orange','star'],['orange','star'],,,['orange','star'],['orange'],['orange','star'],,['orange','star'],,['orange','star'],,['star'],['star'],['orange','star'],['star'],['star'],['star']],
            'h' : [['yellow'],['yellow'],['orange','star'],['star'],['orange','star'],,,,['orange'],['orange'],['star'],['red'],['orange','star'],['star'],['orange','star'],['star'],,['star'],['orange'],],
            'i' : [['yellow'],['orange'],['orange','star'],['orange','star'],['star'],['star'],,,['orange'],,,['orange'],['orange','star'],,['orange'],['star'],,['orange'],['red'],],
            'j' : [['orange'],['yellow'],['yellow'],['orange','star'],['star'],['red'],['orange'],['orange'],['star'],['orange'],,,['orange','star'],['orange','star'],['orange','star'],['orange'],['orange','star'],['orange','star'],['orange','star'],['red']],
            'k' : [['yellow'],['yellow'],['orange'],,['orange','star'],['red','star'],['red','star'],['orange','star'],,,['orange','star'],,['orange','star'],['star'],,['orange','star'],,['orange'],['star'],],
            'l' : [['orange','star'],,['star'],['orange'],['orange'],,['orange','star'],,,,['red'],['orange'],['star'],,['orange'],,['orange'],,['red'],['red']],
        },
        efl: {
            '7a': [ox,,,,ox,,,,,,ox,,,,,,,,,],
            '6a': [ox,,,,,ox,,,,,x,,,,,,,,,,],
            '5a': [ox,,,,,,,,,,ox,,,,,,,,,,],
            '4a': [ox,,ox,,,,,ox,,,,,,,,x,,,,,],
            '3a': [ox,,,,,x,,,,,ox,,,,,,,,,,],
            '2a': [ox,,x,,,x,,ox,,,,,ox,,,,,x,,,],
            'a': [ox,,,,,,ox,ox,ox,,,,,,,,,,,,],
            'b': [ox,,,,,ox,,,,,ox,,,,,,,x,,,],
            'c': [ox,,,,,ox,,,,,,,,x,,,,,,,],
            'd': [ox,,,x,,,rx,,x,,,,r,x,,,,x,,,],
            'e': [,rx,,,,,,ox,,,rx,,,x,,rx,,,,,],
            'f': [,,x,,ox,r,rx,,,,,x,,,,,,x,,],
            'g': [ox,,x,,,x,,x,,,,x,,x,,,,ox,,,],
            'h': [x,,ox,,,,,ox,,,,,ox,x,,,,,ox,],
            'i': [ox,,,,,,,,,,ox,,,,,,,,x,],
            'j': [,,,,,,,,,,x,,,x,,ox,,,,,],
            'k': [ox,,,,,x,,,,,ox,,,,,,,,,,],
            'l': [,,,,r,,,,,,,,,,,,,,,,],
            'm': [,,,,,,r,,,,,r,,,,,,,x,],
            'n': [],
            'o': [],
        },
        trp: {
            '5a': [ox,r,,,,ox,,,,,,,ox,,,,r,ox,,],
            '4a': [ox,,,r,x,,,,ox,,,,ox,,,,,ox,,],
            '3a': [ox,,x,rx,,,ox,,,,,ox,,,,,ox,,,],
            '2a': [ox,,ox,rx,,r,ox,,,,,ox,,,,,o,,,],
            'aⅰ': [ox,,,x,r,x,ox,,,,,r,,,,ox,,rx,,],
            'aⅱ': [ox,,,,,,ox,,,,ox,,r,,,,,,,],
            'bⅰ': [ox,,rx,rx,o,,,,rx,,ox,],
            'bⅱ': [ox,r,,,,,,,ox,,,,ox,],
            'cⅰ': [ox,,,,,,,,,,ox,,,,r,r,ox,,r,],
            'cⅱ': [ox,,,,,,,ox,,,,,,ox,],
            'dⅰ': [ox,,rx,,ox,ox,ox,,,r,,ox,,,,r,],
            'dⅱ': [ox,,,,,,,,ox,,,,,,ox,x,,rx,r,],
            'eⅰ': [ox,,,,,ox,o,,,,,,ox,,,,,rx,r,r,],
            'eⅱ': [ox,,,,,,,,,,ox,],
            'fⅰ': [ox,,,,x,,ox,o,,,,,,ox,,,,r,r,],
            'fⅱ': [ox,,,x,,,,,,,ox,],
        }
    }

    // Your code here...
    const appRoot = document.querySelector('app-root');
    const callback = (mutationList, observer) => {
        const pageTitle = document.querySelector('.page-title');
        if(!pageTitle) return;
        const scts = document.querySelectorAll('.standardTimeItem');
        if(!scts.length) return;
        const currSubject = document.querySelector('.btn-subject-select').innerText.toLowerCase();
        const currLevel = document.querySelector('.worksheet-name').innerText.toLowerCase();

        //console.log('SUBJECT:', currSubject);
        //console.log('LEVEL:', currLevel);
        //console.log('SCT items:', scts);

        //console.log('Markers:', Markers[currSubject][currLevel])
        Markers[currSubject][currLevel].forEach((x, i) => {
            if(!x) return;
            //console.log(scts[i]);
            scts[i].classList.add('km-sct-extra');
            x.forEach((c) => scts[i].classList.add(c));
            //scts[i].classList.add(x)
        });
        //console.log('pageTitle:', pageTitle);
    }

    const observer = new MutationObserver(callback);

    observer.observe(appRoot, {childList: true, subtree: true });
})();
