// Implémenter le JS de ma page

const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");


// Ajouter les écouteurs d'événements
inputNom.addEventListener("keyup", validateForm); 
inputPreNom.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);
btnValidation.addEventListener("click", inscrireUtilisateur);



// Fonction pour valider tout le formulaire
function validateForm() {
    const nomOk = validateRequired(inputNom);
    const prenomOk = validateRequired(inputPreNom);
    const mailOk = validateMail(inputMail);
    const passwordOk = validatePassword(inputPassword);
    const passwordMatchOk = validateConfirmationPassword(inputPassword, inputValidationPassword); 

    // Vérifie si tous les champs sont valides
    if (nomOk && prenomOk && mailOk && passwordOk && passwordMatchOk) {
        btnValidation.disabled = false; // Active le bouton
    } else {
        btnValidation.disabled = true; // Désactive le bouton
    }
}

function validatePassword(input) {
    // Définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true; // Indique que le mot de passe est valide
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false; // Indique que le mot de passe est invalide
    }
}

function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
    if (inputPwd.value === inputConfirmPwd.value && inputPwd.value !== '') {
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    } else {
        inputConfirmPwd.classList.remove("is-valid");
        inputConfirmPwd.classList.add("is-invalid");
        return false;
    }
}

function validateMail(input) {
    // Définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true; // Indique que l'email est valide
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false; // Indique que l'email est invalide
    }
}

function validateRequired(input) {
    if (input.value !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true; // Indique que le champ est valide
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false; // Indique que le champ est invalide
    }
}

function inscrireUtilisateur() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "firstName": inputPreNom.value,
        "lastName": inputNom.value,
        "email": inputMail.value,
        "password": inputPassword.value
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/api/registration", requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then((result) => {
            console.log(result); // Traiter le résultat ici
            alert("Inscription réussie !"); // Afficher un message de succès
            // Rediriger ou réinitialiser le formulaire ici si nécessaire
        })
        .catch((error) => {
            console.error('Il y a eu un problème avec la requête fetch:', error);
            alert("Une erreur est survenue lors de l'inscription. Veuillez réessayer."); // Afficher un message d'erreur
        });
}

