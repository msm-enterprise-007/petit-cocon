/* ==========================================
   MENU MOBILE
========================================== */

// Récupération du bouton hamburger
const menuToggle = document.getElementById("menu-toggle");

// Récupération de la navigation
const mainMenu = document.getElementById("main-menu");


// Vérification des éléments avant d'exécuter le code
if (menuToggle && mainMenu) {

    // Écoute du clic sur le bouton hamburger
    menuToggle.addEventListener("click", () => {

        // Ouverture / fermeture de la navigation
        const isOpen = mainMenu.classList.toggle("is-open");


        // Mise à jour de l'état ARIA
        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        // Mise à jour du texte accessible
        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Fermer le menu"
                : "Ouvrir le menu"
        );


        // Récupération de l'icône Font Awesome
        const icon = menuToggle.querySelector("i");


        // Changement de l'icône
        if (icon) {

            icon.classList.toggle(
                "fa-bars",
                !isOpen
            );

            icon.classList.toggle(
                "fa-xmark",
                isOpen
            );

        }

    });


    // Fermeture du menu lorsqu'un lien est sélectionné
    mainMenu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            // Fermer le menu
            mainMenu.classList.remove("is-open");


            // Réinitialiser l'état ARIA
            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            // Réinitialiser le label
            menuToggle.setAttribute(
                "aria-label",
                "Ouvrir le menu"
            );


            // Réinitialiser l'icône
            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.add("fa-bars");

                icon.classList.remove("fa-xmark");

            }

        });

    });

}

/* ==========================================
   MODAL INSCRIPTION
========================================== */

// Récupération des éléments du modal
const registerModal = document.getElementById("register-modal");
const registerModalOpen = document.getElementById("register-modal-open");
const registerModalClose = document.getElementById("register-modal-close");


// Vérification des éléments avant exécution
if (
    registerModal &&
    registerModalOpen &&
    registerModalClose
) {

    // Ouverture du modal
    registerModalOpen.addEventListener("click", () => {

        registerModal.classList.add("is-open");
        registerModal.setAttribute("aria-hidden", "false");

        // Empêche le défilement de la page
        document.body.classList.add("modal-open");

        // Place le focus sur le bouton fermer
        registerModalClose.focus();

    });


    // Fonction de fermeture
    const closeRegisterModal = () => {

        registerModal.classList.remove("is-open");
        registerModal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");

        // Rend le focus au bouton d'origine
        registerModalOpen.focus();

    };


    // Fermeture avec le bouton X
    registerModalClose.addEventListener(
        "click",
        closeRegisterModal
    );


    // Fermeture en cliquant sur l'arrière-plan
    registerModal
        .querySelector("[data-modal-close]")
        .addEventListener(
            "click",
            closeRegisterModal
        );


    // Fermeture avec la touche Échap
    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            registerModal.classList.contains("is-open")
        ) {
            closeRegisterModal();
        }

    });

}


/* ==========================================
   AFFICHAGE DU MOT DE PASSE
========================================== */

const passwordToggle = document.querySelector(".password-toggle");
const passwordInput = document.getElementById("connexion-password");

if (passwordToggle && passwordInput) {

    passwordToggle.addEventListener("click", () => {

        const isPassword =
            passwordInput.type === "password";

        passwordInput.type =
            isPassword ? "text" : "password";

        passwordToggle.setAttribute(
            "aria-label",
            isPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
        );

        const icon = passwordToggle.querySelector("i");

        if (icon) {

            icon.classList.toggle(
                "fa-eye",
                !isPassword
            );

            icon.classList.toggle(
                "fa-eye-slash",
                isPassword
            );

        }

    });

}