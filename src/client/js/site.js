"use strict";
import metrics from './helper.js';

document.addEventListener('DOMContentLoaded', function () {

    let body = document.getElementsByTagName('body')[0];
    // Click on
    body.addEventListener('click', function (e) {
        let src,
            srcClassName;

        e = e || window.e;
        src = e.target;
        srcClassName = src.className;

        // Jump to top
        if(srcClassName.includes('jumpToTop')) {
            let offset = metrics.getOffset(document.getElementsByClassName('jumpToTop')[0]),
                offsetTop = +offset.top,
                animationSpeed = 25;

            let toTop = setInterval(function () {
                if(offsetTop < animationSpeed + 5) {
                    offsetTop = 0;
                } else {
                    offsetTop -= animationSpeed;
                }

                window.scrollTo(0, offsetTop);

                if(offsetTop === 0) {
                    clearInterval(toTop);
                }
            }, 0);
        };
    });

    // Scroll page
   window.addEventListener('scroll', function () {
       let windowOffsetTop = window.pageYOffset,
           // "Jump to top" element
           jumpToTopElem = document.getElementsByClassName('jumpToTop')[0],
           showJumpBtn = 100;

       // "Jump to top element style"
       let jumpToTopElemStyle = jumpToTopElem.style;
       if(windowOffsetTop > showJumpBtn) {
           jumpToTopElemStyle.display = "block";
       } else {
           jumpToTopElemStyle.display = "none";
       }
   });
});

/*
if(typeof e.stopPropagation() === "function") {
    e.stopPropagation();
}
if(typeof e.cancelBubble !== "undefined") {
    e.cancelBubble = true;
}
if(typeof e.preventDefault() === "function") {
    e.preventDefault();
}
if(typeof e.returnValue !== "undefined") {
    e.returnValue = false;
}*/
