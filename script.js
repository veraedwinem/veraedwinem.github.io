var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #000000}";
  document.body.appendChild(css);
};

//MENU ACTIVE FUNCTIONS

const li = document.querySelectorAll(".links");
const sec = document.querySelectorAll("section");

function changeIndex() {
  let len = sec.length;
  while (--len && window.scrollY + 99 < sec[len].offsetTop) {}
  li.forEach((ltx) => {
    ltx.classList.remove("active");
  });
  li[len].classList.add("active");
}

changeIndex();
window.addEventListener("scroll", changeIndex);

//Mobile Menu Ham Animation

(function () {
  $(".navicon-container").on("click", function () {
    $(".navicon-container").toggleClass("animate");
    $(".off-screen-menu").toggleClass("animate");
    $(".background-container").toggleClass("animate");
  });
})();

//Animacion del menu

const menuButton = document.querySelector(".navicon-container");
const menuContainer = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll("#mobile-links");

menuButton.addEventListener("click", function () {
  menuContainer.classList.toggle("mobile-menu-on");
  addClassList(mobileLinks,"bounce-in-top");
});

//Funcion para cerrar al menu al hacer click en los links y devolver la animacion de la ham

function toggleMenuA(){

  menuContainer.classList.toggle("mobile-menu-on");
  menuButton.classList.toggle("animate");
}

//Funcion para agregar event listener a una lista

function addEventListenerList(list, event, fn) {
  for (var i = 0, len = list.length; i < len; i++) {
      list[i].addEventListener(event, fn, false);
  }
}

function addClassList(list, clas) {
  for (var i = 0, len = list.length; i < len; i++) {
      list[i].classList.toggle(clas);
  }
}

addEventListenerList(mobileLinks, "click", toggleMenuA);


function sendMail () {
  var params = {
    contact_name : document.getElementById('contact_name').value,
    contact_email: document.getElementById('contact_email').value,
    contact_msg : document.getElementById('contact_msg').value,
    contact_phone : document.getElementById('contact_phone').value,
  }

  emailjs.send("service_r07a6p3","template_yh19gmc", params).then(function(res){
    alert("Gracias por contactarme, pronto tendrás noticias mías. Saludos!" + res.status)
  })
}



