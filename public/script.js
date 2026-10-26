const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    if (formMessage) {
      formMessage.textContent = 'Sending your enquiry...';
      formMessage.classList.remove('error');
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to send your enquiry right now.');
      }

      contactForm.reset();
      if (formMessage) {
        formMessage.textContent = result.message;
      }

      window.location.href = '/success.html';
    } catch (error) {
      if (formMessage) {
        formMessage.textContent = error.message || 'Unable to send your enquiry right now.';
        formMessage.classList.add('error');
      }
    }
  });
}
