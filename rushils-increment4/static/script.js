function greeting() {
  const greetingElement = document.getElementById("greeting");

  if (!greetingElement) {
    return;
  }

  const hour = new Date().getHours();

  if (hour < 5 || hour >= 20) {
    greetingElement.textContent = "Good night, welcome to MonoMuse";
  } else if (hour < 12) {
    greetingElement.textContent = "Good morning, welcome to MonoMuse";
  } else if (hour < 18) {
    greetingElement.textContent = "Good afternoon, welcome to MonoMuse";
  } else {
    greetingElement.textContent = "Good evening, welcome to MonoMuse";
  }
}

function addYear() {
  const yearElement = document.getElementById("copyYear");

  if (yearElement) {
    yearElement.innerHTML = "&copy; " + new Date().getFullYear() + " MonoMuse. All rights reserved.";
  }
}

function ActiveNav() {
  const navLinks = document.querySelectorAll("nav a");
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop();

    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });
}

function showPurchaseForm(date) {
  const purchaseFormSection = document.getElementById("purchaseFormSection");
  const selectedDate = document.getElementById("selectedDate");

  if (purchaseFormSection) {
    purchaseFormSection.style.display = "block";
  }

  if (selectedDate) {
    selectedDate.value = date;
  }
}

function handlePurchaseSubmit(event) {
  event.preventDefault();
  alert("Redirecting to payment system.");
}

document.addEventListener("DOMContentLoaded", () => {
  greeting();
  ActiveNav();

  if (window.jQuery) {
    $("#readMore").click(function () {
      $("#longIntro").show();
      $("#readLess").show();
      $("#readMore").hide();
    });

    $("#readLess").click(function () {
      $("#longIntro").hide();
      $("#readLess").hide();
      $("#readMore").show();
    });
  }
});
