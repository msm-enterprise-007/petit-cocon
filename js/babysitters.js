const babysitters = [
    {
        name: "Sophie",
        image: "../assets/images/baby-sitters/babysitter-home.png",
        experience: "5 ans d'expérience",
        diploma: "CAP Petite Enfance",
        rating: "4.9",
        description:
            "Passionnée par les enfants, je propose des gardes bienveillantes et adaptées à chaque famille.",
        skills: ["Éveil", "Sorties", "Devoirs"],
        price: "12€",
        availability: "Disponible cette semaine"
    },

    {
        name: "Aïcha",
        image: "../assets/images/baby-sitters/babysitter-home.png",
        experience: "4 ans d'expérience",
        diploma: "BAFA",
        rating: "4.8",
        description:
            "Dynamique et attentive, j'aime proposer des activités adaptées à l'âge des enfants.",
        skills: ["Jeux", "Éveil", "Sorties"],
        price: "11€",
        availability: "Disponible cette semaine"
    },

    {
        name: "Mariam",
        image: "../assets/images/baby-sitters/babysitter-home.png",
        experience: "6 ans d'expérience",
        diploma: "Petite Enfance",
        rating: "4.9",
        description:
            "Une garde douce et rassurante, avec une attention particulière au rythme de chaque enfant.",
        skills: ["Devoirs", "Repas", "Éveil"],
        price: "13€",
        availability: "Disponible demain"
    },

    {
        name: "Emma",
        image: "../assets/images/baby-sitters/babysitter-home.png",
        experience: "3 ans d'expérience",
        diploma: "BAFA",
        rating: "4.7",
        description:
            "J'aime accompagner les enfants dans leurs activités quotidiennes avec patience et bienveillance.",
        skills: ["Jeux", "Devoirs", "Sorties"],
        price: "11€",
        availability: "Disponible cette semaine"
    }
];

const carouselTrack = document.querySelector(".babysitters-carousel-track");
const carouselDots = document.querySelector(".babysitters-carousel-dots");
const previousButton = document.querySelector(".babysitters-carousel-prev");
const nextButton = document.querySelector(".babysitters-carousel-next");

let currentIndex = 0;

function createBabysitterCard(babysitter) {
    const card = document.createElement("article");

    card.className = "babysitter-card";

    card.innerHTML = `
        <div class="babysitter-card-photo">
            <img
                src="${babysitter.image}"
                alt="Photo de ${babysitter.name}"
            >

            <span class="babysitter-availability">
                <span></span>
                Disponible
            </span>
        </div>

        <div class="babysitter-card-content">

            <div class="babysitter-card-header">
                <div>
                    <h3>${babysitter.name}</h3>

                    <span class="babysitter-verified">
                        <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
                        Profil vérifié
                    </span>
                </div>

                <div class="babysitter-rating">
                    <i class="fa-solid fa-star" aria-hidden="true"></i>
                    <strong>${babysitter.rating}</strong>
                </div>
            </div>

            <div class="babysitter-card-info">
                <span>
                    <i class="fa-solid fa-briefcase" aria-hidden="true"></i>
                    ${babysitter.experience}
                </span>

                <span>
                    <i class="fa-solid fa-graduation-cap" aria-hidden="true"></i>
                    ${babysitter.diploma}
                </span>
            </div>

            <p class="babysitter-card-description">
                ${babysitter.description}
            </p>

            <div class="babysitter-skills">
                ${babysitter.skills
                    .map((skill) => `<span>${skill}</span>`)
                    .join("")}
            </div>

            <div class="babysitter-card-footer">

                <div class="babysitter-price">
                    <strong>${babysitter.price}</strong>
                    <span>/ heure</span>
                </div>

                <span class="babysitter-availability-text">
                    ${babysitter.availability}
                </span>

            </div>

            <div class="babysitter-card-actions">

                <a
                    href="connexion.html"
                    class="babysitter-phone"
                    aria-label="Contacter ${babysitter.name}"
                >
                    <i class="fa-solid fa-phone" aria-hidden="true"></i>
                </a>

                <a href="#" class="babysitter-profile-button">
                    <span>Voir le profil</span>
                    <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </a>

            </div>

        </div>
    `;

    return card;
}

function renderBabysitters() {
    if (!carouselTrack) {
        return;
    }

    carouselTrack.innerHTML = "";

    babysitters.forEach((babysitter) => {
        carouselTrack.appendChild(createBabysitterCard(babysitter));
    });
}

function renderDots() {
    if (!carouselDots) {
        return;
    }

    carouselDots.innerHTML = "";

    babysitters.forEach((babysitter, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "babysitters-carousel-dot";

        dot.setAttribute(
            "aria-label",
            `Afficher le profil de ${babysitter.name}`
        );

        dot.addEventListener("click", () => {
            goToSlide(index);
        });

        carouselDots.appendChild(dot);
    });
}

function updateCarousel() {
    if (!carouselTrack) {
        return;
    }

    carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    const dots = document.querySelectorAll(
        ".babysitters-carousel-dot"
    );

    dots.forEach((dot, index) => {
        dot.classList.toggle(
            "is-active",
            index === currentIndex
        );
    });
}

function goToSlide(index) {
    if (index < 0 || index >= babysitters.length) {
        return;
    }

    currentIndex = index;
    updateCarousel();
}

function showPrevious() {
    const newIndex =
        currentIndex === 0
            ? babysitters.length - 1
            : currentIndex - 1;

    goToSlide(newIndex);
}

function showNext() {
    const newIndex =
        currentIndex === babysitters.length - 1
            ? 0
            : currentIndex + 1;

    goToSlide(newIndex);
}

previousButton?.addEventListener("click", showPrevious);
nextButton?.addEventListener("click", showNext);

renderBabysitters();
renderDots();
updateCarousel();