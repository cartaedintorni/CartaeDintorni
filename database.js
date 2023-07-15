/**
 * @param {string} url 
 * @returns {Array}
 */
async function file_get_contents(url) {
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: url,
            type: "GET",
            success: (data)=>{
                resolve(data)
            },
            error: reject
        })
    })
}
/**
 * @returns {Array}
 */
async function getCategories() {
    var url = "/database/categories.json";
    var cont = await file_get_contents(url);
    return cont["categorie"];
}
/**
 * @returns {Array | null}
 */
async function get(cat) {
    var cats = await getCategories();
    if (cats.includes(cat)) {
        var url = "/database/" + cat + ".json";
        return await file_get_contents(url);
    } 
    return null;
}
/**
 * @returns {Array | null}
 */
async function getProducts(cat) {
    var res = await get(cat);
    if (res!=null){
        return res["prodotti"];
    }
    return null;
}
/**
 * @returns {JSON | null}
 */
async function getInfo(cat) {
    var res = await get(cat);
    if (res!=null){
        return res["info"];
    }
    return null;
}

function getQuery() {
    var urlParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlParams.entries())
}