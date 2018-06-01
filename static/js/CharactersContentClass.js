function CharactersContentClass() {
    ContentClass.call(this); // отнаследовать
    this.displayContent = function() {
        console.log("characters disp")
        this.someParentMethd()
    };
}