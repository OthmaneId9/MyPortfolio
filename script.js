// ============ SMOOTH SCROLLING NAVIGATION ============

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ============ SECTION REVEAL ON SCROLL ============

function revealSectionsOnScroll() {
  const sections = document.querySelectorAll("section");
  const windowHeight = window.innerHeight;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < windowHeight * 0.78) {
      section.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealSectionsOnScroll);
window.addEventListener("load", revealSectionsOnScroll);

// ============ CONTACT FORM (MAILTO) ============

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields before sending your message.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const mailtoLink = `mailto:othman.idrissi404@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    alert("Thank you for your message! Your email client should open now.");
    contactForm.reset();
  });
}
