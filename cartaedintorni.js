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

/*** */
function getHTMLfromProduct(prod){
    console.log(prod["prezzo"])
    var prodinfo = "/product.html?data="+encodeURIComponent(JSON.stringify(prod))
    var pid = "productinfo-"+prod["id"]
    var pcat = prod["category"]
    return `<div class="product card" category="`+pcat+`">
        <div class="product-header">
            <a href=""><img class="card-img-top" src="`+prod["img"][0]+`" alt="`+prod["nome"]+`"></a>
        </div>
        <div class="product-body card-body">
            <div class="product-category card-subtitle">
                <span class="truncate">
                    <a class="" href="/shop.html?cat=`+pcat+`" rel="tag">`+pcat+`</a>
                </span>
            </div>
            <div class="product-title card-title">
                <span class="truncate">
                    <a href="">`+prod["nome"]+`</a>
                </span>
            </div>
            <div class="product-price card-text">
                <span class="sans"><span class="currency">€</span>`+prod["prezzo"]+`</span>
            </div>
            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#`+pid+`">Info</button>
            <div class="modal fade" id="`+pid+`" tabindex="-1" aria-labelledby="`+pid+`-Label" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="`+pid+`-Label">`+prod["nome"]+`</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body container">
                            <div class="col-6">

                            </div>
                            <div class="col">
                            
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}