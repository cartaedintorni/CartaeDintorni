/**
 * @param {string} url 
 * @returns {string}
 */
async function file_get_contents(url) {
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: url,
            type: "GET",
            success: function (data) {
                resolve(data)
            },
            error: reject
        })
    })
}
function getCategories() {
    var url = "/database/categories.json";
    var cont = JSON.parse(file_get_contents(url));
    return cont["categorie"];
}
function get(cat) {
    var cats = getCategories();
    if (cats.includes(cat)) {
        var url = "/database/" + cat + ".json";
        return JSON.parse(file_get_contents(url));
    } 
    return null;
}
function getProducts(cat) {
    var res = get(cat);
    if (!is_null(res)){
        return res["prodotti"];
    }
    return null;
}
function getInfo(cat) {
    var res = get(cat);
    if (!is_null(res)){
        return res["info"];
    }
    return null;
}

