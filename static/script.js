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


function DisplayLocation(locationRes) {

    for (let l = 0; l < locationRes.length; l++) {
        var t = newElem('div', {
            class: 'hello',
            id: 'tratotui',
        })
        t.innerHTML = 'Привет, мир!';
        one.appendChild(t);
    }
    // var ndiv = newElem('div');
}


async function start() {
    const location = await Request("https://rickandmortyapi.com/api/location/")
    console.log(location)
    console.log(location.results[0].residents.length)
        // DisplayLocation(location.results.residents.length)

}

$(document).ready(start)