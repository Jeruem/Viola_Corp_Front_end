// Assurez-vous que le DOM est complètement chargé avant d'ajouter des événements
document.addEventListener("DOMContentLoaded", function() {
    const btnTest = document.getElementById("btn-test");

    // Vérifie si le bouton existe avant d'ajouter l'événement
    if (btnTest) {
        btnTest.addEventListener("click", function() {
            sendStaticData();
        });
    } else {
        console.error("Le bouton 'btn-test' n'a pas été trouvé dans le DOM.");
    }

    // Fonction pour envoyer des données statiques
    function sendStaticData() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "firstName": "Locus",
            "lastName": "Sacto",
            "email": "lactus@email.com",
            "password": "Mot de passe"
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
                    throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json();
            })
            .then((result) => {
                console.log("Success:", result);
                // Afficher un message à l'utilisateur ici si nécessaire
            })
            .catch((error) => console.error("Error:", error));
    }
});
