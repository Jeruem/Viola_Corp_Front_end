const EmailInput = document.getElementById("EmailInput");
const PasswordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials(){
    //Ici, il faudra appeler l'API pour vérifier les credentials en BDD
    
    if(EmailInput.value == "test@mail.com" && PasswordInput.value == "123"){
        //Il faudra récupérer le vrai token
        const token = "lkjsdngfljsqdnglkjsdbglkjqskjgkfjgbqslkfdgbskldfgdfgsdgf";
        setToken(token);
        //placer ce token en cookie

        setCookie(RoleCookieName, "admin", 7);
        window.location.replace("/");
    }
    else{
        EmailInput.classList.add("is-invalid");
        PasswordInput.classList.add("is-invalid");
    }
}