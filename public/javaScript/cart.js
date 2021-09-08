let id_product= window.location.pathname.slice(16);
console.log("ID del producto: " + id_product);

let path_image= document.querySelector(".selected_product").attributes[1].value;
console.log("ruta de la imagen en el proyecto: "+ path_image);