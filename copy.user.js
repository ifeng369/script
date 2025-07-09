// ==UserScript==
// @name         允许复制
// @namespace    https://bbs.tampermonkey.net.cn/
// @version      0.1.0
// @description  csdn，zhihu
// @author       You
// @match        *://blog.csdn.net/*
// @match        *://*.zhihu.com/*
// @grant        GM_setClipboard
// ==/UserScript==

(function () {
    'use strict';

    const style = document.createElement("style");
    style.innerHTML = `*{-webkit-touch-callout: auto !important;-webkit-user-select: auto !important;-moz-user-select: auto !important;-khtml-user-select: auto !important;-ms-user-select: auto !important;}`;
    const head = document.getElementsByTagName("head")[0];
    if (head) {
        head.appendChild(style);
    }
    const elements = document.querySelectorAll("[data-title='登录复制']");
    elements.forEach(element => {
        element.setAttribute('data-title', '复制');
        const newNode = element.cloneNode(true);
        element.parentNode.replaceChild(newNode, element);
        newNode.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            const codeElement = event.target.parentElement.parentElement.querySelector("code");

            if (codeElement && codeElement.textContent) {
                const textToCopy = codeElement.textContent.trim();
                GM_setClipboard(textToCopy, "text");
            }
        });
    });


    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === 'c') {
            const content = window.getSelection().toString();
            GM_setClipboard(content, "text");
        }
    });


    setInterval(() => {
        document.querySelector(".passport-login-container,.passport-login-tip-container,#toolBarBox")?.remove()
        document.querySelector('.signFlowModal')?.closest('body > *')?.remove();
        document.evaluate("//button[text()='立即登录/注册']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)?.singleNodeValue?.closest('body > *')?.remove();
        // document.querySelector('button:contains(立即登录/注册)')?.closest('body > *')?.remove();
        document.querySelector('html').style=undefined;
    }, 10)
})();