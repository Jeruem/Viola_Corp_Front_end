import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/nosguitares", "Nos guitares", "/pages/nosguitares.html"),
    new Route("/nosbasses", "Nos basses", "/pages/nosbasses.html"),
    new Route("/reparation", "Réparation", "/pages/reparation.html"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html"),
    new Route("/account", "Mon compte", "/pages/auth/account.html"),
    new Route("/editpassword", "Modifier le mot de passe", "/pages/auth/editpassword.html"),



]

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Viola Corp";