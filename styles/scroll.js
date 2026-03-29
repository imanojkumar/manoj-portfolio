document.addEventListener("DOMContentLoaded", function () {

  // 1. SCROLL REVEAL (IntersectionObserver)
  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  }, {
    rootMargin: "0px",
    threshold: 0.15 
  });

  reveals.forEach(el => revealObserver.observe(el));


  // 2. PREMIUM FOOTER LOGIC - Dynamic Year
  const yearSpan = document.getElementById('copy-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  // 3. GLOWING GO-TOP BUTTON VISIBILITY & CLICK
  const goTopFab = document.getElementById('go-top');
  
  if (goTopFab) {
    window.addEventListener('scroll', () => {
      // Show button after scrolling down 320px
      goTopFab.classList.toggle('visible', window.scrollY > 320);
    }, { passive: true });

    goTopFab.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

});

// 4. NEWSLETTER SUBSCRIPTION LOGIC 
// (Kept outside DOMContentLoaded so inline onclick attribute can access it)
function handleSubscribe() {
  const input = document.getElementById('nl-email');
  const btn = document.getElementById('nl-btn');
  const email = input.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  if (!valid) {
    input.style.outline = '2px solid #ff4d6d'; // Error red
    input.focus();
    setTimeout(() => { input.style.outline = ''; }, 2000);
    return;
  }
  
  // Success state
  btn.textContent = '✓ You\'re in!';
  btn.style.background = '#00ff9d'; // Success green
  btn.style.color = '#0a0c10';
  btn.disabled = true;
  input.value = '';
  input.placeholder = 'Welcome aboard! 🚀';
  input.disabled = true;
}