async function Request(url, postData) {
    return new Promise(resolve => {
        $.get(url, JSON.stringify(postData), function(data, textStatus) {
            resolve(data)
        }, "json");
    });
}




function attr(el, at, value) {
    at = { 'for': 'htmlFor', 'class': 'className' }[at] || at;
    if (!value) {
        return el[at] || el.getAttribute(at) || '';
    } else {
        if (at == 'style') { el.style.cssText = value; return; }
        el[at] = value;
        if (el.setAttribute) el.setAttribute(at, value);
    }
}

function newElem(tag, params) {
    params = params || {};
    var elem = document.createElementNS ?
        document.createElementNS("http://www.w3.org/2000/svg", tag) :
        document.createElement(tag);

    for (var pr in params) {
        attr(elem, pr, params[pr]);
    }

    return elem;
}


function append(el, where) {
    (where || document.one).appendChild(el);
}



/* <rect x="10%" y="10%" width="10%" height="20%" stroke="black" fill="transparent" stroke-width="1"/>  */


// async function lineCount(size, totalWeightOfElements) {
//     var x = 0,
//         y = 0;

// }

function SetMax(locationRes, CharactersStack, summ, callback) {
    for (var i = 0; i < locationRes.length; i++) {
        summ += locationRes[i].residents.length + 1;
        if (CharactersStack[locationRes[i].residents.length] == undefined) {
            CharactersStack[locationRes[i].residents.length] = { 'max': 1, 'curr': 1, 'setX': 0 };
        } else {
            CharactersStack[locationRes[i].residents.length].max++;
            CharactersStack[locationRes[i].residents.length].curr++;
        }

    }
    console.log("2")
    callback(summ);
}


function TosetX(CharactersStack, widthOfOneElement, currentSetX, call) {
    var prevX = 0;
    for (var key in CharactersStack) {
        currentSetX += prevX * widthOfOneElement;
        // currentSetX += ((key * widthOfOneElement) + widthOfOneElement); //первый отступ должен быть 0
        CharactersStack[key].setX = currentSetX;
        prevX = Number(key) + 1;
    }
    call()
}


function DisplayLocation(locationRes) {
    var summ = 0;
    var shift = 0;
    var xCoord = 0,
        yCoord = 0;
    var CharactersStack = {};


    SetMax(locationRes, CharactersStack, summ, function(summ) {

        var widthOfOneElement = 100 / summ;
        var currentSetX = 0;

        TosetX(CharactersStack, widthOfOneElement, currentSetX, function() {

            var widthOfTheBlock = 0;
            var XsetX = 0;
            var setY = 0;
            var setHeight = 0;

            // for (var key in CharactersStack) {
            //     widthOfTheBlock = ((key * widthOfOneElement) + widthOfOneElement);
            //     setHeight = (100 / (CharactersStack[key].max));
            //     setY = CharactersStack[key].max - CharactersStack[key].curr

            //     var t = newElem('rect', {
            //         x: CharactersStack[key].setX + '%',
            //         y: setY + '%',
            //         width: widthOfTheBlock + '%',
            //         height: setHeight + '%',
            //         stroke: 'black',
            //         fill: 'transparent'
            //     })
            var tmp = 0
            var summwidth = 0;
            console.log(CharactersStack)
            for (let i = 0; i < locationRes.length; i++) {
                tmp = locationRes[i].residents.length
                    // widthOfTheBlock = (locationRes[i].residents.length) * widthOfOneElement;
                setHeight = (100 / CharactersStack[locationRes[i].residents.length].max);
                XsetX = CharactersStack[locationRes[i].residents.length].setX

                setY = ((CharactersStack[locationRes[i].residents.length].max - CharactersStack[locationRes[i].residents.length].curr) * setHeight);
                CharactersStack[locationRes[i].residents.length].curr--;
                widthOfTheBlock = ((locationRes[i].residents.length * widthOfOneElement) + widthOfOneElement);
                summwidth += XsetX
                if (locationRes[i].residents.length == 105) {
                    console.log("---------")
                    console.log(XsetX)
                    console.log(widthOfTheBlock)
                }
                var t = newElem('rect', {
                    x: XsetX + '%',
                    y: setY + '%',
                    width: widthOfTheBlock + '%',
                    height: setHeight + '%',
                    stroke: 'black',
                    fill: 'transparent'
                })

                t.innerHTML = locationRes[i].residents.length;
                one.appendChild(t);



            }


            // t.innerHTML = key;
            // one.appendChild(t);

        });

    });

}


async function start() {
    const location = await Request("https://rickandmortyapi.com/api/location/")
    console.log(location.results)
        // console.log(location.results[0].residents.length)
    DisplayLocation(location.results)

}

$(document).ready(start);