 let translations = {};

  fetch("translations.json")
    .then(response => response.json())
    .then(data => {
      translations = data;
      const savedLang = localStorage.getItem("language") || "KZ";
      changeLanguage(savedLang);
    });

  function changeLanguage(lang) {
    document.querySelectorAll("[data-lang]").forEach(el => {
      const key = el.getAttribute("data-lang");
      const isSpan = el.getAttribute("data-first-span");

      if (translations[lang] && translations[lang][key]) {
        if (isSpan) {
       
          el.innerHTML = `${translations[lang][key].text} <span>${translations[lang][key].highlight}</span>`;
        } else {
          el.textContent = translations[lang][key];
        }
      }
    });

    localStorage.setItem("language", lang);
  }