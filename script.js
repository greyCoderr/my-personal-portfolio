// Scroll To Top Button
const scrollBtn = document.getElementById('scrollTopBtn');
window.onscroll = () => {
  scrollBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
};
scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// Dark Mode Toggle with Local Storage Support
window.addEventListener("load", () => {
  const toggleTheme = document.getElementById('toggleTheme');
  const themeIcon = document.getElementById('themeIcon');

  if (toggleTheme && themeIcon) {
    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light");
      themeIcon.textContent = "☀️";
    } else {
      document.body.classList.remove("light");
      themeIcon.textContent = "🌙";
    }

    toggleTheme.addEventListener("click", () => {
      document.body.classList.toggle("light");

      const isLight = document.body.classList.contains("light");
      themeIcon.textContent = isLight ? "☀️" : "🌙";
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }
});


// Modal logic
const modalBtns = document.querySelectorAll('.modal-btn, .projectTestimonial-btn');
const closeBtns = document.querySelectorAll('.close');
const modals = document.querySelectorAll('.modal');
const body = document.body;

//Open Modal
modalBtns.forEach(btn => {
  const target = btn.dataset.modal;
  const modal = document.getElementById(target);
  btn.addEventListener('click', () => {
    modal.classList.add('show');
    body.style.overflow = 'hidden';
  });
});

// Close modal by close button
closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    modal.classList.remove('show');
    body.style.overflow = '';
  });
});

// Close modal by clicking outside content
modals.forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('show');
      body.style.overflow = '';
    }
  });
});

// Close modal by pressing ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modals.forEach(modal => modal.classList.remove('show'));
    body.style.overflow = '';
  }
});

//EmailJS Logic
const form = document.querySelector("form");
const nameField = form.querySelector('input[placeholder="Name"]');
const emailField = form.querySelector('input[placeholder="Email"]');
const messageField = form.querySelector('textarea[placeholder="Your message"]');

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const message = messageField.value.trim();

  if (!name || !email || !message) {
    showToast("Please fill in all fields.", true);
    return;
  }

  //Send the email via EmailJS
  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;

  emailjs.send("service_lrivt4n", "template_3ra2kee", {
      name,
      email,
      message
  }, "JUb8R8ZhkzvBOKnrr")
  .then(() => {
    showToast("Message sent successfully! ✅");
    form.reset();
  })
  .catch((error) => {
    console.error("EmailJS Error:", error);
    showToast("Failed to send message. Please try again.", true);
  })
  .finally(() => {
    submitBtn.disabled = false;
  });
});

function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.backgroundColor = isError ? "#dc2626" : "#00bfa6";
  toast.classList.add("show");
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 300);
  }, 3000);
}
