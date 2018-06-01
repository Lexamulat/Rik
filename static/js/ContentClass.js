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

    this.attr = function(el, attribute, value) {
        attribute = { 'for': 'htmlFor' }[attribute] || attribute;
        if (!value) {
            return el[attribute] || el.getAttribute(attribute) || '';
        } else {
            if (attribute == 'style') { el.style.cssText = value; return; }
            el[attribute] = value;
            if (el.setAttribute) el.setAttribute(attribute, value);
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

    this.popUP = function() {
        var Description = this.getAttribute('name')
        var PopElem = document.getElementById('popUp')

        PopElem.style.display = 'block';

        PopElem.innerHTML = Description

        var XBlockInPercent = this.getAttribute('x')
            // !! eraise % from x=26.4544%
        XBlockInPercent = (XBlockInPercent.slice(0, -1))

        var WidthBlockInPercent = this.getAttribute('width')
        WidthBlockInPercent = (WidthBlockInPercent.slice(0, -1))
            // !! get current mouse coordinates and screen params
        var ClientWidthInPix = Number(document.documentElement.clientWidth)
        var ClientHeightInPix = Number(document.documentElement.clientHeight)
        var ClientXCoordInPix = Number(window.event.clientX)
        var ClientYCoordInPix = Number(window.event.clientY)

        var PercFromTop = (((ClientHeightInPix - ClientYCoordInPix) / ClientHeightInPix) * 100)

        if ((Number(XBlockInPercent) + Number(WidthBlockInPercent)) > 90) {
            //!! width of the PopUp window from css in percent
            PopElem.style.left = (100 - Number(WidthBlockInPercent) - 13) + '%';
        } else {
            var XShiftInPx = (ClientWidthInPix / 100) * 2
            PopElem.style.left = ClientXCoordInPix + XShiftInPx
        }
        if (PercFromTop < 15) {
            //!! height of the PopUp window from css in percent
            var YShiftInPx = (ClientHeightInPix / 100) * 15
            PopElem.style.top = window.event.clientY - YShiftInPx;

        } else {
            PopElem.style.top = window.event.clientY;

        }
        PopElem.style.fontSize = 1.5 + 'vw'

    };

    this.popDown = function() {
        var PopElem = document.getElementById('popUp')
        PopElem.style.display = 'none';
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