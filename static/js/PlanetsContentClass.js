function PlanetsContentClass() {
    ContentClass.call(this); // отнаследовать
    this.displayContent = function() {
        console.log("planets disp")
    };
}