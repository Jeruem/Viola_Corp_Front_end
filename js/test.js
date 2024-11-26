document.addEventListener('DOMContentLoaded', () => {
    showAndHideElementsForRoles();
});

// Ton code existant
const tokenCookieName = "accesstoken";
const RoleCookieName = "role";
const signoutBtn = document.getElementById("signoutBtn");

signoutBtn.addEventListener("click", signout);

function getRole(){
    return getCookie(RoleCookieName);
    
}

function signout() {
    eraseCookie(tokenCookieName);
    eraseCookie(RoleCookieName);
    window.location.reload();
}

function setToken(token){
    setCookie(tokenCookieName, token, 7);
}

function getToken(){
    return getCookie(tokenCookieName);
}

function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(const element of ca) {
        let c = element;
        while (c.startsWith(' ')) c = c.substring(1,c.length);
        if (c.startsWith(nameEQ)) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function isConnected(){
    return getToken() !== null; // Simplification de la vérification
}

function showAndHideElementsForRoles() {
    const userConnected = isConnected();
    const role = getRole();

    console.log("User Connected:", userConnected);
    console.log("User Role:", role);

    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element => {
        console.log("Element data-show:", element.dataset.show); // Log de l'élément
        const shouldShow = determineVisibility(userConnected, role, element.dataset.show);
        console.log("Should show element:", shouldShow); // Log du résultat de la visibilité
        element.classList.toggle("d-none", !shouldShow);
    });
}

function determineVisibility(userConnected, role, showValue) {
    switch (showValue) {
        case 'disconnected':
            return !userConnected;
        case 'connected':
            return userConnected;
        case 'admin':
            return userConnected && role === "ROLE_ADMIN";
        case 'client':
            return userConnected && role === "client";
        default:
            return false; // Si aucune correspondance, masquer par défaut
    }
}

function sanitizeHtml(text){
    const tempHtml = document.createElement('div');
    tempHtml.textContent = text;
    return tempHtml.innerHTML;
}

