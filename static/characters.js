async function Request(url, postData) {
    return new Promise(resolve => {
        $.get(url, JSON.stringify(postData), function(data, textStatus) {
            resolve(data)
        }, "json");
    });
}

async function DisplayCharacters() {
    console.log(Getlocation)
    var SearchingId = this.getAttribute('uid')

    for (var i = 0; i < Getlocation.results.length; i++) {
        if (Getlocation.results[i].id == SearchingId) {
            break;
        }
    }
    var curr = i

    var QueryStr = ''
    var CurrStr = ''

    for (var j = 0; j < Getlocation.results[curr].residents.length; j++) {

        CurrStr = Getlocation.results[curr].residents[j]
        CurrStr = CurrStr.substr(42)
        QueryStr = QueryStr + ',' + CurrStr

    }
    QueryStr = QueryStr.substr(1)

    GetlCharacters = await Request("https://rickandmortyapi.com/api/character/" + QueryStr)
    console.log(GetlCharacters)

}




function start() {
    Rt()
    console.log("Characters start")
}


window.onload = start