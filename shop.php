<html>
    <head>
        <link rel="stylesheet" href="globals/page.css">
        <link rel="stylesheet" href="globals/icons.css">
        <link rel="stylesheet" href="css/header.css">
        <link rel="stylesheet" href="css/block.css">
        <link rel="stylesheet" href="css/shopcategory.css">
        <link rel="stylesheet" href="css/product.css">
    </head>
    <body>
        <!-- HEADER -->
        <div class="header">
            <div class="left">
                <img src="" alt="Carta e Dintorni">
            </div>
            <div class="middle">
                <div class="menu">
                    <div class="menu-item"><a href="/home.php"><span>Home</span></a></div>
                    <div class="menu-item"><a href="/shop.php"><span>Negozio</span></a></div>
                    <div class="menu-item"><a href="/info.html"><span>Info</span></a></div>
                </div>
            </div>
            <div class="right">
                <div class="menu">
                    <div class="menu-item"><a href="https://m.facebook.com/people/Carta-e-Dintorni-di-Antonella-Citro/100063020331066/"><img src="icons/facebook.png" alt="Facebook"></a></div>
                    <div class="menu-item"><a href=""><img src="icons/instagram.png" alt="Instagram"></a></div>
                    <!-- <div class="menu-item"><a href=""><img src="icons/whatsapp.png" alt="WhatsApp"></a></div> -->
                </div>
            </div>
        </div>
        <div class="body">
            <div class="block">
                <div class="productlist">
                    <div class="search">
                        
                    </div>
                    <div class="catalogue h-center">
                        <?php 
                            include("database.php");
                            include("debug.php");
                            // echo "get: " . $_GET["cat"];
                            clog();
                            if (true) {
                                //$cat = $_GET["cat"];

                            } else {
                                $arr = getCategories();
                                echo '<div class="shop-categories overflow-x-scroll">';
                                foreach ($arr as $cat) {
                                    $info = getInfo($cat);
                                    echo '<div class="shop-category"><div class="shop-category-header"><img src="' . $info["img"].'" alt="' . $info["nome"] .'"></div><div class="shop-category-body"><a href="?cat=' . $cat . '"><span>' . $info["nome"] . '</span></a></div></div>';
                                }
                                echo '</div>';
                            }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>