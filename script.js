document.getElementById("year").textContent = new Date().getFullYear();

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const subject = `Zapytanie o prywatną konsultację — ${name}`;
  const body = [
    `Dzień dobry Pani Angeliko,`,
    "",
    message,
    "",
    "Dane do odpowiedzi:",
    `Imię: ${name}`,
    `E-mail: ${email}`,
    phone ? `Telefon: ${phone}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const recipient = ["a.sawicka", "cognic.pl"].join("@");

  formStatus.textContent = "Otwieram wiadomość w Twojej aplikacji pocztowej…";
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
