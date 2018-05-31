async function GetCharactersInfo(callback) {

    //!! Take Get Params eraise @?uid=3@ to 3
    var QueryStr = (document.location.search).substr(10)
    GetCharactersData = await Request("https://rickandmortyapi.com/api/character/" + QueryStr)
    console.log(GetCharactersData)
    callback()
}

function CanIDisplayIt(SideOfASquareInPix, ClientWidthInPix, ClientHeightInPix, NumOfSquares) {
    var XInsertPosition = 0,
        YInsertPosition = 0,
        j = 0;
    for (var i = 0; i < NumOfSquares; i++) {
        XInsertPosition = j * SideOfASquareInPix
        j++;
        if ((XInsertPosition + SideOfASquareInPix) >= ClientWidthInPix) {
            j = 1;
            YInsertPosition += SideOfASquareInPix;
            XInsertPosition = 0;
        }

        // console.log(XInsertPosition, YInsertPosition)
        if (YInsertPosition + SideOfASquareInPix >= ClientHeightInPix) {
            return 0;
        }
    }

    return 1;


}

function DisplayCharacters(SideOfASquareInPix, ClientWidthInPix, ClientHeightInPix, NumOfSquares) {
    console.log("in display func")


    var XSideOfASquareInPerc = ((SideOfASquareInPix / ClientWidthInPix) * 100),
        YSideOfASquareInPerc = ((SideOfASquareInPix / ClientHeightInPix) * 100);

    // console.log("Perc", SideOfASquareInPerc)

    var XInsertPosition = 0,
        YInsertPosition = 0,
        j = 0;
    console.log(GetCharactersData)
    for (var i = 0; i < NumOfSquares; i++) {

        XInsertPosition = j * XSideOfASquareInPerc
        j++;
        if ((XInsertPosition + XSideOfASquareInPerc) >= 100) {
            j = 1;
            YInsertPosition += YSideOfASquareInPerc
            XInsertPosition = 0;
        }

        if (i == 0) {
            var t = newElem('rect', {
                x: XInsertPosition + '%',
                y: YInsertPosition + '%',
                width: XSideOfASquareInPerc + '%',
                height: YSideOfASquareInPerc + '%',
                fill: "plum",
                id: "backButtn",
                onclick: "Redirect()"
            })
            var txt = newElem('text', {
                x: 0 + '%',
                y: 0 + '%',
                dy: 13,
                // style: "font-size: 1em;"

            })
            one.appendChild(t);
            one.appendChild(txt);
            txt.innerHTML = "Back";

        } else {
            var t = newElem('image', {
                x: XInsertPosition + '%',
                y: YInsertPosition + '%',
                width: XSideOfASquareInPerc + '%',
                height: YSideOfASquareInPerc + '%',
                href: GetCharactersData[i - 1].image,
                name: GetCharactersData[i - 1].name

            })
            one.appendChild(t);
        }


    }
}

function Redirect() {
    document.location.href = "index.html"
}

function CountBlocksSize() {
    console.log(GetCharactersData.length);
    var ClientWidthInPix = Number(document.documentElement.clientWidth),
        ClientHeightInPix = Number(document.documentElement.clientHeight),
        ScreenArea = ClientWidthInPix * ClientHeightInPix,
        // !! START square size = 10 px
        SideOfASquareInPix = 10,
        AreaOfOneSquare = SideOfASquareInPix * SideOfASquareInPix,
        //!! RESERVED first square for @back@
        NumOfSquares = Number(GetCharactersData.length) + 1;

    // !!DIVIDED the algorithm into 2 parts. For optimize the search for the optimal length of the square side
    while ((NumOfSquares * AreaOfOneSquare) < ScreenArea) {

        SideOfASquareInPix = SideOfASquareInPix * 2;
        AreaOfOneSquare = SideOfASquareInPix * SideOfASquareInPix;
        // console.log("first")
    }

    SideOfASquareInPix = SideOfASquareInPix / 2;
    AreaOfOneSquare = SideOfASquareInPix * SideOfASquareInPix;

    while ((NumOfSquares * AreaOfOneSquare) < ScreenArea) {
        SideOfASquareInPix++;
        AreaOfOneSquare = SideOfASquareInPix * SideOfASquareInPix;
        // console.log("second")
    }
    SideOfASquareInPix--;
    AreaOfOneSquare = SideOfASquareInPix * SideOfASquareInPix;

    console.log("screen", ScreenArea)
    console.log("num", NumOfSquares)
    console.log("side size", SideOfASquareInPix)
    console.log("s of squares", NumOfSquares * (SideOfASquareInPix * SideOfASquareInPix))

    // CanIDisplayIt(SideOfASquareInPix, ClientWidthInPix, ClientHeightInPix, NumOfSquares)
    var can = CanIDisplayIt(SideOfASquareInPix, ClientWidthInPix, ClientHeightInPix, NumOfSquares)
    console.log("can", can)

    while (can == 0) {
        SideOfASquareInPix--;
        can = CanIDisplayIt(SideOfASquareInPix, ClientWidthInPix, ClientHeightInPix, NumOfSquares)
        console.log("can", can)
    }
    console.log(SideOfASquareInPix)

    DisplayCharacters(SideOfASquareInPix, ClientWidthInPix, ClientHeightInPix, NumOfSquares)
}


function ImgPopUP() {

    var Description = this.getAttribute('name')
    var PopElem = document.getElementById('popUp')

    PopElem.style.display = 'block';
    PopElem.innerHTML = Description
    var XBlockInPercent = this.getAttribute('x')
    XBlockInPercent = (XBlockInPercent.slice(0, -1))
        // var YBlockInPercent = this.getAttribute('y')
    var WidthBlockInPercent = this.getAttribute('width')
    WidthBlockInPercent = (WidthBlockInPercent.slice(0, -1))

    var ClientWidthInPix = Number(document.documentElement.clientWidth)
    var ClientHeightInPix = Number(document.documentElement.clientHeight)
    var ClientXCoordInPix = Number(window.event.clientX)
    var ClientYCoordInPix = Number(window.event.clientY)
    var PercFromTop = (((ClientHeightInPix - ClientYCoordInPix) / ClientHeightInPix) * 100)

    if ((Number(XBlockInPercent) + Number(WidthBlockInPercent)) > 90) {
        //width of the PopUp window from css in percent
        PopElem.style.left = (100 - Number(WidthBlockInPercent) - 13) + '%';
    } else {
        var XShiftInPx = (ClientWidthInPix / 100) * 2
        PopElem.style.left = ClientXCoordInPix + XShiftInPx
    }
    if (PercFromTop < 10) {
        console.log(getComputedStyle(PopElem).height)
            //height of the PopUp window from css in percent
        var YShiftInPx = (ClientHeightInPix / 100) * 6
        PopElem.style.top = window.event.clientY - YShiftInPx;

        console.log("top")
    } else {
        PopElem.style.top = window.event.clientY;

    }

}

function ImgPopDown() {
    var PopElem = document.getElementById('popUp')
    PopElem.style.display = 'none';
}

var GetCharactersData = {}

async function start() {

    console.log("Characters start")


    GetCharactersInfo(function() {
        CountBlocksSize()

        window.onresize = function(e) {
            console.log("in")
            one.innerHTML = '';
            CountBlocksSize()
        }



        var imgs = document.getElementsByTagName('image');
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].onmouseover = ImgPopUP
            imgs[i].onmouseout = ImgPopDown
        }
    });
    // window.onresize = CountBlocksSize


}




window.onload = start;