function PlanetsContentClass() {
    ContentClass.call(this);

    function planetPrivatefunc() {
        console.log("pplanetPrivatefunc")
    }

    var suppThis = this;


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


    this.displayContent = function(locationRes) {
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
                    var t = suppThis.newElem('rect', {
                        x: XsetX + '%',
                        y: setY + '%',
                        width: widthOfTheBlock + '%',
                        height: setHeight + '%',
                        stroke: 'black',
                        fill: 'transparent',
                        uid: locationRes[i].id,
                        name: suppThis.getContent()[i].name + ' has ' + suppThis.getContent()[i].residents.length + ' residents'

                    })

                    var txt = suppThis.newElem('text', {
                        x: XsetX + '%',
                        y: (Number(setY) + 2) + '%'
                    })

                    txt.innerHTML = locationRes[i].residents.length;

                    one.appendChild(t);
                    one.appendChild(txt);
                }

            });

        });

    };

    function GetCharacters() {
        var SearchingId = this.getAttribute('uid')
        for (var i = 0; i < suppThis.getContent().length; i++) {
            if (suppThis.getContent()[i].id == SearchingId) {
                break;
            }
        }
        var curr = i

        var QueryStr = ''
        var CurrStr = ''

        for (var j = 0; j < suppThis.getContent()[curr].residents.length; j++) {

            CurrStr = suppThis.getContent()[curr].residents[j]
            CurrStr = CurrStr.substr(42)
            QueryStr = QueryStr + ',' + CurrStr

        }
        QueryStr = QueryStr.substr(1)
        document.location.href = "subCharacters.html?QueryStr=" + QueryStr;
    }

    this.addClicks = function() {
        var rectangles = document.getElementsByTagName('rect');

        for (var i = 0; i < rectangles.length; i++) {
            rectangles[i].onmouseover = suppThis.popUP
            rectangles[i].onmouseout = suppThis.popDown
            rectangles[i].onclick = GetCharacters
        }
    };


}