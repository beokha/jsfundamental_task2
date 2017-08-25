let metrics = (function () {
    let obj = {};

    obj.getOffset = (elem) => {
        let rect = elem.getBoundingClientRect(),
            body = document.body;

        return {
            top: rect.top + body.scrollTop,
            left: rect.left + body.scrollLeft
        }
    }

    return obj;
})();

export default metrics;