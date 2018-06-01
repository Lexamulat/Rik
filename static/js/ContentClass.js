function ContentClass() {
    var content = {};
    var suppThis = this;

    //GENERAL METHODS BEGIN
    this.someParentMethd = function() {
        console.log("someParentMethd")
    };

    this.Request = function(url) {
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        if (req.status != 200) {

            alert(req.status + ': ' + req.statusText);
        } else {
            return JSON.parse(req.responseText)
        }
    };
    //FUNCTIONS FOR RENDER SUPPORT BEGIN

    this.attr = function(el, at, value) {
        at = { 'for': 'htmlFor', 'class': 'className' }[at] || at;
        if (!value) {
            return el[at] || el.getAttribute(at) || '';
        } else {
            if (at == 'style') { el.style.cssText = value; return; }
            el[at] = value;
            if (el.setAttribute) el.setAttribute(at, value);
        }
    };

    this.newElem = function(tag, params) {
        params = params || {};
        var elem = document.createElementNS ?
            document.createElementNS("http://www.w3.org/2000/svg", tag) :
            document.createElement(tag);
        for (var pr in params) {
            suppThis.attr(elem, pr, params[pr]);
        }

        return elem;
    };
    this.append = function(el, where) {
        (where || document.one).appendChild(el);
    };
    //FUNCTIONS FOR RENDER SUPPORT END
    this.someParentMethd = function() {
        console.log("someParentMethd")
    };

    this.popUp = function() {
        console.log("popUp")
    };

    this.popDown = function() {
        console.log("popDown")
    };

    this.setContent = function(inputContent) {
        content = inputContent
    };

    this.getContent = function() {
        return content;
    };

    this.showContent = function() {
        console.log("content: ", content)
    };
    //GENERAL METHODS END



    //REDEFINED METHODS

    this.displayContent = function() {
        console.log("parent disp")
    };
}