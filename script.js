document.getElementById("year").textContent = new Date().getFullYear();

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const formSuccess = document.getElementById("form-success");
const formReset = document.getElementById("form-reset");

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector(".form-submit");
  const originalButtonText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = "Wysyłam…";
  formStatus.className = "form-status";
  formStatus.textContent = "Bezpiecznie wysyłam Twoją wiadomość…";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    contactForm.reset();
    contactForm.classList.add("is-sent");
    formSuccess.hidden = false;
    formSuccess.focus?.();
    formStatus.textContent = "";
  } catch {
    formStatus.classList.add("is-error");
    formStatus.textContent =
      "Nie udało się wysłać wiadomości. Sprawdź połączenie i spróbuj ponownie.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
});

formReset?.addEventListener("click", () => {
  contactForm.classList.remove("is-sent");
  formSuccess.hidden = true;
  formStatus.className = "form-status";
  formStatus.textContent = "";
  contactForm.querySelector("#contact-name")?.focus();
});
