let id_product= window.location.pathname.slice(16);
console.log("ID del producto: " + id_product);

let path_image= document.querySelector(".selected_product_image").attributes[1].value;
console.log("ruta de la imagen en el proyecto: "+ path_image);

let price_product= document.querySelector(".selected_product_price").innerHTML.substr(1);
console.log(price_product);