const API_URL = "https://script.google.com/macros/s/AKfycbwM0flkxBadxEKIvjCZ0IEJyYG-Hm4lpGgZBC5BbfnZMdZhW16f5Hbeud5-y_uDl8JE/exec";

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("form");
  if (!contactForm) return;

  const phoneInput = document.getElementById("phone");

  if (phoneInput && !phoneInput.name) phoneInput.name = "phone";

  let successMessage = document.getElementById("success-message");
  if (!successMessage) {
    successMessage = document.createElement("div");
    successMessage.id = "success-message";
    successMessage.className = "success-message hidden";
    successMessage.textContent = "Сообщение успешно отправлено!";
    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
  }

  const submitButton = contactForm.querySelector('.btn, input[type="submit"], button[type="submit"]');

 
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      const cleaned = phoneInput.value.replace(/\D/g, "");
      if (phoneInput.value !== cleaned) {
        phoneInput.value = cleaned;
      }
      if (!/^\d*$/.test(phoneInput.value)) {
        phoneInput.setCustomValidity("Телефон тек сандардан тұруы керек.");
      } else {
        phoneInput.setCustomValidity("");
      }
    });
  }

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (submitButton) submitButton.disabled = true;

  
    const phoneDigits = phoneInput ? phoneInput.value.replace(/\D/g, "") : "";
    if (!/^\d{10,15}$/.test(phoneDigits)) {
      alert("Телефон нөмірі тек 10–15 саннан тұруы керек.");
      if (submitButton) submitButton.disabled = false;
      return;
    }


    const formData = new FormData(contactForm);
    if (!formData.has("phone") && phoneDigits) {
      formData.append("phone", phoneDigits);
    }

   
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      params.append(key, value);
    }


    let originalBtnText = "";
    if (submitButton) {
      if (submitButton.tagName.toLowerCase() === "input") {
        originalBtnText = submitButton.value;
        submitButton.value = "Отправка...";
      } else {
        originalBtnText = submitButton.textContent;
        submitButton.textContent = "Отправка...";
      }
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: params.toString(),
    })
    .then(response => {

      return response.json ? response.json() : response.text().then(t => {
        try { return JSON.parse(t); } catch(e){ return { result: "error", error: "Неверный формат ответа сервера" }; }
      });
    })
    .then(data => {
      console.log("Response data:", data);
      if (data && data.result === "success") {
        successMessage.classList.remove("hidden");
        setTimeout(() => {
          successMessage.classList.add("hidden");
          contactForm.reset();
          if (submitButton) {
            if (submitButton.tagName.toLowerCase() === "input") submitButton.value = originalBtnText;
            else submitButton.textContent = originalBtnText;
            submitButton.disabled = false;
          }
        }, 3000);
      } else {
        alert("Қате: " + (data && data.error ? data.error : "Сервер дұрыс жауап бермеді."));
        if (submitButton) {
          if (submitButton.tagName.toLowerCase() === "input") submitButton.value = originalBtnText;
          else submitButton.textContent = originalBtnText;
          submitButton.disabled = false;
        }
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Бірдеңе қате кетті. Қайта байқап көріңіз.");
      if (submitButton) {
        if (submitButton.tagName.toLowerCase() === "input") submitButton.value = originalBtnText;
        else submitButton.textContent = originalBtnText;
        submitButton.disabled = false;
      }
    });
  });
});