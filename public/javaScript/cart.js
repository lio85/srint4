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

const fragment= document.createDocumentFragment();



let cont=0;
if(localStorageProducts!=null){
    for (const product of localStorageProducts){

        // estructura HTML
        // div padre de toda la estructura de cada producto
        const div_productoSeleccionado= document.createElement("div");
        div_productoSeleccionado.classList.add("producto-seleccionado");

            // hijos del div padre anterior
            const label_nombreProductoSeleccionado= document.createElement("label");
            label_nombreProductoSeleccionado.classList.add("nombre-producto-seleccionado");
                label_nombreProductoSeleccionado.innerHTML= `<strong>Seleccionaste</strong> ${product.nameProduct}`

            const span_contenedorImagenProductoSeleccionado= document.createElement("span");
            span_contenedorImagenProductoSeleccionado.classList.add("contenedor-imagen-producto-seleccionado");
                const img_productoSeleccionado= document.createElement("img");
                img_productoSeleccionado.classList.add("imagen-producto-seleccionado");
                img_productoSeleccionado.setAttribute("src",product.pathImageProduct);
                span_contenedorImagenProductoSeleccionado.appendChild(img_productoSeleccionado)

            const div_detalleCompraPadre= document.createElement("div");
            div_detalleCompraPadre.classList.add("detalle-compra-padre");

            const div_detalleCompraHijo= document.createElement("div");
            div_detalleCompraHijo.classList.add("detalle-compra-hijo");
        // estructura HTML



        
        div_productoSeleccionado.appendChild(label_nombreProductoSeleccionado)
        div_productoSeleccionado.appendChild(span_contenedorImagenProductoSeleccionado)
        fragment.appendChild(div_productoSeleccionado);

        //productos_seleccionados.innerHTML="<h1>vacalocaaaaaaaaaaaaaaaaa</h1>"
    }    
}
else {
    productos_seleccionados.innerHTML="<h1>Aún no has agregado ningún producto a tu carrito</h1>"
}

productos_seleccionados.appendChild(fragment)


/* for (let i=0;i<localStorageProducts.length;i++){
    cont ++
    if(cont==1){
        productos_seleccionados.innerHTML+=
        "<div class='producto-seleccionado'><label class='nombre-producto-seleccionado'><strong>Seleccionaste:</strong> "+localStorageProducts[i].nameProduct+"</label><span class='contenedor-imagen-producto-seleccionado'><img class='imagen-producto-seleccionado' src='"+localStorageProducts[i].pathImageProduct+"' alt='maceta-terracota-bemba'></span><div class='detalle-compra-padre'><div class='detalle-compra-hijo'><label>Precio unitario:</label><label class='precio-producto-seleccionado'>$"+localStorageProducts[i].priceProduct+"</label></div></div><div class='detalle-compra-padre'> <div class='detalle-compra-hijo'><label>Cantidad:</label><input class='cantidad-producto-seleccionado' type='number' value='1'><label class='importe-total-producto-seleccionado'>$"+(localStorageProducts[i].priceProduct*2)+"</label></div></div><div class='detalle-compra-padre'> <div class='detalle-compra-hijo-2'><i class='fas fa-trash-alt descartar-compra'></i></div></div></div><div class='main-separador'></div>" 
    }
    else if (cont==2){
        productos_seleccionados.innerHTML+=
        "<div class='producto-seleccionado'><label class='nombre-producto-seleccionado'><strong>Seleccionaste:</strong> "+localStorageProducts[i].nameProduct+"</label><span class='contenedor-imagen-producto-seleccionado'><img class='imagen-producto-seleccionado' src='"+localStorageProducts[i].pathImageProduct+"' alt='maceta-terracota-bemba'></span><div class='detalle-compra-padre'><div class='detalle-compra-hijo'><label>Precio unitario:</label><label class='precio-producto-seleccionado'>$"+localStorageProducts[i].priceProduct+"</label></div></div><div class='detalle-compra-padre'> <div class='detalle-compra-hijo'><label>Cantidad:</label><input class='cantidad-producto-seleccionado' type='number' value='1'><label class='importe-total-producto-seleccionado'>$"+(localStorageProducts[i].priceProduct*2)+"</label></div></div><div class='detalle-compra-padre'> <div class='detalle-compra-hijo-2'><i class='fas fa-trash-alt descartar-compra'></i></div></div></div><div class='main-separador'></div><div class='main-separador2'></div>" 
    }
    else {
        productos_seleccionados.innerHTML+=
        "<div class='producto-seleccionado'><label class='nombre-producto-seleccionado'><strong>Seleccionaste:</strong> "+localStorageProducts[i].nameProduct+"</label><span class='contenedor-imagen-producto-seleccionado'><img class='imagen-producto-seleccionado' src='"+localStorageProducts[i].pathImageProduct+"' alt='maceta-terracota-bemba'></span><div class='detalle-compra-padre'><div class='detalle-compra-hijo'><label>Precio unitario:</label><label class='precio-producto-seleccionado'>$"+localStorageProducts[i].priceProduct+"</label></div></div><div class='detalle-compra-padre'> <div class='detalle-compra-hijo'><label>Cantidad:</label><input class='cantidad-producto-seleccionado' type='number' value='1'><label class='importe-total-producto-seleccionado'>$"+(localStorageProducts[i].priceProduct*2)+"</label></div></div><div class='detalle-compra-padre'> <div class='detalle-compra-hijo-2'><i class='fas fa-trash-alt descartar-compra'></i></div></div></div><div class='main-separador'></div><div class='main-separador2'></div><div class='main-separador3'></div>" 
        cont=0;
    }
} */