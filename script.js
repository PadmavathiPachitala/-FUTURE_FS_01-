/* ── Intersection Observer: fade-in reveals ── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ── Skills: animate bars and radial arcs ── */
  const skillsObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.sb-fill').forEach(b => b.classList.add('on'));
      e.target.querySelectorAll('.arc').forEach(a => a.classList.add('on'));
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('#skills').forEach(el => skillsObs.observe(el));

  /* ── Hero: visible on load ── */
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('in'));
    }, 120);
  });

  /* ── Nav: shrink on scroll ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.style.padding = window.scrollY > 60
      ? (window.innerWidth > 980 ? '.7rem 4rem' : '.7rem 1.5rem')
      : (window.innerWidth > 980 ? '1.1rem 4rem' : '1rem 1.5rem');
    document.getElementById('btt').classList.toggle('show', window.scrollY > 500);
  }, { passive: true });

  /* ── Parallax watermark ── */
  document.addEventListener('mousemove', e => {
    const wm = document.getElementById('wm');
    if (!wm) return;
    const x = (e.clientX / window.innerWidth  - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 14;
    wm.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  });

  /* ── Mobile nav ── */
  function toggleNav() {
    const links  = document.getElementById('navLinks');
    const burger = document.getElementById('burger');
    const isOpen = links.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  }
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 980) {
        document.getElementById('navLinks').classList.remove('open');
        document.getElementById('burger').classList.remove('active');
        document.getElementById('burger').setAttribute('aria-expanded', false);
      }
    });
  });

  /* ── Contact form (client-side demo) ── */
  // To make this real: integrate EmailJS (free) — see instructions below
  document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('fsubmit');
    const msg = document.getElementById('fmsg');
    const form = this;

    // Basic validation
    const name    = form.querySelector('#cf-name').value.trim();
    const email   = form.querySelector('#cf-email').value.trim();
    const subject = form.querySelector('#cf-subject').value.trim();
    const message = form.querySelector('#cf-msg').value.trim();
    const type    = form.querySelector('#cf-type').value;

    if (!name || !email || !subject || !message || !type) {
      msg.className = 'fmsg err';
      msg.textContent = '✕ Please fill in all required fields.';
      return;
    }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email)) {
      msg.className = 'fmsg err';
      msg.textContent = '✕ Please enter a valid email address.';
      return;
    }

    btn.textContent = 'Sending…';
    btn.disabled = true;
    msg.className = 'fmsg';

    // ─── OPTION A: EmailJS (recommended — free tier) ─────────────
    // 1. Sign up at emailjs.com
    // 2. Create a service + template
    // 3. Uncomment the block below and fill in your IDs:
    /*
    try {
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name:    name,
        from_email:   email,
        enquiry_type: type,
        subject:      subject,
        message:      message,
      }, 'YOUR_PUBLIC_KEY');
      msg.className = 'fmsg ok';
      msg.textContent = '✓ Message sent! I\'ll reply within 24 hours.';
      form.reset();
    } catch(err) {
      msg.className = 'fmsg err';
      msg.textContent = '✕ Something went wrong. Try emailing directly.';
    }
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    return;
    */
    // ─── OPTION B: Your own Node.js backend ──────────────────────
    // POST to /api/contact with { name, email, type, subject, message }
    // ─────────────────────────────────────────────────────────────

    // Demo simulation (remove when using real integration above)
    await new Promise(r => setTimeout(r, 1400));
    msg.className = 'fmsg ok';
    msg.textContent = '✓ Message received! I\'ll get back to you within 24 hours.';
    btn.textContent = 'Sent ✓';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      msg.className = 'fmsg';
    }, 6000);
  });

  /* ── Active nav link highlight on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navAs.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--ink)' : '';
    });
  }, { passive: true });