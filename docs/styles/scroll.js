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
  
  // =========================================
  // CUSTOM TABS LOGIC (RESEARCH PAGE)
  // =========================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // 1. Remove 'active' class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // 2. Add 'active' class to the clicked button
        btn.classList.add('active');

        // 3. Find the target pane and activate it
        const targetId = btn.getAttribute('data-target');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }
  
  // =========================================
  // SECURE EMAIL OBFUSCATION
  // =========================================
  const secureContactBtn = document.getElementById('secure-contact');
  
  if (secureContactBtn) {
    secureContactBtn.addEventListener('click', function(e) {
      e.preventDefault(); // Stops the page from jumping to the top
      
      // We split the email into variables so bots cannot scrape the full string
      const user = "mkumar75";
      const domain = "gmail.com";
      
      // This launches the user's email client securely
      window.location.href = "mailto:" + user + "@" + domain;
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