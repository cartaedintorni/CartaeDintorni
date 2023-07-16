/**
 * @param {string} url 
 * @returns {Object}
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
    var url = "/database/products.json";
    var cont = await file_get_contents(url);
    return cont["categories"];
}
/**
 * @returns {Array | null}
 */
async function getProducts(cat) {
    var cats = await getCategories();
    if (cats.includes(cat)) {
        var url = "/database/products.json";
        var prd = (await file_get_contents(url))["products"];
        return Array.from(prd).filter(x=>x.category.includes(cat))
    } 
    return null;
}

function getQuery() {
    var urlParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlParams.entries())
}