const fs = require('fs');
const path = require('path');

const dir = __dirname;
const cssFile = path.join(dir, 'website/styles.css');

const cssToAdd = `
/* --- Mobile Override Rules from Overhaul --- */
html, body {
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

/* User Auth Chip */
.nav-user-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: rgba(59,130,246,.08);
  border: 1px solid rgba(59,130,246,.2);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #3B82F6;
}

@media (max-width: 768px) {
  /* NAVBAR */
  .nav-logo { font-size: 1.2rem; }
  .navbar, .navbar.scrolled {
    background: #0a0a0a !important; /* fully opaque */
  }
  .nav-links { padding-top: 20px; }
  .nav-link { 
    width: 100%; 
    min-height: 48px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
  }

  /* HERO */
  .hero-title { font-size: clamp(2rem, 8vw, 5rem); }
  .hero-controller svg {
    max-width: 280px !important;
    margin: 0 auto;
    display: block;
  }
  .hero-cta {
    width: 100%;
    min-height: 52px;
    justify-content: center;
    border-radius: 0;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 18px 20px;
  }
  .rotating-banner { font-size: 11px; }

  /* BOOKING SECTION */
  .booking-wrapper { flex-direction: column; }
  .form-step { padding: 16px; }
  .player-count-grid { grid-template-columns: 1fr 1fr; }
  .form-row { flex-direction: column; }
  .booking-summary {
    width: 100%;
    position: sticky;
    bottom: 0;
    box-shadow: 0 -4px 10px rgba(0,0,0,0.5);
    z-index: 100;
  }
  input, select, textarea { min-height: 48px; font-size: 16px; }
  button { min-height: 52px; font-size: 15px; }

  /* LOGIN PAGE */
  .login-card { width: 100%; padding: 16px; }
  .login-tabs { flex-direction: row; }
  .login-tab { flex: 1; min-height: 48px;}
  .login-input { min-height: 50px; font-size: 16px; }
  .login-btn { width: 100%; min-height: 52px; }

  /* PAYMENT PAGE */
  .payment-container { width: 100%; padding: 16px; }
  .upi-app-btn { width: 100%; min-height: 52px; }
  .btn-pay { width: 100%; min-height: 56px; font-size: 16px; }

  /* SESSION PAGE */
  .countdown { font-size: clamp(2.5rem, 12vw, 4rem); }
  .session-card { width: 100%; padding: 20px; }
  .lookup-input { width: 100%; }

  /* ADMIN DASHBOARD */
  .admin-stats-grid { grid-template-columns: 1fr; }
  .admin-tabs {
    overflow-x: auto;
    white-space: nowrap;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
  }
  .admin-table-wrapper { overflow-x: auto; }
  .admin-table { min-width: 800px; }
  .admin-filters { flex-direction: column; }
  .admin-table button .btn-text { display: none; }

  /* FEEDBACK PAGE */
  .feedback-card { width: 100%; padding: 20px; }
  .star-rating svg { width: 48px; height: 48px; }
  .btn-submit { width: 100%; }
}

@media (max-width: 400px) {
  .service-select-grid { grid-template-columns: 1fr; }
}

/* GLOBAL MOBILE RULES */
* { min-height: auto; }
button, input[type="text"], input[type="number"], input[type="email"], input[type="tel"], select {
  min-height: 44px;
}
`;

fs.appendFileSync(cssFile, cssToAdd);
console.log('Appended CSS overides.');

const htmlFiles = [
  'website/index.html',
  'website/admin.html',
  'website/payment.html',
  'website/session.html',
  'website/feedback.html'
];

const metaTags = \`
    <meta name="theme-color" content="#0a0a0a">
    <meta name="apple-mobile-web-app-capable" content="yes">\`;

for (const relPath of htmlFiles) {
  const fullPath = path.join(dir, relPath);
  if (!fs.existsSync(fullPath)) continue;
  let content = fs.readFileSync(fullPath, 'utf8');
  if (!content.includes('theme-color')) {
    content = content.replace('</head>', \`\${metaTags}
</head>\`);
    fs.writeFileSync(fullPath, content, 'utf8');
  }
}
console.log('Added meta tags to HTML files.');
