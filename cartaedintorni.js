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
 * @returns {Array}
 */
async function getTags() {
    var url = baseURl("/database/products.json");
    var cont = await file_get_contents(url);
    return cont["tags"];
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
                    return `<span class=""><span class="text-capitalize fw-bold">`+key+`: </span><span class="fw-normal">`+value+`</span></span><br>`
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
function getHTMLfromProduct(prod,btns=true){
    console.log(prod["prezzo"])
    var prodinfo = "/product.html?data="+encodeURIComponent(JSON.stringify(prod))
    var pid = "productinfo-"+prod["id"]
    var pcat = prod["category"]
    var images = Array.from(prod["img"])
    var pcover = images.shift()
    return `<div class="product card" category="`+pcat+` name="`+prod["nome"]+`" tag="`+prod["tag"].join("")+`">
        <div class="product-header">
            <a href=""><img class="card-img-top" src="`+pcover+`" alt="`+prod["nome"]+`"></a>
        </div>
        <div class="product-body card-body">
            <div class="product-category card-subtitle">
                <span class="truncate">
                    <a class="" href="#" rel="tag">`+pcat+`</a>
                </span>
            </div>
            <div class="product-title card-title">
                <span class="truncate">
                    <a href="#">`+prod["nome"]+`</a>
                </span>
            </div>
            <div class="product-price card-text">
                <span class="sans"><span class="currency">€</span>`+prod["prezzo"]+`</span>
            </div>`+
            (btns?`<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#`+pid+`">Info</button>
            <div class="modal fade" id="`+pid+`" tabindex="-1" aria-labelledby="`+pid+`-Label" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
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
                                <div class="col product-info">
                                    <span class="product-info-category">`+prod["category"]+`</span><br>
                                    <span class="product-info-title">`+prod["nome"]+`</span><br>
                                    <span class="product-info-brand">`+prod["marca"]+`</span><br>
                                    <span class="product-info-description">`+prod["descrizione"]+`</span><br>
                                    <span class="product-info-disp"><span> Disponibilità: </span><span>`+prod["disponibilità"]+`</span></span><br>
                                    <span class="product-info-price"><span class="">€</span>`+prod["prezzo"]+`</span>
                                </div>
                            </div>`+getDetails(prod["dettagli"])+
                        `</div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                        </div>
                    </div>
                </div>
            </div>`:"")+
        `</div>
    </div>`
}


/*** */
async function setProducts(ele) {
    var prods = await getAllProducts()
    var txt = ""
    for (i in prods) {
        txt+=getHTMLfromProduct(prods[i])
    }                    
    ele.innerHTML=txt
}

async function setCategories(ele) {
    var arr = await getCategories();
    var ul = document.createElement("ul")
    for (i in arr) {
        var cat = arr[i]
        var li = document.createElement("li")
        var input = document.createElement("input")
        var labl = document.createElement("label")
        var img = document.createElement("img")
        var span = document.createElement("span")
        input.type="radio"
        input.name="cat"
        input.classList.add("filter-category")
        input.value=cat
        input.id="input-cat-"+cat
        input.addEventListener("click",onFormUpdate)
        labl.setAttribute("for","input-cat-"+cat)
        span.innerHTML=cat
        img.src="https://cartaedintorni.github.io/CartaeDintorni/icons/categories/"+cat+".png"
        labl.appendChild(img)
        labl.appendChild(span)
        li.appendChild(input)
        li.appendChild(labl)
        ul.appendChild(li)
    }
    ele.innerHTML = ""
    ele.appendChild(ul)
    ul.getElementsByTagName("input")[0].checked=true
}

function onFormUpdate() {
    /**
     * @type {HTMLFormElement}
     */
    var form = document.getElementById("filter")
    var catinp = Array.from(form.getElementsByTagName("input")).filter(x=>x.type=="radio"&&x.name=="cat"&&x.checked)
    var tags = Array.from(form.getElementsByTagName("input")).filter(x=>x.type=="checkbox"&&x.name=="tags"&&x.checked).map(x=>x.value)
    // GET data from FORM
    var data = {
        // name: document.getElementById("searchbar").value??null,
        cat: catinp.length>0?catinp[0].value:null,
        tags: tags.length>0?tags:null
    }

    var prods = Array.from(document.getElementById("product-result").getElementsByClassName("product"))
    for (var i in prods){ 
        var prod = prods[i]
        var vsb = true
        if (data.cat) {
            var dc = data.cat.toLowerCase()
            if (dc!="nessuna") {
                var c = prod.getAttribute("category").toLowerCase()
                if (!c.includes(dc)) {vsb=false}
            }
        }
        if (data.tags) {
            var t = prod.getAttribute("tag").toLowerCase().split(" ")
            var dt = data.tags.map(x=>x.toLowerCase())
            /**
             * t = scuola, disegno
             * dt = scuola matita disegno
             */
            for (var i in dt){
                var e = dt[i]
                if (!t.includes(e)) {
                    vsb=false
                    break;
                }
            }
        }
        prod.style.display=vsb?"flex":"none"
    }
}

async function setTags(ele) {
    var arr = await getTags();
    var ul = document.createElement("ul")
    for (i in arr) {
        var tag = arr[i]
        var li = document.createElement("li")
        var input = document.createElement("input")
        var labl = document.createElement("label")
        var img = document.createElement("img")
        var span = document.createElement("span")
        input.type="checkbox"
        input.name="tags"
        input.classList.add("filter-tags")
        input.value=tag
        input.id="input-tag-"+tag
        labl.setAttribute("for","input-cat-"+tag)
        span.innerHTML=tag
        img.src="https://cartaedintorni.github.io/CartaeDintorni/icons/tags/"+tag+".png"
        labl.appendChild(img)
        labl.appendChild(span)
        li.appendChild(input)
        li.appendChild(labl)
        ul.appendChild(li)
    }
    ele.innerHTML = `<button type="button" class="btn btn-dark" id="clear-tags">X</button>`
    document.getElementById("clear-tags").addEventListener("click", ()=>{
        Array.from(document.getElementsByClassName("filter-tags")).forEach(x=>x.checked=false)
    })
    ele.appendChild(ul)
    //ul.getElementsByTagName("input")[0].checked=true
}