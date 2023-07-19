function baseURl(path) {
    return "https://cartaedintorni.github.io/CartaeDintorni"+path
}
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
            error: (err) =>{
                if (err) {console.log(err)}
                reject(err)
            }
        })
    })
}
/**
 * @returns {Array}
 */
async function getCategories() {
    var url = baseURl("/database/products.json");
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
            var url = baseURl("/database/products.json");
            var prd = await file_get_contents(url);
            return Array.from(prd["products"]).filter(x=>x.category.includes(cat))
        }
    } 
    return null;
}
/**
 * @returns {Array | null}
 */
async function getAllProducts() {
    var url = baseURl("/database/products.json")
    //var url = "/database/products.json"
    var prd = await file_get_contents(url);
    return Array.from(prd["products"])
}

function getQuery() {
    var urlParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlParams.entries())
}

/*** */
/**
 * 
 * @param {string} str 
 * @param {string[]} arr 
 * @param {{
 *  indexstartsfrom: number | undefined,
 *  joinstr: string | undefined
 * }} opt 
 * @returns 
 */
function repeat(str="", arr=[], opt={}) {
    if (arr) {
        if (arr.length>0) {
            var indexmin = opt.indexstartsfrom??0;
            var joinstr = opt.joinstr??"";
            return arr.map((value, index, arr)=>{
                return str.replace("&index", indexmin+index).replace("&indexfromone", indexmin+index+1).replace("&value", value);
            }).join(joinstr);
        }
    } 
    return "";
}
function getDetails(info) {
    if (info) {
        var keys = Object.keys(info)
        if (keys.length>0) {
            return `<div class="row">
                <div>`
                +keys.map(key=>{
                    var value = info[key]
                    return `<span><span>`+key+`: </span><span>`+value+`</span></span>`
                }).join("")+
                `</div>
            </div>`
        }
    }
    return ""
}
/**
 * 
 * @param {{
 *  id: number,
 *  nome: string,
 *  marca: string,
 *  descrizione: string,
 *  dettagli: {
 *      altezza: string,
 *      capacità: string
 *  },
 *  disponibilità: number,
 *  img: string[],
 *  prezzo: number,
 *  tag: string[],
 *  category: string
 * }} prod 
 * @returns 
 */
function getHTMLfromProduct(prod){
    console.log(prod["prezzo"])
    var prodinfo = "/product.html?data="+encodeURIComponent(JSON.stringify(prod))
    var pid = "productinfo-"+prod["id"]
    var pcat = prod["category"]
    var images = Array.from(prod["img"])
    var pcover = images.shift()
    return `<div class="product card" category="`+pcat+`">
        <div class="product-header">
            <a href=""><img class="card-img-top" src="`+pcover+`" alt="`+prod["nome"]+`"></a>
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
                            <div class="row">
                                <div class="col-6">
                                    <div id="`+pid+`carouselIndicators" class="carousel carousel-dark slide">
                                        <div class="carousel-indicators">`
                                        +`<button type="button" data-bs-target="#`+pid+`carouselIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`
                                        +repeat(`<button type="button" data-bs-target="#`+pid+`carouselIndicators" data-bs-slide-to="&index" aria-current="true" aria-label="Slide &indexfromone"></button>`,images,{indexstartsfrom: 1})
                                    +`</div>
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <img src="`+pcover+`" class="d-block w-100 img-fluid" alt="`+prod["nome"]+`">
                                            </div>`
                                            +repeat(`<div class="carousel-item">
                                                <img src="&value" class="d-block w-100 img-fluid" alt="...">
                                            </div>`,images,{indexstartsfrom: 1})
                                    +`</div>
                                        <button class="carousel-control-prev" type="button" data-bs-target="#`+pid+`carouselIndicators" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Previous</span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#`+pid+`carouselIndicators" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="col">
                                    <span>`+prod["nome"]+`</span>
                                    <span>`+prod["category"]+`</span>
                                    <span>`+prod["marca"]+`</span>
                                    <span>`+prod["descrizione"]+`</span>
                                    <span> Disponibilità: </span><span>`+prod["disponibilità"]+`</span>
                                    <span>`+prod["prezzo"]+`</span>
                                </div>
                            </div>`+getDetails(prod["dettagli"])+
                        `</div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}
