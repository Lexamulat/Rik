async function Request(url, postData) {
    return new Promise(resolve => {
        $.get(url, JSON.stringify(postData), function(data, textStatus) {
            resolve(data)
        }, "json");
    });
}

function MyReq(url) {
    var req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send();
    if (req.status != 200) {

        alert(req.status + ': ' + req.statusText);
    } else {
        return JSON.parse(req.responseText)
    }
}