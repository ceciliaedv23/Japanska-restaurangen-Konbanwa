/* JavaScript-kod för lösning till projektuppgiften i kurs DT173G, gjort av Cecilia Edvardsson */

"use strict";

// Länk till kopplingen med databastabellen
let url2 = "https://studenter.miun.se/~ceed2200/writeable/wtjanst3/bokningshantering.php";

// Variabler för inputfält och eventlyssnare
const guestsinput = document.getElementById("guests");
const dateinput = document.getElementById("date");
const timeinput = document.getElementById("time");
const nameinput = document.getElementById("name");
const emailinput = document.getElementById("email");
const phoneinput = document.getElementById("phone");
const commentinput = document.getElementById("comment");
const submitBtn = document.getElementById("submitBookingBtn");
const successfulBookingText = document.getElementById("successful-bookingText");
const unsuccessfulBookingText = document.getElementById("unsuccessful-bookingText");
const successfulBookingDiv = document.getElementById("successful-bookingDiv");
const unsuccessfulBookingDiv = document.getElementById("unsuccessful-bookingDiv");

// Blockera tidigare datum än dagens, för bokning
if (document.querySelector('#date')) {
    dateinput.min = new Date().toISOString().split("T")[0];
}

// Lägger eventlyssnare till submit-knapp
if (document.querySelector('#submitBookingBtn')) {
    submitBtn.addEventListener('click', addBooking, false);
}

// Funktion som lägger till ny bokning i databastabellen enligt input
function addBooking(event) {

    // Stoppar sidan från att laddas om, därmed kunna visa meddelanden till besökaren 
    event.preventDefault();

    // Sparar ifyllda värden i variabler
    let guestsvalue = guestsinput.value;
    let datevalue = dateinput.value;
    let timevalue = timeinput.value;
    let namevalue = nameinput.value;
    let emailvalue = emailinput.value;
    let phonevalue = phoneinput.value;
    let commentvalue = commentinput.value;

    // Skapar JSON-sträng av värden
    let jsonStr = JSON.stringify({
        guests: guestsvalue,
        date: datevalue,
        time: timevalue,
        name: namevalue,
        email: emailvalue,
        phone: phonevalue,
        comment: commentvalue
    });

    // Fetch-anrop som skickar med JSON-strängen
    fetch(url2, {
        method: "POST",
        header: {
            "content-type": "application/json"
        },
        body: jsonStr
    })
        .then(response => {
            if (response.status != 201) {
                // Om ej godkänt anrop via Fetch

                // Felmeddelanden visas 
                unsuccessfulBookingText.textContent = "Bokningsförfrågan blev inte skickad. Vänligen kontrollera angivna uppgifter och observera särskilt att tidpunkt är endast bokningsbar för varje hel och halv timme mellan 17:30 och 22:00.";
                successfulBookingText.textContent = "";
            }

            else {
                // Om godkänt anrop via Fetch
                response.json();
                clearForms();

                // Meddelande visas 
                successfulBookingText.textContent = "Din bokningsförfrågan är inskickad. Vi återkommer till dig via e-post när vi kan bekräfta bokningen.";
                unsuccessfulBookingText.textContent = "";
            }
        })
}

// Funktion som tömmer inputfälten
function clearForms() {
    guestsinput.value = "";
    dateinput.value = "";
    timeinput.value = "";
    nameinput.value = "";
    emailinput.value = "";
    phoneinput.value = "";
    commentinput.value = "";
}
