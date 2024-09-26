const EmailInput = document.getElementById("EmailInput");
const PasswordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Valider les champs
    if (!EmailInput.value || !PasswordInput.value) {
        if (!EmailInput.value) {
            EmailInput.classList.add("is-invalid");
        }
        if (!PasswordInput.value) {
            PasswordInput.classList.add("is-invalid");
        }
        return;
    }

    let dataForm = new FormData(signinForm);
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "username": dataForm.get("Email"), // Utilise "username" ici
        "password": dataForm.get("Password") // Laisse comme ça
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/login", requestOptions)
        .then(response => {
            if (!response.ok) {
                EmailInput.classList.add("is-invalid");
                PasswordInput.classList.add("is-invalid");
                throw new Error('Erreur lors de la connexion');
            }
            return response.json();
        })
        .then(result => {
            const token = result.apiToken; // Assure-toi que c'est le bon champ
            setToken(token);

            // Placer le token en cookie
            setCookie(RoleCookieName, result.roles[0], 7); // Assure-toi que result.roles[0] existe
            window.location.replace("/");
        })
        .catch(error => console.log('error', error));
}
