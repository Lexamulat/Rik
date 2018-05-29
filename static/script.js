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
            CharactersStack[locationRes[i].residents.length] = { 'max': 1, 'curr': 1, 'name': locationRes[i].name, 'url': locationRes[i].url, 'setX': 1, };
        } else {
            CharactersStack[locationRes[i].residents.length].max++;
            CharactersStack[locationRes[i].residents.length].curr++;
        }

    }
    console.log("2")
    callback(summ);
}


function TosetX(CharactersStack, widthOfOneElement, currentSetX, call) {
    for (var key in CharactersStack) {
        currentSetX += ((key * widthOfOneElement) + widthOfOneElement);
        CharactersStack[key].setX = currentSetX;
    }
    // console.log(CharactersStack)
    call()
}


function DisplayLocation(locationRes) {
    var summ = 0;
    var shift = 0;
    var xCoord = 0,
        yCoord = 0;
    var CharactersStack = {};
    console.log("1")
    SetMax(locationRes, CharactersStack, summ, function(summ) {

        var widthOfOneElement = 100 / summ;
        var currentSetX = 0;
        console.log("3")
        console.log(CharactersStack)
        console.log("4")
        TosetX(CharactersStack, widthOfOneElement, currentSetX, function() {
            console.log(CharactersStack)
            var widthOfTheBlock = 0;
            var setY = 0;
            var setHeight = 0;

            for (var key in CharactersStack) {
                widthOfTheBlock = ((key * widthOfOneElement) + widthOfOneElement);
                setHeight = (100 / (CharactersStack[key].max));
                setY = CharactersStack[key].max - CharactersStack[key].curr

                var t = newElem('rect', {
                    x: CharactersStack[key].setX + '%',
                    y: setY + '%',
                    width: widthOfTheBlock + '%',
                    height: setHeight + '%',
                    stroke: 'black',
                    fill: 'transparent'
                })

                t.innerHTML = key;
                one.appendChild(t);
            }
        });

    });

}


async function start() {
    const location = await Request("https://rickandmortyapi.com/api/location/")
        // console.log(location.results)
        // console.log(location.results[0].residents.length)
    DisplayLocation(location.results)


}

$(document).ready(start);