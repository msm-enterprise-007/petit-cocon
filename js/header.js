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