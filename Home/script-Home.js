
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card .item");
    const searchInput = document.querySelector(".search-container input");
    const searchButton = document.querySelector(".search-container button");
    const cardsContainer = document.querySelector(".cards-container .swiper");

    // --- 1. Buscador dinamico ---

    searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();
    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(searchText) ? "block" : "none";
    });
  });

    // --- 2. Cards click event ---
    cards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
            const institutionName = card.querySelector("h3").innerText.trim();
            // Redirigir a la página de detalles con el nombre de la institución como parámetro
            window.location.href = `details.html?institution=${encodeURIComponent(institutionName)}`;
        });
    });
      // --- 3. Carrusel horizontal ---
      new Swiper('.card-wrapper', {
        loop: true,
        spaceBetween: 30,

      // Pagination bullets
        pagination: {
          el: '.swiper-pagination',
        },

      // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        breakpoints: {
           0: {
             slidesPerView: 1,
          },
            768: {
             slidesPerView: 2,
          },
            1024: {
             slidesPerView: 3,
         }
      }
         
    }); 
  });
