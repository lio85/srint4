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
        //console.log(arrayProducts);

        localStorage.setItem(userFounded,JSON.stringify(arrayProducts));  
        //console.log(localStorage.getItem(userFounded));
    }

}
else {
    alert("No agregaste nada")
}

//-----------------------------------------------

let localStorageProducts= JSON.parse(localStorage.getItem(userFounded));

let generalContainer= document.querySelector(".generalContainer");

if(localStorageProducts!=null){
    
    for (let i=0;i<localStorageProducts.length;i++){
        generalContainer.innerHTML+="<ul class='productContainer' style='border: solid black 1px'>"
            +"<li>"+localStorageProducts[i].nameProduct+"</li>"
            +"<li><img src='" +localStorageProducts[i].pathImageProduct+"' alt='"+localStorageProducts[i].nameProduct+"'></li>"
            +"<li>$"+localStorageProducts[i].priceProduct+"</li>" 
            +"</ul>"
    }
}

else {
    generalContainer.innerHTML="<li>Nada que mostrar</li>"
}
let productContainer= document.querySelectorAll("ul.productContainer");
console.log(productContainer);
for (oneProduct of productContainer){
    oneProduct.style.backgroundColor="yellow";
}
/*
for (let i=0; i<productContainer.length;i++){
    productContainer[i].style.backgroundColor="red";
}
*/


{/* <strong>Seleccionaste:</strong> Stand de madera G alto con maceta de terracota */}
























/*
let confirmar= document.querySelector("#confirm-button")
confirmar.addEventListener("click",function(){
    localStorage.setItem("nombre","pipo")
    let a= localStorage.nombre
    console.log(a);
})
*/