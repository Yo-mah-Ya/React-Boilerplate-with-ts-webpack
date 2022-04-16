// @ts-nocheck
import "intersection-observer";
import "formdata-polyfill";

if (typeof window !== "undefined") {
    // https://developers.google.com/web/updates/2015/08/using-requestidlecallback
    window.requestIdleCallback =
        window.requestIdleCallback ||
        function (cb) {
            var start = Date.now();
            return setTimeout(function () {
                cb({
                    didTimeout: false,
                    timeRemaining: function () {
                        return Math.max(0, 50 - (Date.now() - start));
                    },
                });
            }, 1);
        };

    window.cancelIdleCallback =
        window.cancelIdleCallback ||
        function (id) {
            clearTimeout(id);
        };

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function (s) {
            var el = this;

            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }
}
