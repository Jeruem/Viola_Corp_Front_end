import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", []  ),
    new Route("/reparation", "Réparation", "/pages/reparation.html",  [] ),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"], "/js/signin.js" ),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["disconnected"], "/js/signup.js" ),
    new Route("/account", "Mon compte", "/pages/auth/account.html", []),
    new Route("/editpassword", "Modifier le mot de passe", "/pages/auth/editpassword.html", [] ),
    new Route("/brouillon", "Votre panier", "/pages/brouillon.html", [], "/js/brouillon.js"),
    new Route("/monpaniercopy", "Mon panier", "/pages/monpaniercopy.html", []),
    new Route("/nosguitares", "Nos Guitares", "/pages/nosguitares.html", "/js/nosguitares.js",  []),


    




]

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Viola Corp";