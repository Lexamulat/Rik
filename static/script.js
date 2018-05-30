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


function SetMax(locationRes, CharactersStack, summ, callback) {

    for (var i = 0; i < locationRes.length; i++) {
        summ += locationRes[i].residents.length + 1;

        if (CharactersStack[locationRes[i].residents.length] == undefined) {
            CharactersStack[locationRes[i].residents.length] = { 'max': 1, 'curr': 1, 'setX': 0 };
            //replaced summ

        } else {
            CharactersStack[locationRes[i].residents.length].max++;
            CharactersStack[locationRes[i].residents.length].curr++;
        }

    }
    callback(summ);
}


function TosetX(CharactersStack, widthOfOneElement, currentSetX, call) {

    var prevkey = -1;
    for (var key in CharactersStack) {
        if (prevkey == -1) {
            CharactersStack[key].setX = 0;
        } else {
            if (prevkey == 0) {
                currentSetX += (widthOfOneElement * (CharactersStack[prevkey].max))
            } else {
                currentSetX += (widthOfOneElement * (CharactersStack[prevkey].max * (Number(prevkey) + 1)))
                var c = currentSetX

            }
            CharactersStack[key].setX = currentSetX;
        }
        prevkey = key

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
        console.log(summ)
        var widthOfOneElement = 100 / summ;
        console.log(widthOfOneElement)
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
            for (var i = 0; i < locationRes.length; i++) {
                tmp = locationRes[i].residents.length
                    // widthOfTheBlock = (locationRes[i].residents.length) * widthOfOneElement;
                setHeight = (100 / CharactersStack[locationRes[i].residents.length].max);
                XsetX = CharactersStack[locationRes[i].residents.length].setX

                setY = ((CharactersStack[locationRes[i].residents.length].max - CharactersStack[locationRes[i].residents.length].curr) * setHeight);
                CharactersStack[locationRes[i].residents.length].curr--;

                widthOfTheBlock = ((((locationRes[i].residents.length) + 1) * widthOfOneElement) * (CharactersStack[locationRes[i].residents.length].max));
                summwidth += XsetX

                console.log("---------")
                console.log("kol", locationRes[i].residents.length)
                console.log("X", XsetX)
                console.log("wig", widthOfTheBlock)
                console.log(XsetX + widthOfTheBlock)

                var t = newElem('rect', {
                        x: XsetX + '%',
                        y: setY + '%',
                        width: widthOfTheBlock + '%',
                        height: setHeight + '%',
                        stroke: 'black',
                        fill: 'transparent',
                        uid: locationRes[i].id
                    })
                    // не добавляет класс к прямогуг 
                t.innerHTML = locationRes[i].residents.length;
                one.appendChild(t);
            }


            // t.innerHTML = key;
            // one.appendChild(t);

        });

    });

}



// $('.info').hover(
//     function() {
//       let top = $(this).offset().top + $(this).height();
//       let left = $(this).offset().left;
//       let data = $(this).data('modal-text');

//       let div = document.createElement('div');
//       div.id = 'modal';
//       $(div).css('top', top);
//       $(div).css('left', left);
//       $(div).html(data);
//       $('body').append(div);
//     },
//     function() {
//       $('#modal').remove();
//     });
// document.body.onmouseover = handler

// function handler(evet) {
//     console.log("event")
// }
function PopUP() {
    console.log("in")
    console.log(this.getAttribute('uid'))


}

function PopDown() {

    console.log("out")


}
var location1 = {}

async function start() {
    const location = await Request("https://rickandmortyapi.com/api/location/")
    console.log(location)
    location1 = location
    console.log(location1)
        // console.log(location.results[0].residents.length)
    DisplayLocation(location1.results)
        // var rectangles = document.getElementById('r');
        // var rectangles = document.getElementsByClassName('popUp');
    var rectangles = document.getElementsByTagName('rect');
    // console.log(rectangles)
    for (var i = 0; i < rectangles.length; i++) {
        rectangles[i].onmouseover = PopUP
        rectangles[i].onmouseout = PopDown
    }
}
// rectangles[i].onmouseout = function(e) {
//     console.log("out")
// }
// rectangles[i].onmouseover = function(e) {
//     console.log("in")

// }






// window.onload = start
// window.onload = function ()
$(document).ready(start);