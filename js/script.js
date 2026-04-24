// ================= MENU MOBILE =================
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-menu");
const header = document.querySelector("header");

toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    nav.classList.toggle("active");
});

document.querySelectorAll("#nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        toggle.classList.remove("active");
    });
});

// ================= HEADER SCROLL =================
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
});

// ================= AOS =================
AOS.init({
    duration: 1000,
    once: true
});

// ================= THEME =================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const icon = themeToggle.querySelector("i");

if (localStorage.getItem("theme") === "light") {
    body.classList.add("light");
    icon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");

    if (body.classList.contains("light")) {
        icon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "light");
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "dark");
    }
});

// ================= FORMULAIRE =================
const form = document.querySelector("form");
const btn = document.getElementById("submit-btn");
const btnText = btn.querySelector(".btn-text");
const loader = btn.querySelector(".loader");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

// ===== VALIDATION LOGIQUE =====
function isValidName() {
    return nameInput.value.trim().length >= 3;
}

function isValidEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailInput.value);
}

function isValidMessage() {
    return messageInput.value.trim().length >= 5;
}

// ===== UI =====
function showError(input, message) {
    const error = input.nextElementSibling;
    error.textContent = message;
    input.classList.add("error");
    input.classList.remove("success");
}

function showSuccess(input) {
    const error = input.nextElementSibling;
    error.textContent = "";
    input.classList.remove("error");
    input.classList.add("success");
}

// ===== VALIDATION TEMPS RÉEL =====
nameInput.addEventListener("input", () => {
    if (!isValidName()) {
        showError(nameInput, "Minimum 3 caractères");
    } else {
        showSuccess(nameInput);
    }
    checkFormValidity();
});

emailInput.addEventListener("input", () => {
    if (!isValidEmail()) {
        showError(emailInput, "Email invalide");
    } else {
        showSuccess(emailInput);
    }
    checkFormValidity();
});

messageInput.addEventListener("input", () => {
    if (!isValidMessage()) {
        showError(messageInput, "Minimum 5 caractères");
    } else {
        showSuccess(messageInput);
    }
    checkFormValidity();
});

// ===== BOUTON =====
function checkFormValidity() {
    btn.disabled = !(isValidName() && isValidEmail() && isValidMessage());
}

btn.disabled = true;

// ===== EMAILJS =====
(function () {
    emailjs.init("phqw0IEizahCDEGyU");
})();

function showError(input, message) {
    const error = input.nextElementSibling;
    if (!error) return;

    error.textContent = message;
    input.classList.add("error");
    input.classList.remove("success");
}

// ===== SUBMIT =====
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!isValidName() || !isValidEmail() || !isValidMessage()) {
        showToast("Veuillez corriger les erreurs ⚠️", "error");
        return;
    }

    btnText.textContent = "Envoi en cours...";
    loader.classList.remove("hidden");
    btn.disabled = true;

    emailjs.send("service_c74aen5", "template_y8hm5qm", {
        from_name: nameInput.value,
        from_email: emailInput.value,
        message: messageInput.value
    })

    .then(() => {
        return emailjs.send("service_c74aen5", "template_xbm0fto", {
            from_name: nameInput.value,
            from_email: emailInput.value,
            message: messageInput.value
        });
    })

    .then(() => {
        showToast("Message envoyé avec succès ✅", "success");
        form.reset();

        [nameInput, emailInput, messageInput].forEach(input => {
            input.classList.remove("success", "error");
            input.nextElementSibling.textContent = "";
        });
    })

    .catch(() => {
        showToast("Erreur lors de l'envoi ❌", "error");
    })

    .finally(() => {
        btnText.textContent = "Envoyer";
        loader.classList.add("hidden");
        btn.disabled = true;
    });
});

// ===== TOAST =====
function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");

    toastMessage.textContent = message;
    toast.className = "toast show " + type;

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}