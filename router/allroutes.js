import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", []  ),
    new Route("/nosguitares", "Nos guitares", "/pages/nosguitares.html", [] ),
    new Route("/nosbasses", "Nos basses", "/pages/nosbasses.html", [] ),
    new Route("/reparation", "Réparation", "/pages/reparation.html", [], "/js/reparation.js" ),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"], "/js/signin.js" ),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["disconnected"], "/js/signup.js" ),
    new Route("/account", "Mon compte", "/pages/auth/account.html", ["client", "admin"]),
    new Route("/editpassword", "Modifier le mot de passe", "/pages/auth/editpassword.html", ["client", "admin"] ),
    new Route("/panier", "Votre panier", "/pages/panier.html", []),




]

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Viola Corp";