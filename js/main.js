const filterButtons = document.querySelectorAll(".gallery-filter");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        // Retirer active de tous les boutons
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Ajouter active au bouton sélectionné
        button.classList.add("active");


        // Filtrer les images
        galleryItems.forEach(item => {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }

        });

    });

});
/* ==========================================================
   TEAM CAROUSEL
========================================================== */

const teamTrack = document.querySelector(".team-track");
const teamCards = document.querySelectorAll(".team-card");

const teamPrev = document.querySelector(".team-prev");
const teamNext = document.querySelector(".team-next");

const teamPagination = document.querySelector(".team-pagination");


if (
    teamTrack &&
    teamCards.length > 0 &&
    teamPrev &&
    teamNext &&
    teamPagination
) {

    let currentTeamIndex = 0;


    /* =============================================
       NOMBRE DE CARTES VISIBLES
    ============================================== */

    function getVisibleCards() {

        const width = window.innerWidth;


        if (width >= 1200) {
            return 4;
        }


        if (width >= 992) {
            return 3;
        }


        if (width >= 768) {
            return 2;
        }


        return 1;
    }


    /* =============================================
       NOMBRE DE POSITIONS POSSIBLES
    ============================================== */

    function getMaxIndex() {

        return Math.max(
            0,
            teamCards.length - getVisibleCards()
        );

    }


    /* =============================================
       CRÉER LES POINTS
    ============================================== */

    function createTeamDots() {

        teamPagination.innerHTML = "";

        const totalPositions = getMaxIndex() + 1;


        for (let i = 0; i < totalPositions; i++) {

            const dot = document.createElement("button");

            dot.classList.add("team-dot");

            dot.setAttribute(
                "aria-label",
                `Afficher la position ${i + 1}`
            );


            dot.addEventListener("click", () => {

                currentTeamIndex = i;

                updateTeamCarousel();

            });


            teamPagination.appendChild(dot);

        }

    }


    /* =============================================
       METTRE À JOUR LE CAROUSEL
    ============================================== */

    function updateTeamCarousel() {

        const maxIndex = getMaxIndex();


        /* Sécurité */

        if (currentTeamIndex > maxIndex) {
            currentTeamIndex = maxIndex;
        }


        if (currentTeamIndex < 0) {
            currentTeamIndex = 0;
        }


        const firstCard = teamCards[0];

        const cardWidth = firstCard.getBoundingClientRect().width;


        const trackStyle = window.getComputedStyle(teamTrack);

        const gap =
            parseFloat(trackStyle.columnGap) ||
            parseFloat(trackStyle.gap) ||
            0;


        const offset =
            currentTeamIndex * (cardWidth + gap);


        teamTrack.style.transform =
            `translateX(-${offset}px)`;


        /* =========================
           FLÈCHES
        ========================== */

        teamPrev.disabled =
            currentTeamIndex === 0;


        teamNext.disabled =
            currentTeamIndex === maxIndex;


        /* =========================
           DOTS
        ========================== */

        const dots =
            teamPagination.querySelectorAll(".team-dot");


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentTeamIndex
            );

        });

    }


    /* =============================================
       BOUTON SUIVANT
    ============================================== */

    teamNext.addEventListener("click", () => {

        if (currentTeamIndex < getMaxIndex()) {

            currentTeamIndex++;

            updateTeamCarousel();

        }

    });


    /* =============================================
       BOUTON PRÉCÉDENT
    ============================================== */

    teamPrev.addEventListener("click", () => {

        if (currentTeamIndex > 0) {

            currentTeamIndex--;

            updateTeamCarousel();

        }

    });


    /* =============================================
       RESPONSIVE
    ============================================== */

    window.addEventListener("resize", () => {

        currentTeamIndex = Math.min(
            currentTeamIndex,
            getMaxIndex()
        );

        createTeamDots();

        updateTeamCarousel();

    });


    /* =============================================
       INITIALISATION
    ============================================== */

    createTeamDots();

    updateTeamCarousel();

}