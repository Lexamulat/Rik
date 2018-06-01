function ContentClass() {
    var content = {};
    //GENERAL METHODS
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



    //REDEFINED METHODS

    this.displayContent = function() {
        console.log("parent disp")
    };
}