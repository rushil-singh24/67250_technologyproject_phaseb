const TICKET_PRICES = {
  adult: 18,
  student: 10,
  member: 15
};
let currentSlideIndex = 0;

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

function toggleNav() {
  const navBar = document.querySelector(".nav_bar");
  const toggleButton = document.querySelector(".nav_toggle");

  if (!navBar || !toggleButton) {
    return;
  }

  navBar.classList.toggle("responsive");
  const isExpanded = navBar.classList.contains("responsive");
  toggleButton.setAttribute("aria-expanded", String(isExpanded));
}

function initializeReadMore() {
  // jQuery powers the homepage read more/read less toggle.
  if (!window.jQuery) {
    return;
  }

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

function initializeMap() {
  const mapElement = document.getElementById("map");

  if (!mapElement || typeof L === "undefined") {
    return;
  }

  // Leaflet is used here with OpenStreetMap tiles for the interactive directions map.
  const map = L.map("map").setView([40.4444, -79.9436], 14);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  L.marker([40.4444, -79.9436]).addTo(map)
    .bindPopup("MonoMuse near Carnegie Mellon University")
    .openPopup();
}

function updateGallery(index) {
  const slides = document.querySelectorAll(".gallery_slide");

  if (!slides.length) {
    return;
  }

  currentSlideIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active_slide", slideIndex === currentSlideIndex);
  });
}

function initializeGallery() {
  const slides = document.querySelectorAll(".gallery_slide");
  const nextButton = document.getElementById("nextSlide");
  const prevButton = document.getElementById("prevSlide");
  const galleryShell = document.getElementById("galleryShell");

  if (!slides.length || !nextButton || !prevButton || !galleryShell) {
    return;
  }

  updateGallery(0);

  nextButton.addEventListener("click", () => {
    updateGallery(currentSlideIndex + 1);
  });

  prevButton.addEventListener("click", () => {
    updateGallery(currentSlideIndex - 1);
  });

  galleryShell.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      updateGallery(currentSlideIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      updateGallery(currentSlideIndex - 1);
    }
  });
}

function setFieldError(fieldId, message) {
  const errorElement = document.getElementById(fieldId + "Error");

  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearCheckoutErrors() {
  const errorMessages = document.querySelectorAll(".error_message");

  errorMessages.forEach((message) => {
    message.textContent = "";
  });
}

function updateOrderTotal() {
  const totalElement = document.getElementById("orderTotal");
  const adultQuantityInput = document.getElementById("adultQuantity");
  const studentQuantityInput = document.getElementById("studentQuantity");
  const memberQuantityInput = document.getElementById("memberQuantity");

  if (!totalElement || !adultQuantityInput || !studentQuantityInput || !memberQuantityInput) {
    return;
  }

  const adultQuantity = Number(adultQuantityInput.value) || 0;
  const studentQuantity = Number(studentQuantityInput.value) || 0;
  const memberQuantity = Number(memberQuantityInput.value) || 0;
  const total = (adultQuantity * TICKET_PRICES.adult) + (studentQuantity * TICKET_PRICES.student) + (memberQuantity * TICKET_PRICES.member);

  totalElement.textContent = "$" + total;
}

function initializeCheckoutForm() {
  const checkoutForm = document.getElementById("checkoutForm");

  if (!checkoutForm) {
    return;
  }

  const visitDateInput = document.getElementById("visitDate");
  const adultQuantityInput = document.getElementById("adultQuantity");
  const studentQuantityInput = document.getElementById("studentQuantity");
  const memberQuantityInput = document.getElementById("memberQuantity");
  const emailInput = document.getElementById("email");
  const zipCodeInput = document.getElementById("zipCode");
  const mailingListInput = document.getElementById("mailingList");
  const params = new URLSearchParams(window.location.search);

  if (visitDateInput && params.get("date")) {
    visitDateInput.value = params.get("date");
  }

  updateOrderTotal();

  [adultQuantityInput, studentQuantityInput, memberQuantityInput].forEach((input) => {
    if (input) {
      input.addEventListener("input", updateOrderTotal);
    }
  });

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearCheckoutErrors();

    const visitDate = visitDateInput.value.trim();
    const adultQuantity = Number(adultQuantityInput.value);
    const studentQuantity = Number(studentQuantityInput.value);
    const memberQuantity = Number(memberQuantityInput.value);
    const totalTickets = adultQuantity + studentQuantity + memberQuantity;
    const email = emailInput.value.trim();
    const zipCode = zipCodeInput.value.trim();
    let isValid = true;

    if (!visitDate) {
      setFieldError("visitDate", "Please choose a visit date.");
      isValid = false;
    }

    const hasInvalidQuantity = [adultQuantity, studentQuantity, memberQuantity].some((quantity) => {
      return !Number.isInteger(quantity) || quantity < 0 || quantity > 10;
    });

    if (hasInvalidQuantity || totalTickets < 1 || totalTickets > 10) {
      setFieldError("ticketMix", "Choose between 1 and 10 total tickets across adult, student, and member types.");
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError("email", "Please enter a valid email address.");
      isValid = false;
    }

    if (zipCode && !/^\d{5}$/.test(zipCode)) {
      setFieldError("zipCode", "Zip code must be exactly 5 digits.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const confirmationData = {
      visitDate: visitDate,
      adultQuantity: adultQuantity,
      studentQuantity: studentQuantity,
      memberQuantity: memberQuantity,
      totalTickets: totalTickets,
      email: email,
      zipCode: zipCode,
      mailingList: mailingListInput.checked,
      total: (adultQuantity * TICKET_PRICES.adult) + (studentQuantity * TICKET_PRICES.student) + (memberQuantity * TICKET_PRICES.member)
    };

    sessionStorage.setItem("monomuseOrder", JSON.stringify(confirmationData));
    window.location.href = "confirmation.html";
  });
}

function initializeConfirmationPage() {
  const confirmationSummary = document.getElementById("confirmationSummary");

  if (!confirmationSummary) {
    return;
  }

  const savedOrder = sessionStorage.getItem("monomuseOrder");

  if (!savedOrder) {
    confirmationSummary.textContent = "No order details were found. Return to checkout to place a new simulated order.";
    return;
  }

  const order = JSON.parse(savedOrder);
  const mailingText = order.mailingList ? "You joined the mailing list." : "You did not join the mailing list.";
  const ticketSummary = "Adult: " + order.adultQuantity + ", Student: " + order.studentQuantity + ", Member: " + order.memberQuantity;
  confirmationSummary.textContent = "Your order for " + order.totalTickets + " ticket(s) on " + order.visitDate + " is confirmed. Ticket breakdown: " + ticketSummary + ". Total cost: $" + order.total + ". A confirmation message will be sent to " + order.email + ". " + mailingText;
}

document.addEventListener("DOMContentLoaded", () => {
  greeting();
  ActiveNav();
  initializeReadMore();
  initializeMap();
  initializeGallery();
  initializeCheckoutForm();
  initializeConfirmationPage();
});
