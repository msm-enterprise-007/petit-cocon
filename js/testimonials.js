/* ==========================================
   CARROUSEL DES TÉMOIGNAGES
========================================== */

const testimonialCards = document.querySelectorAll(
    ".testimonial-card"
);

const testimonialDots = document.querySelectorAll(
    ".testimonial-dots button"
);

const previousButton = document.querySelector(
    ".testimonial-prev"
);

const nextButton = document.querySelector(
    ".testimonial-next"
);


let currentTestimonial = 0;


/* ==========================================
   AFFICHAGE
========================================== */

function showTestimonial(index) {
    if (!testimonialCards.length) {
        return;
    }

    if (index >= testimonialCards.length) {
        currentTestimonial = 0;
    } else if (index < 0) {
        currentTestimonial = testimonialCards.length - 1;
    } else {
        currentTestimonial = index;
    }

    let visibleCards = 1;

    if (window.innerWidth >= 1051) {
        visibleCards = 3;
    } else if (window.innerWidth >= 801) {
        visibleCards = 2;
    }

    testimonialCards.forEach((card, cardIndex) => {
        const isVisible =
            cardIndex >= currentTestimonial &&
            cardIndex < currentTestimonial + visibleCards;

        card.style.display = isVisible ? "block" : "none";
    });

    testimonialDots.forEach((dot, dotIndex) => {
        dot.classList.toggle(
            "active",
            dotIndex === currentTestimonial
        );
    });
}

/* ==========================================
   BOUTON PRÉCÉDENT
========================================== */

if (previousButton) {

    previousButton.addEventListener("click", () => {

        showTestimonial(currentTestimonial - 1);

    });

}


/* ==========================================
   BOUTON SUIVANT
========================================== */

if (nextButton) {

    nextButton.addEventListener("click", () => {

        showTestimonial(currentTestimonial + 1);

    });

}


/* ==========================================
   POINTS DE NAVIGATION
========================================== */

testimonialDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showTestimonial(index);

    });

});


/* ==========================================
   INITIALISATION
========================================== */

showTestimonial(0);