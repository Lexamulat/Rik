function start() {

    var Characters = new CharactersContentClass();

    Characters.getCharactersInfo(function() {
        Characters.countBlocksSize()
        Characters.setAnimatedpopUpsAndBakcClik()

        window.onresize = function(e) {

            one.innerHTML = '';
            Characters.countBlocksSize()
            Characters.setAnimatedpopUpsAndBakcClik()

        }

    });


}

window.onload = start;