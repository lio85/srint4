let idUser=  window.location.pathname.slice(6); // almaceno el id del usuario desde la URL
let userFounded= "user"+idUser;

if (sessionStorage.getItem("productInformation")!=null){

    let productSelected= JSON.parse(sessionStorage.getItem("productInformation"));
    sessionStorage.removeItem("productInformation")

    let arrayProducts=[];

    if (localStorage.getItem(userFounded)==null){
        arrayProducts.push(productSelected)
        localStorage.setItem(userFounded,JSON.stringify(arrayProducts));  
    }
    else {
        arrayProducts=JSON.parse(localStorage.getItem(userFounded))
        localStorage.removeItem(userFounded)
        arrayProducts.push(productSelected)
        localStorage.setItem(userFounded,JSON.stringify(arrayProducts));  
    }

}

//-----------------------------------------------

let localStorageProducts= JSON.parse(localStorage.getItem(userFounded));

let productos_seleccionados= document.querySelector("#productos-seleccionados"); 
//let nombre_producto_seleccionado= document.querySelector(".nombre-producto-seleccionado");
//let cont=0;
if(localStorageProducts!=null){
    for (let i=0;i<localStorageProducts.length;i++){
        //cont ++
        productos_seleccionados.innerHTML+=
        "<div class='producto-seleccionado'><label class='nombre-producto-seleccionado'><strong>Seleccionaste:</strong> "+localStorageProducts[i].nameProduct+"</label><span class='contenedor-imagen-producto-seleccionado'><img class='imagen-producto-seleccionado' src='"+localStorageProducts[i].pathImageProduct+"' alt='maceta-terracota-bemba'></span><div class='detalle-compra-padre'><div class='detalle-compra-hijo'><label>Precio unitario:</label><label class='precio-producto-seleccionado'>$"+localStorageProducts[i].priceProduct+"</label></div></div><div class='detalle-compra-padre'> <div class='detalle-compra-hijo'><label>Cantidad:</label><input class='cantidad-producto-seleccionado' type='number' value='1'><label class='importe-total-producto-seleccionado'>$"+(localStorageProducts[i].priceProduct*2)+"</label></div></div><div class='detalle-compra-padre'> <div class='detalle-compra-hijo-2'><i class='fas fa-trash-alt descartar-compra'></i></div></div></div><div class='main-separador'></div><div class='main-separador2'></div>" 
    }
}
else {
    generalContainer.innerHTML="<li>Nada que mostrar</li>"
}
let productContainer= document.querySelectorAll("ul.productContainer");
for (oneProduct of productContainer){
    oneProduct.style.backgroundColor="yellow";
}