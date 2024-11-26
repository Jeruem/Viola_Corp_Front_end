
 

// Charger le footer
fetch('/pages/outils/footer.html')
 .then(response => response.text())
 .then(data => {
     document.getElementById('footer').innerHTML = data;
 });


document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1:8000/api/basses')
        .then(response => response.json())
        .then(data => {
            
            const baseUrl = "http://127.0.0.1:8000/uploads/images/";  // Assure-toi que c'est le bon chemin
            data.forEach(bass => {
                const imageUrl = bass.image ? `${baseUrl}${bass.image}` : 'chemin/vers/image/default.jpg'; // Si `guitar.image` est undefined
                const card = `
                <div class="col-md-4 mb-4">
                    <div class="card image-card" data-bass-id="${bass.id}">
                        <img src="${imageUrl}" class="card-img-top" alt="${bass.title}" style="height: 200px; object-fit: cover;">
                        <div class="action-image-buttons">
                            <button data-show="admin" type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#EditionPhotoModal">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button data-show="admin" type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#DeletePhotoModal">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${bass.title}</h5>
                            <p class="card-text">${bass.description}</p>
                            <p class="card-text">${bass.price} €</p>
                            <a href="#" class="btn btn-primary">Acheter</a>
                        </div>
                    </div>
                </div>
                `;
                document.getElementById("galerie").innerHTML += card;
            });
            console.log(data);
            addModalEventListeners();

            showAndHideElementsForRoles();
        })
        .catch(error => console.error('Erreur:', error));
});


// Fonction pour ajouter les écouteurs d'événements aux boutons de modales
function addModalEventListeners() {
    // Fonction pour ouvrir la modale d'édition avec les données correspondantes
    document.querySelectorAll('.btn-outline-light[data-bs-target="#EditionPhotoModal"]').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card'); // Récupérer la carte parente
            const title = card.querySelector('.card-title').innerText;
            const description = card.querySelector('.card-text:nth-of-type(1)').innerText; // Premier paragraphe (description)
            const imageUrl = card.querySelector('img').src;
    
            // Mettre à jour la modale avec les informations de la carte
            document.getElementById('NamePhotoInput').value = title;
            document.getElementById('CardTextInput').value = description;
            document.querySelector('#EditionPhotoModal img').src = imageUrl;
    
            // Ajouter un ID de guitare pour le backend
            document.getElementById('bassId').value = card.getAttribute('data-bass-id');
    
            // Gestion de la sauvegarde des modifications
            document.getElementById('saveChangesBtn').onclick = function() {
                const guitarId = document.getElementById('bassId').value;
                const title = document.getElementById('NamePhotoInput').value;
                const description = document.getElementById('CardTextInput').value;
    
                // Vérification des données
                if (!title || !description) {
                    alert('Veuillez remplir tous les champs.');
                    return;
                }
    
                // Envoie la requête PUT au backend
                fetch(`http://127.0.0.1:8000/api/basses/${guitarId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    },
                    body: JSON.stringify({
                        title: title,
                        description: description
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de la mise à jour de la guitare');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Guitare mise à jour:', data);
                    location.reload(); // Rafraîchir la page ou mettre à jour l'affichage
                })
                .catch(error => console.error('Erreur:', error));
            };
        });
    });

    // Fonction pour ouvrir la modale de suppression
    document.querySelectorAll('.btn-outline-light[data-bs-target="#DeletePhotoModal"]').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const imageUrl = card.querySelector('img').src;

            // Mettre à jour la modale de suppression avec l'image correspondante
            document.querySelector('#DeletePhotoModal img').src = imageUrl;

            // Ajouter un ID de guitare pour la suppression
            document.getElementById('bassIdToDelete').value = card.getAttribute('data-bass-id');
        });
    });

    // Fonction pour ouvrir la modale d'achat avec les données de la guitare
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            // Recherche de la carte avec les deux classes ou l'une d'elles
            const card = this.closest('.image-card, .card');

            // Log pour vérifier si la carte est bien trouvée
            console.log("Carte trouvée : ", card);

            // Si la carte est trouvée, on continue
            if (card) {
                const title = card.querySelector('.card-title').innerText;
                const description = card.querySelector('.card-text:nth-of-type(1)').innerText; // Premier paragraphe (description)
                const price = card.querySelector('.card-text:nth-of-type(2)').innerText.replace('€', '').trim(); // Deuxième paragraphe (prix)
                const imageUrl = card.querySelector('img').src;

                // Log pour vérifier les éléments trouvés
                console.log("Title : ", title, "Description : ", description, "Price : ", price, "Image : ", imageUrl);

                // Mettre à jour la modale d'achat
                document.getElementById('AchatModalImage').src = imageUrl;
                document.getElementById('AchatModalTitle').innerText = title;
                document.getElementById('AchatModalDescription').innerText = description;
                document.getElementById('AchatModalPrice').innerText = `${price} €`;

                const achatModal = new bootstrap.Modal(document.getElementById('AchatModal'));
                achatModal.show();

                // Écouteur d'événements pour ajouter au panier
                document.getElementById('AddToCartBtn').onclick = function() {
                    addToCart(title, price, imageUrl);
                };
            } else {
                console.error('Erreur : impossible de trouver l\'élément parent ".image-card.card".');
            }
        });
    });
}

// Fonction pour ajouter l'article au panier
function addToCart(title, price, imageUrl) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const item = {
        title: title,
        price: parseFloat(price), // Assurez-vous que le prix est un nombre
        imageUrl: imageUrl // Ajout de l'URL de l'image
    };

    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Vérification en console
    console.log("Article ajouté au panier :", item);
    console.log("Panier actuel :", cartItems);

    // Rediriger vers la page panier
    window.location.href = '/pages/monpanier.html'; // Remplacer par la bonne URL du panier
}

