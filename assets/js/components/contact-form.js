const RECIPIENT = 'alfreolico.brambila@gmail.com';

const messages = {
  es: {
    required: 'Completa los campos obligatorios antes de preparar el correo.',
    email: 'Escribe una dirección de correo válida.',
    opening: 'Se abrirá tu aplicación de correo con el mensaje preparado.'
  },
  en: {
    required: 'Complete the required fields before preparing the email.',
    email: 'Enter a valid email address.',
    opening: 'Your email application will open with the prepared message.'
  }
};

export default function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const language = form.dataset.contactLanguage === 'en' ? 'en' : 'es';
  const status = form.querySelector('[data-contact-status]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const copy = messages[language];
    const fields = new FormData(form);
    const name = fields.get('name').trim();
    const email = fields.get('email').trim();
    const conversationType = fields.get('conversationType').trim();
    const company = fields.get('company').trim();
    const message = fields.get('message').trim();

    if (!name || !email || !conversationType || !message) {
      status.textContent = copy.required;
      form.reportValidity();
      return;
    }

    if (!form.elements.email.validity.valid) {
      status.textContent = copy.email;
      form.elements.email.focus();
      return;
    }

    const subject = language === 'en'
      ? `Portfolio contact — ${conversationType}`
      : `Contacto desde portfolio — ${conversationType}`;
    const body = language === 'en'
      ? `Name: ${name}\nEmail: ${email}\nConversation type: ${conversationType}\nCompany or project: ${company || 'Not provided'}\n\nMessage:\n${message}`
      : `Nombre: ${name}\nCorreo: ${email}\nTipo de conversación: ${conversationType}\nEmpresa o proyecto: ${company || 'No indicado'}\n\nMensaje:\n${message}`;

    status.textContent = copy.opening;
    window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
