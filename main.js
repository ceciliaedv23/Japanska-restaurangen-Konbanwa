"use strict";

var url2 = "https://studenter.miun.se/~ceed2200/writeable/wtjanst3/bokningshantering.php";
var guestsinput = document.getElementById("guests"),
  dateinput = document.getElementById("date"),
  timeinput = document.getElementById("time"),
  nameinput = document.getElementById("name"),
  emailinput = document.getElementById("email"),
  phoneinput = document.getElementById("phone"),
  commentinput = document.getElementById("comment"),
  submitBtn = document.getElementById("submitBookingBtn"),
  successfulBookingText = document.getElementById("successful-bookingText"),
  unsuccessfulBookingText = document.getElementById("unsuccessful-bookingText"),
  successfulBookingDiv = document.getElementById("successful-bookingDiv"),
  unsuccessfulBookingDiv = document.getElementById("unsuccessful-bookingDiv");
function addBooking(e) {
  e.preventDefault();
  var t = guestsinput.value,
    n = dateinput.value,
    i = timeinput.value,
    u = nameinput.value,
    o = emailinput.value,
    l = phoneinput.value,
    s = commentinput.value,
    a = JSON.stringify({
      guests: t,
      date: n,
      time: i,
      name: u,
      email: o,
      phone: l,
      comment: s
    });
  fetch(url2, {
    method: "POST",
    header: {
      "content-type": "application/json"
    },
    body: a
  }).then(function (e) {
    201 != e.status ? (unsuccessfulBookingText.textContent = "Bokningsförfrågan blev inte skickad. Vänligen kontrollera angivna uppgifter och observera särskilt att tidpunkt är endast bokningsbar för varje hel och halv timme mellan 17:30 och 22:00.", successfulBookingText.textContent = "") : (e.json(), clearForms(), successfulBookingText.textContent = "Din bokningsförfrågan är inskickad. Vi återkommer till dig via e-post när vi kan bekräfta bokningen.", unsuccessfulBookingText.textContent = "");
  });
}
function clearForms() {
  guestsinput.value = "", dateinput.value = "", timeinput.value = "", nameinput.value = "", emailinput.value = "", phoneinput.value = "", commentinput.value = "";
}
document.querySelector("#date") && (dateinput.min = new Date().toISOString().split("T")[0]), document.querySelector("#submitBookingBtn") && submitBtn.addEventListener("click", addBooking, !1);
var openMenubtn = document.getElementById("openMenubtn"),
  closeMenubtn = document.getElementById("closeMenubtn");
function menuToggler() {
  var e = document.getElementById("navigationMenu");
  "none" === window.getComputedStyle(e).display ? e.style.display = "block" : e.style.display = "none";
}
openMenubtn.addEventListener("click", menuToggler, !1), closeMenubtn.addEventListener("click", menuToggler, !1);
var url = "https://studenter.miun.se/~ceed2200/writeable/wtjanst3/menyhantering.php";
function getMenuItems() {
  fetch(url).then(function (e) {
    if (200 == e.status) return e.json().then(function (e) {
      var t = document.getElementById("menu-appetizers"),
        n = document.getElementById("menu-maincourses"),
        i = document.getElementById("menu-desserts"),
        u = document.getElementById("menu-drinks"),
        o = e.filter(function (e) {
          return "appetizers" == e.category;
        }),
        l = e.filter(function (e) {
          return "maincourses" == e.category;
        }),
        s = e.filter(function (e) {
          return "desserts" == e.category;
        }),
        a = e.filter(function (e) {
          return "drinks" == e.category;
        });
      o.forEach(function (e) {
        var n = document.createElement("li"),
          i = document.createElement("p"),
          u = document.createElement("p");
        i.textContent = e.name, i.innerHTML += "<span>" + e.price + ":- </span>", u.textContent = e.description, i.classList.add("menu-name"), n.appendChild(i), n.appendChild(u), t.appendChild(n);
      }), l.forEach(function (e) {
        var t = document.createElement("li"),
          i = document.createElement("p"),
          u = document.createElement("p");
        i.textContent = e.name, i.innerHTML += "<span>" + e.price + ":- </span>", u.textContent = e.description, i.classList.add("menu-name"), t.appendChild(i), t.appendChild(u), n.appendChild(t);
      }), s.forEach(function (e) {
        var t = document.createElement("li"),
          n = document.createElement("p"),
          u = document.createElement("p");
        n.textContent = e.name, n.innerHTML += "<span>" + e.price + ":- </span>", u.textContent = e.description, n.classList.add("menu-name"), t.appendChild(n), t.appendChild(u), i.appendChild(t);
      }), a.forEach(function (e) {
        var t = document.createElement("li"),
          n = document.createElement("p"),
          i = document.createElement("p");
        n.textContent = e.name, n.innerHTML += "<span>" + e.price + ":- </span>", i.textContent = e.description, n.classList.add("menu-name"), t.appendChild(n), t.appendChild(i), u.appendChild(t);
      });
    });
  });
}
document.querySelector("#menu-appetizers") && getMenuItems();