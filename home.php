<html>
    <head>
        <!-- <link rel="stylesheet" href="globals/debug.css"> -->

        <link rel="stylesheet" href="globals/page.css">
        <link rel="stylesheet" href="globals/icons.css">
        <link rel="stylesheet" href="css/header.css">
        <link rel="stylesheet" href="css/block.css">
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
                    <div class="menu-item"><span><a href="/home.php">Home</a></span></div>
                    <div class="menu-item"><span><a href="/shop.php">Negozio</a></span></div>
                    <div class="menu-item"><span><a href="/info.html">Info</a></span></div>
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
        <!-- !HEADER -->
        <!-- FIRSTBLOCK -->
        <div class="body">
            <div class="block center bg-home block-style-home">
                <h1>Carta e Dintorni</h1>
            </div>
            <div class="block center">
                <div class="overflow-x-scroll">
                    <h3 class="subtitle new-arrivals">Ultimi arrivi</h3>
                    <div class="topproducts">
                        <?php 
                            $product_array = array(
                                array("title"=>"Zaino Eastpak 1", "price"=>20,"img"=>"https://newageshop.com/cdn/shop/products/221-eastpak-padded-pakr-ek00062023s1p_1400x.jpg", "category" => "Zaino"),
                                array("title"=>"Zaino Eastpak 2", "price"=>30,"img"=>"https://newageshop.com/cdn/shop/products/221-eastpak-padded-pakr-ek00062023s1p_1400x.jpg", "category" => "Zaino"),
                                array("title"=>"Zaino Eastpak 3", "price"=>15,"img"=>"https://newageshop.com/cdn/shop/products/221-eastpak-padded-pakr-ek00062023s1p_1400x.jpg", "category" => "Zaino")
                            );
                            if (! empty($product_array)) {
                                foreach ($product_array as $key => $value) {
                        ?>

                        <div class="product">
                            <div class="product-header">
                                <a src=""><img src="<?php echo($product_array[$key]["img"])?>" alt="<?php echo($product_array[$key]["title"])?>"></a>
                            </div>
                            <div class="product-body">
                                <div class="product-category">
                                    <span class="truncate">
                                        <a href="" rel="tag"><?php echo($product_array[$key]["category"])?></a>
                                    </span>
                                </div>
                                <div class="product-title">
                                    <span class="truncate">
                                        <a href=""><?php echo($product_array[$key]["title"])?></a>
                                    </span>
                                </div>
                                <div class="product-price">
                                    <span class="sans"><span class="currency">€</span><?php echo($product_array[$key]["price"])?></span>
                                </div>
                            </div>
                        </div>
                        <?php
                            }
                            }
                        ?>
                    </div>
                </div>
            </div>
            <div class="block">

            </div>
        </div>
    </body>
</html>