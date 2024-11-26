 // Charger le header
 fetch('/pages/outils/header.html')
 .then(response => response.text())
 .then(data => {
     document.getElementById('header').innerHTML = data;
 });

// Charger le footer
fetch('/pages/outils/footer.html')
 .then(response => response.text())
 .then(data => {
     document.getElementById('footer').innerHTML = data;
 });

// Fonction pour récupérer les articles du panier et les afficher dans la page
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cartContainer');

    // Vérifier si le panier est vide
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Votre panier est vide.</p>';
        return;
    }

    // Réinitialiser l'affichage du panier
    cartContainer.innerHTML = '';

    let total = 0;

    // Parcourir les articles du panier et générer le HTML
    cartItems.forEach(item => {
        const cartItemHTML = `
            <div class="row mb-3">
                <div class="col-md-6">${item.title}</div>
                <div class="col-md-2">Quantité : 1</div>
                <div class="col-md-2">Prix : ${item.price}€</div>
                <div class="col-md-2">Total : ${item.price}€</div>
            </div>
        `;
        cartContainer.innerHTML += cartItemHTML;

        // Calculer le total
        total += item.price;
    });

    // Ajouter le total à la fin
    const totalHTML = `
        <div class="row">
            <div class="col-md-10 text-end"><strong>Total Panier :</strong></div>
            <div class="col-md-2"><strong>${total} €</strong></div>
        </div>
    `;
    cartContainer.innerHTML += totalHTML;
}

// Appeler la fonction pour afficher les articles du panier lorsque la page se charge
document.addEventListener('DOMContentLoaded', displayCartItems);

// Appeler la fonction pour afficher les éléments du panier lorsque la page se charge
document.addEventListener('DOMContentLoaded', displayCartItems);

// Fonction pour vider le panier
function emptyCart() {
    localStorage.removeItem('cartItems'); // Supprime l'élément du localStorage

    // Mettre à jour l'affichage du panier
    document.getElementById('cartContainer').innerHTML = "<p>Votre panier est vide.</p>";

    // Log pour vérifier
    console.log("Le panier a été vidé.");
}

// Écouteur d'événements pour le bouton "Vider le panier"
document.getElementById('emptyCartBtn').addEventListener('click', emptyCart);

