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
        document.createElementNS('http://www.w3.org/1999/xhtml', tag) :
        document.createElement(tag);

    for (var pr in params) {
        attr(elem, pr, params[pr]);
    }

    return elem;
}


function append(el, where) {
    (where || document.one).appendChild(el);
}


async function DisplayLocation(locationRes) {

    for (let i = 0; i < locationRes.length; i++) {
        var t = newElem('li', {
            class: 'clr'
        })
        t.innerHTML = locationRes[i].residents.length;
        two.appendChild(t);
    }
}


async function start() {
    const location = await Request("https://rickandmortyapi.com/api/location/")
    console.log(location)
        // console.log(location.results[0].residents.length)
        // await DisplayLocation(location.results)

}

$(document).ready(start)