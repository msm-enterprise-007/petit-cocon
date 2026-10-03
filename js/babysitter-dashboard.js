document.addEventListener("DOMContentLoaded", () => {

    const views = document.querySelectorAll(".dashboard-view");
    const navItems = document.querySelectorAll(".dashboard-nav-item");

    const conversations = {
        sophie: {
            name: "Sophie Martin",
            initials: "SM",
            messages: [
                {
                    type: "received",
                    text: "Bonjour Claire, je suis à la recherche d'une baby-sitter pour le 18 octobre."
                },
                {
                    type: "sent",
                    text: "Bonjour Sophie, merci pour votre message. Oui, je suis disponible ce soir-là."
                },
                {
                    type: "received",
                    text: "Super, merci beaucoup ! Seriez-vous disponible de 18h à 21h ?"
                }
            ]
        },

        julie: {
            name: "Julie Dupont",
            initials: "JD",
            messages: [
                {
                    type: "received",
                    text: "Bonjour Claire, je voulais savoir si vous êtes disponible mercredi prochain."
                },
                {
                    type: "sent",
                    text: "Bonjour Julie, oui je suis disponible à partir de 14h."
                },
                {
                    type: "received",
                    text: "Merci pour votre réponse !"
                }
            ]
        }
    };


    /* ==========================================
       CHANGER DE VUE
    ========================================== */

    function showView(viewName) {

        views.forEach(view => {
            view.classList.remove("active");
        });

        navItems.forEach(item => {
            item.classList.remove("active");
        });

        const targetView = document.getElementById(`${viewName}-view`);

        if (targetView) {
            targetView.classList.add("active");
        }

        const activeNav = document.querySelector(
            `.dashboard-nav-item[data-view="${viewName}"]`
        );

        if (activeNav) {
            activeNav.classList.add("active");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* ==========================================
       OUVRIR UNE CONVERSATION
    ========================================== */

    function openConversation(conversationId) {

        const conversation = conversations[conversationId];

        if (!conversation) {
            return;
        }

        const nameElement = document.getElementById("conversation-name");
        const messagesContainer =
            document.getElementById("messages-container");

        nameElement.textContent = conversation.name;

        messagesContainer.innerHTML = "";

        conversation.messages.forEach(message => {

            const bubble = document.createElement("div");

            bubble.className =
                `message-bubble ${message.type}`;

            bubble.textContent = message.text;

            messagesContainer.appendChild(bubble);
        });

        messagesContainer.scrollTop =
            messagesContainer.scrollHeight;

        showView("conversation");
    }


    /* ==========================================
       NAVIGATION
    ========================================== */

    document.addEventListener("click", event => {

        const viewTrigger =
            event.target.closest("[data-view]");

        if (viewTrigger) {

            const viewName =
                viewTrigger.dataset.view;

            showView(viewName);

            return;
        }


        const conversationTrigger =
            event.target.closest("[data-conversation]");

        if (conversationTrigger) {

            const conversationId =
                conversationTrigger.dataset.conversation;

            openConversation(conversationId);
        }
    });


    /* ==========================================
       ENVOYER UN MESSAGE
    ========================================== */

    const messageForm =
        document.getElementById("message-form");

    messageForm.addEventListener("submit", event => {

        event.preventDefault();

        const input =
            document.getElementById("message-input");

        const messagesContainer =
            document.getElementById("messages-container");

        const value =
            input.value.trim();

        if (!value) {
            return;
        }

        const bubble =
            document.createElement("div");

        bubble.className =
            "message-bubble sent";

        bubble.textContent = value;

        messagesContainer.appendChild(bubble);

        input.value = "";

        messagesContainer.scrollTop =
            messagesContainer.scrollHeight;
    });


    /* ==========================================
       MODIFIER LE PROFIL
    ========================================== */

    const profileForm =
        document.getElementById("profile-form");

    profileForm.addEventListener("submit", event => {

        event.preventDefault();

        const firstName =
            document.getElementById("firstname").value.trim();

        const name =
            firstName || "Claire";

        document.getElementById("babysitter-name")
            .textContent = name;

        const success =
            document.getElementById("profile-success");

        success.hidden = false;

        setTimeout(() => {
            success.hidden = true;
        }, 3500);
    });


    /* ==========================================
       DISPONIBILITÉS
    ========================================== */

    const availabilityForm =
        document.getElementById("availability-form");

    availabilityForm.addEventListener("submit", event => {

        event.preventDefault();

        const success =
            document.getElementById("availability-success");

        success.hidden = false;

        setTimeout(() => {
            success.hidden = true;
        }, 3500);
    });


    /* ==========================================
       INITIALISATION
    ========================================== */

    showView("overview");

});