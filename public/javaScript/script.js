let front_validations_box = document.querySelector("#front_validations_box");
front_validations_box.style.display= "none";

let users_register_form= document.querySelector("#users_register_form");

users_register_form.addEventListener("submit", function(e){
    e.preventDefault();
    validations();
})

function validations(){

    let nameUser_error_message= document.querySelector("#nameUser_error_message");
    nameUser_error_message.innerHTML="";
    
    let name_user_input= document.querySelector("#name_user_input");
    let surname_user_input= document.querySelector("#surname_user_input");
    let email_user_input= document.querySelector("#email_user_input");
    let password_user_input= document.querySelector("#password_user_input");
    let rePassword_user_input= document.querySelector("#rePassword_user_input");

    let userForm_errors_array= [];
    if (name_user_input.value==""){
        userForm_errors_array.push ("Ingresá tu nombre");      
    }
    if (surname_user_input.value==""){
        userForm_errors_array.push ("Ingresá tu apellido");      
    }
    if (!email_user_input.value.includes("@")){
        userForm_errors_array.push ("Ingresá tu mail");      
    }
    if (password_user_input.value.length<8){
        userForm_errors_array.push ("La contraseña debe tener al menos 8 caracteres");      
    }
    else if (rePassword_user_input.value != password_user_input.value) {
        userForm_errors_array.push ("Las contraseñas no coinciden, intenta nuevamente"); 
    }

    if(userForm_errors_array.length>0){   
        front_validations_box.style.display= "flex"; 

        nameUser_error_message.style.margin="auto";
        for(let i=0; i<userForm_errors_array.length; i++){
            nameUser_error_message.innerHTML+="<p class='mensajeError' style='color:blue;'>"+userForm_errors_array[i]+"</p>";
        } 
        password_user_input.value="";
        rePassword_user_input.value="";
    }    
    else {
        users_register_form.submit();
    }
}



            
        