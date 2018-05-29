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

async function DisplayLocation(locationRes) {
    var summ = 0;
    var shift = 0;
    var xCoord = 0,
        yCoord = 0;

    for (let i = 0; i < locationRes.length; i++) {
        summ += locationRes[i].residents.length;
    }

    //!! summ of inhabitants, for ex. 354, then each inhabitant will add @widthOfOneElement@ to the width of the block
    var widthOfOneElement = 100 / summ;
    var widthOfTheBlock = 0;

    for (let i = 0; i < locationRes.length; i++) {

        widthOfTheBlock = (locationRes[i].residents.length) * widthOfOneElement;

        // console.log("------------------")
        // console.log(locationRes[i].residents.length)
        // console.log(widthOfTheBlock)
        // console.log("------------------")

        // await lineCount(locationRes[i].residents.length)

        var t = newElem('rect', {
            x: xCoord + '%',
            y: '0',
            width: widthOfTheBlock + '%',
            height: '100%',
            stroke: 'black',
            fill: 'transparent'
        })

        t.innerHTML = locationRes[i].residents.length;
        one.appendChild(t);

        xCoord += widthOfTheBlock;

    }
}


async function start() {
    const location = await Request("https://rickandmortyapi.com/api/location/")
        // console.log(location)
        // console.log(location.results[0].residents.length)
    await DisplayLocation(location.results)

}

$(document).ready(start)