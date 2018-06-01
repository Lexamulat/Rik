function start() {

    var Characters = new CharactersContentClass();

    Characters.getCharactersInfo(function() {
        Characters.countBlocksSize()
        var imgs = document.getElementsByTagName('image');
        var btn = document.getElementById('backButtn');
        btn.onclick = Characters.redirect

        window.onresize = function(e) {
            btn.onclick = Characters.redirect

            one.innerHTML = '';

            Characters.countBlocksSize()
            for (var i = 0; i < imgs.length; i++) {
                imgs[i].onmouseover = this.imgPopUp
                imgs[i].onmouseout = this.imgPopDown
            }
        }


        for (var i = 0; i < imgs.length; i++) {
            imgs[i].onmouseover = this.imgPopUp
            imgs[i].onmouseout = this.imgPopDown
        }
    });


}

window.onload = start;