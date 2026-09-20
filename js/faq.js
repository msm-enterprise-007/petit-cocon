const faqFilterButtons = document.querySelectorAll(".faq-filter-button");
const faqItems = document.querySelectorAll(".faq-item");

const faqData = {
    parents: [
        {
            question: "Comment créer un compte sur Petit Cocon ?",
            answer: "Vous pouvez créer votre compte directement depuis la page d'inscription et renseigner vos informations."
        },
        {
            question: "Comment rechercher une baby-sitter ?",
            answer: "Recherchez une baby-sitter selon vos besoins, consultez son profil puis contactez-la."
        },
        {
            question: "Comment fonctionne la réservation ?",
            answer: "Sélectionnez une baby-sitter, indiquez vos besoins et envoyez votre demande de réservation."
        },
        {
            question: "Quels sont les moyens de paiement acceptés ?",
            answer: "Les moyens de paiement disponibles seront indiqués au moment de la réservation."
        },
        {
            question: "Comment sont vérifiés les profils des baby-sitters ?",
            answer: "Les informations et justificatifs nécessaires sont vérifiés avant la publication du profil."
        },
        {
            question: "Que faire en cas d'annulation ?",
            answer: "Consultez les conditions d'annulation liées à votre réservation ou contactez notre équipe."
        },
        {
            question: "Est-il possible de modifier ou d'annuler une réservation ?",
            answer: "Les possibilités de modification ou d'annulation dépendent de votre réservation."
        },
        {
            question: "Comment contacter le service client ?",
            answer: "Vous pouvez contacter notre équipe depuis la page Contact de Petit Cocon."
        }
    ],

    babysitters: [
        {
            question: "Comment créer un compte baby-sitter ?",
            answer: "Inscrivez-vous en tant que baby-sitter et renseignez vos informations ainsi que votre expérience."
        },
        {
            question: "Quelles sont les conditions pour devenir baby-sitter ?",
            answer: "Vous devez renseigner vos informations personnelles, votre expérience et fournir les justificatifs demandés."
        },
        {
            question: "Comment mon profil est-il vérifié ?",
            answer: "Notre équipe vérifie les informations et les justificatifs transmis avant la publication de votre profil."
        },
        {
            question: "Comment recevoir des demandes de garde ?",
            answer: "Une fois votre profil validé et publié, les parents peuvent consulter votre profil et vous contacter."
        },
        {
            question: "Comment accepter une réservation ?",
            answer: "Vous pouvez consulter les demandes reçues et accepter celles qui correspondent à vos disponibilités."
        },
        {
            question: "Puis-je modifier mes disponibilités ?",
            answer: "Oui, vos disponibilités pourront être mises à jour depuis votre espace personnel."
        },
        {
            question: "Comment suis-je rémunéré(e) ?",
            answer: "Les modalités de rémunération sont indiquées au moment de la réservation selon les conditions de Petit Cocon."
        },
        {
            question: "Comment contacter le service client ?",
            answer: "Vous pouvez contacter notre équipe depuis la page Contact de Petit Cocon."
        }
    ]
};

function renderFaq(type) {
    const faqList = document.querySelector(".faq-list");

    if (!faqList || !faqData[type]) {
        return;
    }

    faqList.innerHTML = "";

    faqData[type].forEach((item) => {
        const details = document.createElement("details");
        details.className = "faq-item";

        details.innerHTML = `
            <summary>
                <span>${item.question}</span>
                <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
            </summary>

            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        `;

        faqList.appendChild(details);
    });
}

faqFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        faqFilterButtons.forEach((item) => {
            item.classList.remove("is-active");
        });

        button.classList.add("is-active");

        const type = button.textContent
            .trim()
            .toLowerCase()
            .includes("baby")
            ? "babysitters"
            : "parents";

        renderFaq(type);
    });
});

// Affichage initial : Parents
renderFaq("parents");