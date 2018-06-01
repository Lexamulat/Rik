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
    //REDEFINED METHODS

    this.displayContent = function() {
        console.log("parent disp")
    };
}