/* JavaScript-kod för lösning till projektuppgiften i kurs DT173G, gjort av Cecilia Edvardsson */

"use strict"

// Variabler ges till knapparna
let openMenubtn = document.getElementById("openMenubtn");
let closeMenubtn = document.getElementById("closeMenubtn");

// Skapar eventlyssnare
openMenubtn.addEventListener('click', menuToggler, false);
closeMenubtn.addEventListener('click', menuToggler, false);

//Toggla fram navigeringsmenyn
function menuToggler() {
    let navMenu = document.getElementById("navigationMenu");

    // Menyns CSS tas in
    let style = window.getComputedStyle(navMenu);

    // Gör menyn ej synlig/synlig
    if (style.display === "none") {
        navMenu.style.display = "block";
    } else {
        navMenu.style.display = "none";
    }
}