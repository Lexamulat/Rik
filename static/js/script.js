function countNumOfInhabitantsInPlanets(locationRes, CharactersStack, summ, callback) {

    for (var i = 0; i < locationRes.length; i++) {
        // !! calculate the weight of one inhabitant. there are planets with 0 inh thats why +1
        summ += locationRes[i].residents.length + 1;
        if (CharactersStack[locationRes[i].residents.length] == undefined) {
            // "max:"is the num of planets with the same number of inhabitants, "curr:" used later for Setheight of one block in this category
            CharactersStack[locationRes[i].residents.length] = { 'max': 1, 'curr': 1, 'setX': 0 };

        } else {
            CharactersStack[locationRes[i].residents.length].max++;
            CharactersStack[locationRes[i].residents.length].curr++;
        }

    }
    callback(summ);
}


function toSetX(CharactersStack, widthOfOneElement, currentSetX, call) {

    var prevkey = -1;

    for (var key in CharactersStack) {
        if (prevkey === -1) {
            CharactersStack[key].setX = 0;
        } else {
            if (prevkey === 0) {
                currentSetX += (widthOfOneElement * (CharactersStack[prevkey].max))
            } else {
                currentSetX += (widthOfOneElement * (CharactersStack[prevkey].max * (Number(prevkey) + 1)))
                var c = currentSetX

            }
            // !!Set X coords for the group of planets
            CharactersStack[key].setX = currentSetX;
        }
        prevkey = key

    }
    call()
}


function displayLocation(locationRes) {
    var summ = 0;
    var shift = 0;
    var xCoord = 0,
        yCoord = 0;
    var CharactersStack = {};


    countNumOfInhabitantsInPlanets(locationRes, CharactersStack, summ, function(summ) {
        var widthOfOneElement = 100 / summ;
        var currentSetX = 0;
        toSetX(CharactersStack, widthOfOneElement, currentSetX, function() {

            var widthOfTheBlock = 0;
            var XsetX = 0;
            var setY = 0;
            var setHeight = 0;
            var tmp = 0
            var summwidth = 0;

            for (var i = 0; i < locationRes.length; i++) {
                tmp = locationRes[i].residents.length
                setHeight = (100 / CharactersStack[locationRes[i].residents.length].max);
                XsetX = CharactersStack[locationRes[i].residents.length].setX

                setY = ((CharactersStack[locationRes[i].residents.length].max - CharactersStack[locationRes[i].residents.length].curr) * setHeight);
                CharactersStack[locationRes[i].residents.length].curr--;

                widthOfTheBlock = ((((locationRes[i].residents.length) + 1) * widthOfOneElement) * (CharactersStack[locationRes[i].residents.length].max));
                summwidth += XsetX
                var t = newElem('rect', {
                    x: XsetX + '%',
                    y: setY + '%',
                    width: widthOfTheBlock + '%',
                    height: setHeight + '%',
                    stroke: 'black',
                    fill: 'transparent',
                    uid: locationRes[i].id
                })

                var txt = newElem('text', {
                    x: XsetX + '%',
                    y: (Number(setY) + 2) + '%'
                })

                txt.innerHTML = locationRes[i].residents.length;

                one.appendChild(t);
                one.appendChild(txt);
            }

        });

    });

}



function popUP() {
    var SearchingId = this.getAttribute('uid')

    for (var i = 0; i < GetlocationRes.length; i++) {
        if (GetlocationRes[i].id == SearchingId) {
            break;
        }
    }
    var PopElem = document.getElementById('popUp')

    PopElem.style.display = 'block';

    PopElem.innerHTML = GetlocationRes[i].name + ' has ' + GetlocationRes[i].residents.length + ' residents'

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
    PopElem.style.fontSize = 2 + 'vw'

}




function popDown() {
    var PopElem = document.getElementById('popUp')
    PopElem.style.display = 'none';
}

function GetCharacters() {
    var SearchingId = this.getAttribute('uid')

    for (var i = 0; i < GetlocationRes.length; i++) {
        if (GetlocationRes[i].id == SearchingId) {
            break;
        }
    }
    var curr = i

    var QueryStr = ''
    var CurrStr = ''

    for (var j = 0; j < GetlocationRes[curr].residents.length; j++) {

        CurrStr = GetlocationRes[curr].residents[j]
        CurrStr = CurrStr.substr(42)
        QueryStr = QueryStr + ',' + CurrStr

    }
    QueryStr = QueryStr.substr(1)



    document.location.href = "characters.html?QueryStr=" + QueryStr;
}


var GetlocationRes = {}

function start() {

    var RequestString = "https://rickandmortyapi.com/api/location/"

    var Getlocation = MyReq(RequestString)

    GetlocationRes = Getlocation.results

    while (Getlocation.info.next != "") {
        RequestString = Getlocation.info.next
        Getlocation = MyReq(RequestString)
        GetlocationRes = GetlocationRes.concat(Getlocation.results)

    }


    displayLocation(GetlocationRes)


    var rectangles = document.getElementsByTagName('rect');

    for (var i = 0; i < rectangles.length; i++) {
        rectangles[i].onmouseover = popUP
        rectangles[i].onmouseout = popDown
        rectangles[i].onclick = GetCharacters
    }


}
window.onload = start;

// TODO WRITE DATA TO LOCALSTORAGE


// rectangles[i].onmouseout = function(e) {
//     console.log("out")
// }
// rectangles[i].onmouseover = function(e) {
//     console.log("in")

// }