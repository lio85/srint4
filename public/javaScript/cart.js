//const { strictLeft } = require("sequelize/types/lib/operators");

let idUser=  window.location.pathname.slice(6); // almaceno el id del producto desde la URL
//console.log("El id del usuario es el :"+idUser);



let productSelected= JSON.parse(sessionStorage.getItem("productInformation"));
//console.log(productSelected);
sessionStorage.removeItem("productInformation")
//console.log(sessionStorage);

let arrayProducts=[];


let userFounded= "user"+idUser;
console.log(userFounded);

if (localStorage.getItem(userFounded)==null){
    alert("Es tu primer producto")
    arrayProducts.push(productSelected)
    localStorage.setItem(userFounded,JSON.stringify(arrayProducts));   
    console.log(localStorage.getItem(userFounded)); 
}
else {
    alert("Vas a agregar mas productos")
    console.log(localStorage);

    arrayProducts=JSON.parse(localStorage.getItem(userFounded))
    

    localStorage.removeItem(userFounded)
    console.log(localStorage);

    arrayProducts.push(productSelected)
    //console.log(arrayProducts);

    localStorage.setItem(userFounded,JSON.stringify(arrayProducts));  
    console.log(localStorage.getItem(userFounded));
}

/*
let confirmar= document.querySelector("#confirm-button")
confirmar.addEventListener("click",function(){
    localStorage.setItem("nombre","pipo")
    let a= localStorage.nombre
    console.log(a);
})
*/