<?php 
function getCategories() {
    $url = "D:/carta e dintorni/database/categories.json";
    $cont = json_decode(file_get_contents($url),true);
    return $cont["categorie"];
}
function get($cat) {
    $cats = getCategories();
    if (in_array($cat,$cats,false)) {
        $url = "D:/carta e dintorni/database/" . $cat . ".json";
        return json_decode(file_get_contents($url),true);
    } 
    return null;
}
function getProducts($cat) {
    $res = get($cat);
    if (!is_null($res)){
        return $res["prodotti"];
    }
    return null;
}
function getInfo($cat) {
    $res = get($cat);
    if (!is_null($res)){
        return $res["info"];
    }
    return null;
}

?>
