function CharactersContentClass() {
    ContentClass.call(this);
    var suppThis = this;



    this.getCharactersInfo = function(callback) {
        var QueryStr = (document.location.search).substr(10)
        var FirstNum = getFirstNumsOfQueryStr(QueryStr);
        if (checkLocalStor(FirstNum) == 0) {
            this.setContent(this.Request("https://rickandmortyapi.com/api/character/" + QueryStr))
            setLocalStor(FirstNum)
        } else {
            this.setContent(getLocalStor(FirstNum))
        }
        callback()
    };


    function canIDisplayIt(SideOfASquareInPix, ClientWidthInPix, ClientHeightInPix, NumOfSquares) {
        var XInsertPosition = 0,
            YInsertPosition = 0,
            j = 0;

        for (var i = 0; i < NumOfSquares; i++) {

            XInsertPosition = j * SideOfASquareInPix
            j++;

            //    !!dont let the block get out of the screen size
            if ((XInsertPosition + SideOfASquareInPix) >= ClientWidthInPix) {
                j = 1;
                YInsertPosition += SideOfASquareInPix;
                XInsertPosition = 0;
            }

            if (YInsertPosition + SideOfASquareInPix >= ClientHeightInPix) {
                return 0;
            }
        }
        return 1;
    }


    function displayCharacters(SideOfASquareInPix, ClientWidthInPix, ClientHeightInPix, NumOfSquares) {


        var XSideOfASquareInPerc = ((SideOfASquareInPix / ClientWidthInPix) * 100),
            YSideOfASquareInPerc = ((SideOfASquareInPix / ClientHeightInPix) * 100);


        var XInsertPosition = 0,
            YInsertPosition = 0,
            j = 0;

        for (var i = 0; i < NumOfSquares; i++) {

            XInsertPosition = j * XSideOfASquareInPerc
            j++;
            if ((XInsertPosition + XSideOfASquareInPerc) >= 100) {
                j = 1;
                YInsertPosition += YSideOfASquareInPerc
                XInsertPosition = 0;
            }
            // !!сreate button: back
            if (i === 0) {
                var t = suppThis.newElem('rect', {
                    x: XInsertPosition + '%',
                    y: YInsertPosition + '%',
                    width: XSideOfASquareInPerc + '%',
                    height: YSideOfASquareInPerc + '%',
                    fill: "plum",
                    id: "backButtn",
                })
                var txt = suppThis.newElem('text', {
                    x: XInsertPosition + '%',
                    y: YInsertPosition + '%',
                    dy: ((YSideOfASquareInPerc) / 2) + '%',
                    style: "font-size: 2vw;"

                })
                one.appendChild(t);
                one.appendChild(txt);
                txt.innerHTML = "Back";

            } else {
                // !! if obj have only one value 
                if (suppThis.getContent().length == undefined) {

                    // !! if obj have no values 
                    if (suppThis.getContent().image == undefined) {
                        return;
                    } else {
                        var t = suppThis.newElem('image', {
                            x: XInsertPosition + '%',
                            y: YInsertPosition + '%',
                            width: XSideOfASquareInPerc + '%',
                            height: YSideOfASquareInPerc + '%',
                            href: suppThis.getContent().image,
                            name: suppThis.getContent().name

                        })
                    }
                } else {
                    var t = suppThis.newElem('image', {
                        x: XInsertPosition + '%',
                        y: YInsertPosition + '%',
                        width: XSideOfASquareInPerc + '%',
                        height: YSideOfASquareInPerc + '%',
                        href: suppThis.getContent()[i - 1].image,
                        name: suppThis.getContent()[i - 1].name

                    })
                }
                one.appendChild(t);
            }


        }
    }

    function redirect() {
        document.location.href = "mainPlanets.html"

    }

    this.setAnimatedpopUpsAndBakcClik = function() {
        var imgs = document.getElementsByTagName('image');
        var btn = document.getElementById('backButtn');
        btn.onclick = redirect
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].onmouseover = suppThis.popUP
        }
    };

    this.countBlocksSize = function() {
        if (this.getContent().length == undefined) {
            var GetCharactersDatalength = 1;
        } else {
            var GetCharactersDatalength = this.getContent().length;
        }

        var ClientWidthInPix = Number(document.documentElement.clientWidth),
            ClientHeightInPix = Number(document.documentElement.clientHeight),
            ScreenArea = ClientWidthInPix * ClientHeightInPix,
            // !! START square size = 10 px
            SideOfASquareInPix = 10,
            AreaOfOneSquare = SideOfASquareInPix * SideOfASquareInPix,
            //!! RESERVED first square for @back@
            NumOfSquares = Number(GetCharactersDatalength) + 1;

        // !!DIVIDED the algorithm into 2 parts. For optimize the process of searching for the optimal length of the square side
        while ((NumOfSquares * AreaOfOneSquare) < ScreenArea) {

            SideOfASquareInPix = SideOfASquareInPix * 2;
            AreaOfOneSquare = SideOfASquareInPix * SideOfASquareInPix;
        }

        SideOfASquareInPix = SideOfASquareInPix / 2;
        AreaOfOneSquare = SideOfASquareInPix * SideOfASquareInPix;

        while ((NumOfSquares * AreaOfOneSquare) < ScreenArea) {
            SideOfASquareInPix++;
            AreaOfOneSquare = SideOfASquareInPix * SideOfASquareInPix;
        }
        SideOfASquareInPix--;
        AreaOfOneSquare = SideOfASquareInPix * SideOfASquareInPix;
        var can = canIDisplayIt(SideOfASquareInPix, ClientWidthInPix, ClientHeightInPix, NumOfSquares)

        while (can == 0) {
            SideOfASquareInPix--;
            can = canIDisplayIt(SideOfASquareInPix, ClientWidthInPix, ClientHeightInPix, NumOfSquares)
        }

        displayCharacters(SideOfASquareInPix, ClientWidthInPix, ClientHeightInPix, NumOfSquares)

    };

    getFirstNumsOfQueryStr = function(QueryStr) {
        var j = 0;
        for (var i in QueryStr) {
            if (QueryStr[i] === ',')
                break;
            j++;
        }
        QueryStr = QueryStr.substr(0, j)
        return QueryStr
    };

    checkLocalStor = function(CheckStr) {
        if (localStorage.getItem("Character" + CheckStr) != null) {
            return 1;
        } else {
            return 0;
        }
    };

    setLocalStor = function(FirstNum) {
        localStorage.setItem("Character" + FirstNum, JSON.stringify(suppThis.getContent()))
    };

    getLocalStor = function(FirstNum) {
        return JSON.parse(localStorage.getItem("Character" + FirstNum))
    };
}