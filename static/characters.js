// async function Request(url, postData) {
//     return new Promise(resolve => {
//         $.get(url, JSON.stringify(postData), function(data, textStatus) {
//             resolve(data)
//         }, "json");
//     });
// }

async function DisplayCharacters() {
    console.log("Getlocation")

    console.log(document.location.search)
        //!! Take Get Params eraise @?uid=3@ to 3
    var SearchingId = (document.location.search).substr(10)
    console.log(SearchingId)



    // GetlCharacters = await Request("https://rickandmortyapi.com/api/character/" + QueryStr)


}




async function start() {

    console.log("Characters start")
    DisplayCharacters()
        // var RequestString = "https://rickandmortyapi.com/api/location/"
        // var Characters = await Request(RequestString)
        // console.log(GetlocationRes)

    // DisplayCharacters()
}


window.onload = start