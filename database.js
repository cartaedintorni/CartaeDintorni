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
 * @param {string} c 
 * @returns {Array | null}
 */
async function getProducts(c) {
    var cat = c.toLowerCase()
    var cats = await getCategories();
    if (cats.includes(cat)) {
        if (cat=="nessuna") {
            return getAllProducts()
        } else {
            var url = "/database/products.json";
            var prd = (await file_get_contents(url))["products"];
            return Array.from(prd).filter(x=>x.category.includes(cat))
        }
    } 
    return null;
}
/**
 * @returns {Array | null}
 */
async function getAllProducts() {
    var url = "/database/products.json";
    var prd = (await file_get_contents(url))["products"];
    return Array.from(prd)
}

function getQuery() {
    var urlParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlParams.entries())
}