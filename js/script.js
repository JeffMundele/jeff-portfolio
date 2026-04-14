// ================= MENU MOBILE =================
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-menu");
const header = document.querySelector("header");

toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    nav.classList.toggle("active");
});

// Fermer le menu après clic
document.querySelectorAll("#nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        toggle.classList.remove("active");
    });
});


// ================= HEADER SCROLL =================
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// ================= AOS ANIMATION =================
AOS.init({
    duration: 1000,
    once: true
});

// ================= THEME (DARK / LIGHT) =================

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const icon = themeToggle.querySelector("i");

// Charger le thème sauvegardé
if (localStorage.getItem("theme") === "light") {
    body.classList.add("light");
    icon.classList.replace("fa-moon", "fa-sun");
}

// Click bouton
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

// ================= EMAILJS =================

// Initialisation
(function () {
    emailjs.init("phqw0IEizahCDEGyU");
})();

// Gestion du formulaire
const form = document.querySelector("form");
const btn = document.getElementById("submit-btn");
const btnText = btn.querySelector(".btn-text");
const loader = btn.querySelector(".loader");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector("[name='name']").value;
    const email = document.querySelector("[name='email']").value;
    const message = document.querySelector("[name='message']").value;

    // ❌ VALIDATION
    if (!name || !email || !message) {
        showToast("Veuillez remplir tous les champs ⚠️", "error");
        return;
    }

    // ❌ VERIFICATION E-MAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    showToast("Email invalide ❌", "error");
    return;
}

    // 🔄 ACTIVER LOADER
    btnText.textContent = "Envoi en cours...";
    loader.classList.remove("hidden");
    btn.disabled = true;

    // 1. Email pour moi
    emailjs.send("service_c74aen5", "template_y8hm5qm", {
        from_name: name,
        from_email: email,
        message: message
    })

    // 2. Auto reply
    .then(() => {
        return emailjs.send("service_c74aen5", "template_xbm0fto", {
            from_name: name,
            from_email: email,
            message: message
        });
    })

    // ✅ Succès
    .then(() => {
        btnText.textContent = "Message envoyé ✅";
        showToast("Message envoyé avec succès ✅", "success");
        loader.classList.add("hidden");
        form.reset();

        setTimeout(() => {
            btnText.textContent = "Envoyer";
            btn.disabled = false;
        }, 2000);
    })

    // ❌ Erreur
    .catch(() => {
        btnText.textContent = "Erreur ❌";
        showToast("Une erreur s'est produite ❌", "error");
        loader.classList.add("hidden");

        setTimeout(() => {
            btnText.textContent = "Envoyer";
            btn.disabled = false;
        }, 2000);
    });

    function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");

    toastMessage.textContent = message;

    // reset classes
    toast.className = "toast show " + type;

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
});