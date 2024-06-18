// ==UserScript==
// @name         Kumon Connect Project Plan Helper
// @namespace    http://tampermonkey.net/
// @version      2024-06-16
// @description  try to take over the world!
// @author       You
// @match        https://class-navi.digital.kumon.com/th/index.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kumon.com
// @grant        none
// ==/UserScript==

(function() {
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
const CSS = {
  z: undefined,
  Y: ['yellow'],
  O: ['orange'],
  R: ['red'],
  X: ['star'],
  A: ['orange', 'star'],
  B: ['red', 'star']
}
const o = ['orange'];
const y = ['yellow'];
const r = ['red'];
const x = ['star'];
const ox = ['orange','star'];
const rx = ['red','star'];
const Markers = {
    math: {
        '6a': 'AzzAzzzzzzOzzXzzzzzz',
        '5a': 'YAzzzzXzzzAzzzzzzzzA',
        '4a': 'AzzzAzzAzzOzzzOzzzzz',
        '3a': 'zzzzzzXAzzzzBAzzAzAz',
        '2a': 'YAzOzAzOzOzzzOzOzOzX',
        'a' : 'YzAzAXzBAzzzzzAzzzzB',
        'b' : 'YAAzAXzzzBYYAAzBAzXB',
        'c' : 'YAzzzAzzzzBAAzzXAXXz',
        'd' : 'YAzzXYYBAzzzzABAAzBX',
        'e' : 'YAXAXzzzzXOXXzOzOzXz',
        'f' : 'YAAAzXAAzzzzXAzzBBAA',
        'g' : 'YYAAzzAOAzAzAzXXAXXX',
        'h' : 'YYAXAzzzOOXRAXAXzXOz',
        'i' : 'YOAAXXzzOzzOAzOXzORz',
        'j' : 'OYYAXROOXOzzAAAOAAAR',
        'k' : 'YYOzABBAzzAzAXzAzOXz',
        'l' : 'AzXOOzAzzzROXzOzOzRR'
    },
    efl: {
        '7a': 'AzzzAzzzzzAzzzzzzzzz',
        '6a': 'AzzzzAzzzzXzzzzzzzzz',
        '5a': 'AzzzzzzzzzAzzzzzzzzz',
        '4a': 'AzAzzzzAzzzzzzzXzzzz',
        '3a': 'AzzzzXzzzzAzzzzzzzzz',
        '2a': 'AzXzzXzAzzzzAzzzzXzz',
        'a' : 'AzzzzzAAAzzzzzzzzzzz',
        'b' : 'AzzzzAzzzzAzzzzzzXzz',
        'c' : 'AzzzzAzzzzzzzAzzzzzz',
        'd' : 'AzzXzzBzXzzzRXzzzXzz',
        'e' : 'zBzzzzzAzzBzzXzBzzzz',
        'f' : 'zzXzARBzzzzXzzzzzXzz',
        'g' : 'AzXzzXzXzzzXzXzzzAzz',
        'h' : 'XzAzzzzAzzzzAXzzzzAz',
        'i' : 'AzzzzzzzzzAzzzzzzzXz',
        'j' : 'zzzzzzzzzzXzzXzAzzzz',
        'k' : 'AzzzzXzzzzAzzzzzzzzz',
        'l' : 'zzzzRzzzzzzzzzzzzzzz',
        'm' : 'zzzzzzRzzzzRzzzzzzXz',
        'n' : 'zzzzzzzzzzzzzzzzzzzz',
        'o' : 'zzzzzzzzzzzzzzzzzzzz'
    },
    trp: {
        '5a': 'ARzzzAzzzzzzAzzzRAzz',
        '4a': 'AzzRXzzzAzzzAzzzzAzz',
        '3a': 'AzXBzzAzzzzAzzzzAzzz',
        '2a': 'AzABzRAzzzzAzzzzOzzz',
        'aⅰ': 'AzzXRXAzzzzRzzzAzBzz',
        'aⅱ': 'AzzzzzAzzzAzRzzzzzzz',
        'bⅰ': 'AzBBOzzzBzAzzzzzzzzz',
        'bⅱ': 'ARzzzzzzAzzzAzzzzzzz',
        'cⅰ': 'AzzzzzzzzzAzzzRRAzRz',
        'cⅱ': 'AzzzzzzAzzzzzAzzzzzz',
        'dⅰ': 'AzBzAAAzzRzAzzzRzzzz',
        'dⅱ': 'AzzzzzzzAzzzzzAXzBRz',
        'eⅰ': 'AzzzzAOzzzzzAzzzBRRz',
        'eⅱ': 'AzzzzzzzzzAzzzzzzzzz',
        'fⅰ': 'AzzzXzAOzzzzzAzzzRRz',
        'fⅱ': 'AzzXzzzzzzAzzzzzzzzz'
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

      console.log('SUBJECT:', currSubject);
      console.log('LEVEL:', currLevel);
      console.log('SCT items:', scts);

      //console.log('Markers:', Markers[currSubject][currLevel])
      const mk = Markers[currSubject][currLevel]
      console.log('mk:', mk)

      for(let i=0; i<20; i++) {
        const c = CSS[mk[i]]
        if(!c) continue;
        scts[i].classList.add('km-sct-extra');
        c.forEach((a) => scts[i].classList.add(a))
      }
      // Markers[currSubject][currLevel].forEach((x, i) => {
      //     if(!x) return;
      //     //console.log(scts[i]);
      //     scts[i].classList.add('km-sct-extra');
      //     x.forEach((c) => scts[i].classList.add(c));
      //     //scts[i].classList.add(x)
      // });
      //console.log('pageTitle:', pageTitle);
  }

  const observer = new MutationObserver(callback);

  observer.observe(appRoot, {childList: true, subtree: true });
})()
