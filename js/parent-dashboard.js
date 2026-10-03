document.addEventListener("DOMContentLoaded", () => {
    const dashboardView = document.getElementById("dashboard-view");
    const detailView = document.getElementById("detail-view");
    const searchForm = document.getElementById("babysitter-search-form");

    const logoutButtons = [
        document.getElementById("logout-desktop")
    ].filter(Boolean);

    const conversations = {
        Claire: {
            name: "Claire Martin",
            messages: [
                {
                    type: "received",
                    text: "Bonjour Sophie, je suis disponible pour votre demande."
                },
                {
                    type: "sent",
                    text: "Bonjour Claire, merci. Seriez-vous disponible le 18 octobre à partir de 18h ?"
                },
                {
                    type: "received",
                    text: "Oui, c'est confirmé pour moi."
                }
            ]
        },

        Amélie: {
            name: "Amélie Dubois",
            messages: [
                {
                    type: "sent",
                    text: "Bonjour Amélie, je vous contacte pour une garde le 22 octobre."
                },
                {
                    type: "received",
                    text: "Merci pour votre message ! Je regarde mon planning et je vous confirme."
                }
            ]
        }
    };


    /* ==========================================================
       AFFICHER UNE VUE DÉTAILLÉE
       ========================================================== */

    function showDetail(content) {
        dashboardView.hidden = true;
        detailView.hidden = false;

        detailView.innerHTML = content;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* ==========================================================
       RETOUR AU DASHBOARD
       ========================================================== */

    function showDashboard() {
        detailView.hidden = true;
        dashboardView.hidden = false;

        detailView.innerHTML = "";
    }


    /* ==========================================================
       EN-TÊTE DES VUES
       ========================================================== */

    function detailHeader(title, subtitle = "") {
        return `
            <div class="detail-panel">

                <button
                    type="button"
                    class="detail-back"
                    data-action="back"
                >
                    <i class="fa-solid fa-arrow-left"></i>
                    Retour à mon espace
                </button>

                <h2>${title}</h2>

                ${
                    subtitle
                        ? `<p>${subtitle}</p>`
                        : ""
                }
        `;
    }


    /* ==========================================================
       LISTE DES CONVERSATIONS
       ========================================================== */

    function openConversations() {

        showDetail(`
            ${detailHeader(
                "Mes conversations",
                "Retrouvez tous vos échanges avec les baby-sitters."
            )}

            <div class="dashboard-list">

                ${Object.entries(conversations)
                    .map(([key, conversation]) => {

                        const lastMessage =
                            conversation.messages.at(-1).text;

                        return `
                            <button
                                class="dashboard-list-item"
                                data-conversation="${key}"
                            >

                                <span class="avatar">
                                    ${conversation.name.charAt(0)}
                                </span>

                                <span class="list-main">

                                    <strong>
                                        ${conversation.name}
                                    </strong>

                                    <small>
                                        ${lastMessage}
                                    </small>

                                </span>

                                <i class="fa-solid fa-chevron-right"></i>

                            </button>
                        `;

                    })
                    .join("")}

            </div>

            </div>
        `);
    }


    /* ==========================================================
       OUVRIR UNE CONVERSATION
       ========================================================== */

    function openConversation(name) {

        const conversation = conversations[name];

        if (!conversation) return;

        showDetail(`
            ${detailHeader(
                conversation.name,
                "Conversation avec votre baby-sitter."
            )}

            <div
                class="conversation-messages"
                id="conversation-messages"
            >

                ${conversation.messages
                    .map(message => {

                        return `
                            <div class="message ${message.type}">
                                ${message.text}
                            </div>
                        `;

                    })
                    .join("")}

            </div>


            <form
                class="message-form"
                id="message-form"
            >

                <input
                    type="text"
                    id="message-input"
                    placeholder="Écrire un message..."
                    autocomplete="off"
                    required
                >

                <button
                    type="submit"
                    aria-label="Envoyer"
                >
                    <i class="fa-solid fa-paper-plane"></i>
                </button>

            </form>

            </div>
        `);
    }


    /* ==========================================================
       LISTE DES DEMANDES
       ========================================================== */

    function openRequests() {

        showDetail(`
            ${detailHeader(
                "Mes demandes",
                "Suivez l'état de vos demandes de garde."
            )}

            <div class="dashboard-list">

                <button
                    class="dashboard-list-item"
                    data-view="request"
                >

                    <span class="avatar">C</span>

                    <span class="list-main">
                        <strong>Claire Martin</strong>

                        <small>
                            18 octobre · 18h00 – 21h00 · Montrouge
                        </small>
                    </span>

                    <span class="status status-confirmed">
                        Confirmée
                    </span>

                    <i class="fa-solid fa-chevron-right"></i>

                </button>


                <button
                    class="dashboard-list-item"
                    data-view="request"
                >

                    <span class="avatar">A</span>

                    <span class="list-main">
                        <strong>Amélie Dubois</strong>

                        <small>
                            22 octobre · 17h30 – 20h30 · Malakoff
                        </small>
                    </span>

                    <span class="status status-pending">
                        En attente
                    </span>

                    <i class="fa-solid fa-chevron-right"></i>

                </button>

            </div>

            </div>
        `);
    }


    /* ==========================================================
       DÉTAIL D'UNE DEMANDE
       ========================================================== */

    function openRequest() {

        showDetail(`
            ${detailHeader(
                "Détail de la demande",
                "Votre demande de garde auprès de Claire Martin."
            )}

            <div class="detail-grid">

                <div class="detail-row">
                    <span>Baby-sitter</span>
                    <strong>Claire Martin</strong>
                </div>

                <div class="detail-row">
                    <span>Date</span>
                    <strong>18 octobre 2026</strong>
                </div>

                <div class="detail-row">
                    <span>Horaires</span>
                    <strong>18h00 – 21h00</strong>
                </div>

                <div class="detail-row">
                    <span>Quartier</span>
                    <strong>Montrouge</strong>
                </div>

                <div class="detail-row">
                    <span>Statut</span>
                    <strong>Confirmée</strong>
                </div>

            </div>


            <button
                class="dashboard-primary-btn"
                data-conversation="Claire"
            >
                Contacter Claire
            </button>

            </div>
        `);
    }


    /* ==========================================================
       PROCHAINE GARDE
       ========================================================== */

    function openBooking() {

        showDetail(`
            ${detailHeader(
                "Ma prochaine garde",
                "Les informations de votre garde confirmée."
            )}

            <div class="detail-grid">

                <div class="detail-row">
                    <span>Baby-sitter</span>
                    <strong>Claire Martin</strong>
                </div>

                <div class="detail-row">
                    <span>Date</span>
                    <strong>18 octobre 2026</strong>
                </div>

                <div class="detail-row">
                    <span>Horaires</span>
                    <strong>18h00 – 21h00</strong>
                </div>

                <div class="detail-row">
                    <span>Lieu</span>
                    <strong>Montrouge</strong>
                </div>

                <div class="detail-row">
                    <span>Statut</span>
                    <strong>Confirmée</strong>
                </div>

            </div>

            </div>
        `);
    }


    /* ==========================================================
       MODIFICATION DU PROFIL
       ========================================================== */

    function openProfile() {

        showDetail(`
            ${detailHeader(
                "Mon profil",
                "Modifiez les informations de votre compte."
            )}

            <form
                class="profile-edit-form"
                id="profile-form"
            >

                <div class="dashboard-field">

                    <label for="profile-firstname">
                        Prénom
                    </label>

                    <input
                        id="profile-firstname"
                        value="Sophie"
                        required
                    >

                </div>


                <div class="dashboard-field">

                    <label for="profile-lastname">
                        Nom
                    </label>

                    <input
                        id="profile-lastname"
                        value="Martin"
                        required
                    >

                </div>


                <div class="dashboard-field">

                    <label for="profile-email">
                        Adresse e-mail
                    </label>

                    <input
                        id="profile-email"
                        type="email"
                        value="sophie.martin@email.com"
                        required
                    >

                </div>


                <div class="dashboard-field">

                    <label for="profile-phone">
                        Téléphone
                    </label>

                    <input
                        id="profile-phone"
                        type="tel"
                        value="07 00 00 00 00"
                    >

                </div>


                <div class="dashboard-field">

                    <label for="profile-city">
                        Ville
                    </label>

                    <input
                        id="profile-city"
                        value="Montrouge"
                    >

                </div>


                <button
                    class="dashboard-primary-btn"
                    type="submit"
                >
                    Enregistrer les modifications
                </button>

            </form>

            </div>
        `);
    }


    /* ==========================================================
       RÉSULTATS DE RECHERCHE
       ========================================================== */

    function showSearchResults() {

        const neighborhood =
            document.getElementById(
                "search-neighborhood"
            ).value || "Tous les quartiers";


        const date =
            document.getElementById(
                "search-date"
            ).value;


        const formattedDate = date
            ? new Date(date + "T12:00:00")
                .toLocaleDateString("fr-FR")
            : "";


        showDetail(`
            ${detailHeader(
                "Baby-sitters disponibles",
                `Recherche : ${neighborhood}${
                    formattedDate
                        ? ` · ${formattedDate}`
                        : ""
                }`
            )}

            <div class="dashboard-list">

                <button class="dashboard-list-item">

                    <span class="avatar">
                        C
                    </span>

                    <span class="list-main">

                        <strong>
                            Claire Martin
                        </strong>

                        <small>
                            Montrouge · 14 €/h · Disponible
                        </small>

                    </span>

                    <i class="fa-solid fa-chevron-right"></i>

                </button>


                <button class="dashboard-list-item">

                    <span class="avatar">
                        A
                    </span>

                    <span class="list-main">

                        <strong>
                            Amélie Dubois
                        </strong>

                        <small>
                            Malakoff · 13 €/h · Disponible
                        </small>

                    </span>

                    <i class="fa-solid fa-chevron-right"></i>

                </button>

            </div>

            </div>
        `);
    }


    /* ==========================================================
       CLICS
       ========================================================== */

    document.addEventListener("click", (event) => {

        const viewTrigger =
            event.target.closest("[data-view]");

        const conversationTrigger =
            event.target.closest("[data-conversation]");

        const backTrigger =
            event.target.closest(
                '[data-action="back"]'
            );


        /* Retour */

        if (backTrigger) {
            showDashboard();
            return;
        }


        /* Conversation */

        if (conversationTrigger) {

            openConversation(
                conversationTrigger.dataset.conversation
            );

            return;
        }


        if (!viewTrigger) return;


        switch (viewTrigger.dataset.view) {

            case "conversations":
                openConversations();
                break;

            case "requests":
                openRequests();
                break;

            case "request":
                openRequest();
                break;

            case "booking":
                openBooking();
                break;

            case "profile":
                openProfile();
                break;
        }

    });


    /* ==========================================================
       FORMULAIRES
       ========================================================== */

    document.addEventListener("submit", (event) => {


        /* Recherche */

        if (
            event.target.id ===
            "babysitter-search-form"
        ) {

            event.preventDefault();

            showSearchResults();
        }


        /* Message */

        if (
            event.target.id ===
            "message-form"
        ) {

            event.preventDefault();


            const input =
                document.getElementById(
                    "message-input"
                );


            const messages =
                document.getElementById(
                    "conversation-messages"
                );


            const value =
                input.value.trim();


            if (!value) return;


            const message =
                document.createElement("div");


            message.className =
                "message sent";


            message.textContent =
                value;


            messages.appendChild(message);


            input.value = "";

            input.focus();
        }


        /* Profil */

        if (
            event.target.id ===
            "profile-form"
        ) {

            event.preventDefault();


            const firstName =
                document
                    .getElementById(
                        "profile-firstname"
                    )
                    .value
                    .trim();


            document.getElementById(
                "parent-name"
            ).textContent =
                firstName || "Sophie";


            const saved =
                document.createElement("p");


            saved.textContent =
                "Modifications enregistrées.";


            saved.style.color =
                "#5d7657";


            saved.style.fontWeight =
                "700";


            event.target.appendChild(saved);
        }

    });


    /* ==========================================================
       DÉCONNEXION
       ========================================================== */

    logoutButtons.forEach(button => {

        button.addEventListener("click", () => {

            window.location.href =
                "connexion.html";

        });

    });

});