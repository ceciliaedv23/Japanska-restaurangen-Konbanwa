/* JavaScript-kod för lösning till projektuppgiften i kurs DT173G, gjort av Cecilia Edvardsson */

"use strict";

// Länk till kopplingen med databastabellen
let url = "https://studenter.miun.se/~ceed2200/writeable/wtjanst3/menyhantering.php";

if (document.querySelector('#menu-appetizers')) {
    getMenuItems();
  }  

// Funktion som läser in rader med respektive värde från databastabellen
function getMenuItems() {
    fetch(url)
        .then(response => {
            // Om ej godkänt anrop
            if (response.status != 200) {
                return;
            }
            // Om godkänt anrop
            return response.json()
                .then(data => {

                    // Kopplingar görs till respektive meny-del
                    let appetizersList = document.getElementById("menu-appetizers");
                    let maincoursesList = document.getElementById("menu-maincourses");
                    let dessertsList = document.getElementById("menu-desserts");
                    let drinksList = document.getElementById("menu-drinks");

                    // Hela inhämtade arrayen delas upp i nya arrayer utifrån menydelstyp
                    let appetizersData = data.filter(item => item.category == "appetizers");
                    let maincoursesData = data.filter(item => item.category == "maincourses");
                    let dessertsData = data.filter(item => item.category == "desserts");
                    let drinksData = data.filter(item => item.category == "drinks");

                    // Förrätter skrivs ut, en i taget
                    appetizersData.forEach(item => {
                        let listItem = document.createElement("li");
                        let listItemParagraph1 = document.createElement("p");
                        let listItemParagraph2 = document.createElement("p");

                        listItemParagraph1.textContent = item.name;
                        listItemParagraph1.innerHTML += "<span>" + item.price + ":- </span>";
                        listItemParagraph2.textContent = item.description;

                        listItemParagraph1.classList.add('menu-name');

                        listItem.appendChild(listItemParagraph1);
                        listItem.appendChild(listItemParagraph2);
                        appetizersList.appendChild(listItem);
                    });

                    // Huvudrätter skrivs ut, en i taget
                    maincoursesData.forEach(item => {
                        let listItem = document.createElement("li");
                        let listItemParagraph1 = document.createElement("p");
                        let listItemParagraph2 = document.createElement("p");

                        listItemParagraph1.textContent = item.name;
                        listItemParagraph1.innerHTML += "<span>" + item.price + ":- </span>";
                        listItemParagraph2.textContent = item.description;

                        listItemParagraph1.classList.add('menu-name');

                        listItem.appendChild(listItemParagraph1);
                        listItem.appendChild(listItemParagraph2);
                        maincoursesList.appendChild(listItem);
                    });

                    // Efterrätter skrivs ut, en i taget
                    dessertsData.forEach(item => {
                        let listItem = document.createElement("li");
                        let listItemParagraph1 = document.createElement("p");
                        let listItemParagraph2 = document.createElement("p");

                        listItemParagraph1.textContent = item.name;
                        listItemParagraph1.innerHTML += "<span>" + item.price + ":- </span>";
                        listItemParagraph2.textContent = item.description;

                        listItemParagraph1.classList.add('menu-name');

                        listItem.appendChild(listItemParagraph1);
                        listItem.appendChild(listItemParagraph2);
                        dessertsList.appendChild(listItem);
                    });

                    // Drycker skrivs ut, en i taget
                    drinksData.forEach(item => {
                        let listItem = document.createElement("li");
                        let listItemParagraph1 = document.createElement("p");
                        let listItemParagraph2 = document.createElement("p");

                        listItemParagraph1.textContent = item.name;
                        listItemParagraph1.innerHTML += "<span>" + item.price + ":- </span>";
                        listItemParagraph2.textContent = item.description;

                        listItemParagraph1.classList.add('menu-name');

                        listItem.appendChild(listItemParagraph1);
                        listItem.appendChild(listItemParagraph2);
                        drinksList.appendChild(listItem);
                    });
                });
        })
}