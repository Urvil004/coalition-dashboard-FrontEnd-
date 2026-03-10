<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tech.Care Dashboard — README</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --dark: #072635;
    --teal: #01F0FF;
    --teal-dim: rgba(1,240,255,0.12);
    --teal-mid: rgba(1,240,255,0.35);
    --red: #E66253;
    --purple: #8C6FE6;
    --bg: #F6F7F8;
    --white: #ffffff;
    --mono: 'Space Mono', monospace;
    --sans: 'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--dark);
    color: var(--white);
    font-family: var(--sans);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── GRID NOISE OVERLAY ── */
  body::before {
    content: '';
    position: fixed; inset: 0;
    background-image:
      linear-gradient(rgba(1,240,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(1,240,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    padding: 80px 60px 60px;
    overflow: hidden;
    border-bottom: 1px solid rgba(1,240,255,0.15);
  }

  .hero::after {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(1,240,255,0.18) 0%, transparent 65%);
    border-radius: 50%;
    pointer-events: none;
  }

  .hero-label {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 18px;
    opacity: 0;
    animation: fadeUp 0.6s ease forwards 0.1s;
  }

  .hero h1 {
    font-family: var(--mono);
    font-size: clamp(36px, 6vw, 72px);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -2px;
    margin-bottom: 12px;
    opacity: 0;
    animation: fadeUp 0.6s ease forwards 0.2s;
  }

  .hero h1 span { color: var(--teal); }

  .hero-sub {
    font-size: 16px;
    font-weight: 300;
    color: rgba(255,255,255,0.6);
    max-width: 560px;
    line-height: 1.65;
    margin-bottom: 36px;
    opacity: 0;
    animation: fadeUp 0.6s ease forwards 0.35s;
  }

  .badges {
    display: flex; gap: 10px; flex-wrap: wrap;
    opacity: 0;
    animation: fadeUp 0.6s ease forwards 0.5s;
  }

  .badge {
    font-family: var(--mono);
    font-size: 11px;
    padding: 6px 14px;
    border-radius: 4px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
  .badge-teal  { background: var(--teal-dim); color: var(--teal); border: 1px solid var(--teal-mid); }
  .badge-red   { background: rgba(230,98,83,0.12); color: var(--red); border: 1px solid rgba(230,98,83,0.3); }
  .badge-purple{ background: rgba(140,111,230,0.12); color: var(--purple); border: 1px solid rgba(140,111,230,0.3); }

  /* ── MAIN CONTENT ── */
  .content {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 60px 60px 100px;
    display: grid;
    gap: 60px;
  }

  /* ── SECTION HEADER ── */
  .sec-label {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .sec-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(1,240,255,0.3), transparent);
  }

  .sec-title {
    font-family: var(--mono);
    font-size: clamp(18px, 2.5vw, 26px);
    font-weight: 700;
    letter-spacing: -0.5px;
    margin-bottom: 28px;
    color: var(--white);
  }

  /* ── FEATURES GRID ── */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2px;
    border: 1px solid rgba(1,240,255,0.1);
    border-radius: 12px;
    overflow: hidden;
  }

  .feat-card {
    background: rgba(255,255,255,0.02);
    padding: 28px;
    transition: background 0.25s;
    position: relative;
  }
  .feat-card:hover { background: rgba(1,240,255,0.05); }
  .feat-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 1px;
    background: rgba(1,240,255,0.08);
  }

  .feat-icon {
    font-size: 24px;
    margin-bottom: 14px;
    display: block;
  }
  .feat-title {
    font-family: var(--mono);
    font-size: 13px;
    font-weight: 700;
    color: var(--teal);
    margin-bottom: 8px;
    letter-spacing: 0.3px;
  }
  .feat-desc {
    font-size: 13.5px;
    color: rgba(255,255,255,0.55);
    line-height: 1.6;
    font-weight: 300;
  }

  /* ── TECH STACK ── */
  .stack-row {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
  }

  .stack-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 18px;
    border: 1px solid rgba(1,240,255,0.1);
    border-radius: 8px;
    background: rgba(255,255,255,0.02);
    transition: border-color 0.25s, background 0.25s;
  }
  .stack-item:hover {
    border-color: rgba(1,240,255,0.35);
    background: rgba(1,240,255,0.05);
  }
  .stack-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .dot-teal   { background: var(--teal); box-shadow: 0 0 8px var(--teal); }
  .dot-red    { background: var(--red);  box-shadow: 0 0 8px var(--red); }
  .dot-purple { background: var(--purple); box-shadow: 0 0 8px var(--purple); }
  .dot-white  { background: rgba(255,255,255,0.6); }

  .stack-text {
    font-family: var(--mono);
    font-size: 12px;
    color: rgba(255,255,255,0.75);
    font-weight: 400;
  }

  /* ── CODE BLOCK ── */
  .code-block {
    background: #04131d;
    border: 1px solid rgba(1,240,255,0.15);
    border-radius: 10px;
    overflow: hidden;
  }
  .code-topbar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 18px;
    background: rgba(1,240,255,0.04);
    border-bottom: 1px solid rgba(1,240,255,0.1);
  }
  .code-dot { width: 10px; height: 10px; border-radius: 50%; }
  .cd-red    { background: #FF5F57; }
  .cd-yellow { background: #FEBC2E; }
  .cd-green  { background: #28C840; }
  .code-filename {
    font-family: var(--mono);
    font-size: 11px;
    color: rgba(1,240,255,0.5);
    margin-left: 8px;
  }
  .code-body {
    padding: 24px 28px;
    font-family: var(--mono);
    font-size: 13px;
    line-height: 2;
    color: rgba(255,255,255,0.75);
  }
  .code-body .c-teal   { color: var(--teal); }
  .code-body .c-red    { color: var(--red); }
  .code-body .c-purple { color: var(--purple); }
  .code-body .c-dim    { color: rgba(255,255,255,0.3); }
  .code-body .c-green  { color: #4EC994; }

  /* ── PROJECT STRUCTURE ── */
  .tree {
    font-family: var(--mono);
    font-size: 13px;
    line-height: 2.1;
    color: rgba(255,255,255,0.65);
  }
  .tree .dir  { color: var(--teal); }
  .tree .file { color: rgba(255,255,255,0.55); }
  .tree .note { color: rgba(255,255,255,0.3); font-style: italic; }

  /* ── RESPONSIVE TABLE ── */
  .resp-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--mono);
    font-size: 13px;
  }
  .resp-table th {
    text-align: left;
    padding: 14px 20px;
    background: rgba(1,240,255,0.07);
    color: var(--teal);
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border-bottom: 1px solid rgba(1,240,255,0.15);
  }
  .resp-table td {
    padding: 13px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    color: rgba(255,255,255,0.65);
    vertical-align: middle;
  }
  .resp-table tr:last-child td { border-bottom: none; }
  .resp-table tr:hover td { background: rgba(1,240,255,0.03); }
  .screen-badge {
    font-family: var(--mono);
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 3px;
    background: var(--teal-dim);
    color: var(--teal);
    border: 1px solid var(--teal-mid);
    white-space: nowrap;
  }

  /* ── COLOR SWATCHES ── */
  .palette {
    display: flex;
    gap: 0;
    border-radius: 10px;
    overflow: hidden;
    height: 72px;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .swatch {
    flex: 1;
    display: flex;
    align-items: flex-end;
    padding: 10px 14px;
    position: relative;
  }
  .swatch-label {
    font-family: var(--mono);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.5px;
    opacity: 0;
    transform: translateY(4px);
    transition: all 0.2s;
  }
  .swatch:hover .swatch-label { opacity: 1; transform: none; }

  /* ── API INFO ── */
  .api-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    border: 1px solid rgba(1,240,255,0.1);
    border-radius: 10px;
    overflow: hidden;
  }
  .api-item {
    padding: 22px 28px;
    background: rgba(255,255,255,0.02);
  }
  .api-item-label {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 8px;
  }
  .api-item-val {
    font-size: 14px;
    color: rgba(255,255,255,0.85);
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .pill-green {
    display: inline-block;
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #4EC994;
    box-shadow: 0 0 8px #4EC994;
    flex-shrink: 0;
  }

  /* ── FOOTER ── */
  .footer {
    border-top: 1px solid rgba(1,240,255,0.1);
    padding: 40px 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    position: relative;
    z-index: 1;
  }
  .footer-left {
    font-family: var(--mono);
    font-size: 12px;
    color: rgba(255,255,255,0.3);
    line-height: 1.8;
  }
  .footer-left strong { color: rgba(255,255,255,0.6); }
  .footer-links {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .footer-link {
    font-family: var(--mono);
    font-size: 11px;
    padding: 7px 16px;
    border: 1px solid rgba(1,240,255,0.2);
    border-radius: 4px;
    color: var(--teal);
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s;
    cursor: default;
  }
  .footer-link:hover { background: var(--teal-dim); border-color: var(--teal-mid); }

  /* ── DIVIDER ── */
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(1,240,255,0.2), transparent);
    margin: 0;
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .reveal {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .reveal.visible { opacity: 1; transform: none; }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--dark); }
  ::-webkit-scrollbar-thumb { background: rgba(1,240,255,0.25); border-radius: 3px; }
</style>
</head>
<body>

<!-- ═══════════════ HERO ═══════════════ -->
<div class="hero">
  <p class="hero-label">// README.md &nbsp;·&nbsp; Coalition Technologies Skills Assessment</p>
  <h1>Tech<span>.</span>Care <span>🏥</span></h1>
  <p class="hero-sub">Modern, responsive patient management dashboard with real-time blood pressure charts, diagnosis history tracking, and live API integration.</p>
  <div class="badges">
    <span class="badge badge-teal">HTML5 · CSS3 · Vanilla JS</span>
    <span class="badge badge-teal">Chart.js v4.4.1</span>
    <span class="badge badge-red">Live API</span>
    <span class="badge badge-purple">Fully Responsive</span>
    <span class="badge badge-teal">Zero Frameworks</span>
  </div>
</div>

<!-- ═══════════════ MAIN CONTENT ═══════════════ -->
<div class="content">

  <!-- FEATURES -->
  <section class="reveal">
    <p class="sec-label">01 &nbsp; Features</p>
    <h2 class="sec-title">What's Inside</h2>
    <div class="features-grid">
      <div class="feat-card">
        <span class="feat-icon">📊</span>
        <div class="feat-title">Real-time Blood Pressure Charts</div>
        <div class="feat-desc">Interactive Chart.js line charts with systolic/diastolic data over the last 6 months.</div>
      </div>
      <div class="feat-card">
        <span class="feat-icon">👥</span>
        <div class="feat-title">Patient Management</div>
        <div class="feat-desc">Dynamic patient list with one-click profile switching and live data reload.</div>
      </div>
      <div class="feat-card">
        <span class="feat-icon">📈</span>
        <div class="feat-title">Diagnosis History</div>
        <div class="feat-desc">Comprehensive table with color-coded status indicators for each diagnosis entry.</div>
      </div>
      <div class="feat-card">
        <span class="feat-icon">👤</span>
        <div class="feat-title">Detailed Patient Profiles</div>
        <div class="feat-desc">DOB, gender, emergency contacts, and insurance information all in one view.</div>
      </div>
      <div class="feat-card">
        <span class="feat-icon">🧪</span>
        <div class="feat-title">Lab Results</div>
        <div class="feat-desc">Downloadable lab result listings with clean, scannable layout.</div>
      </div>
      <div class="feat-card">
        <span class="feat-icon">📱</span>
        <div class="feat-title">Fully Responsive</div>
        <div class="feat-desc">Desktop, tablet, and mobile optimized with a mobile-first CSS approach.</div>
      </div>
      <div class="feat-card">
        <span class="feat-icon">🔗</span>
        <div class="feat-title">Live API Integration</div>
        <div class="feat-desc">Real patient data streamed from the Coalition Technologies REST API with Basic Auth.</div>
      </div>
      <div class="feat-card">
        <span class="feat-icon">🎨</span>
        <div class="feat-title">Modern UI</div>
        <div class="feat-desc">Horizontal navigation, glassmorphism accents, Manrope font, and smooth animations.</div>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- TECH STACK -->
  <section class="reveal">
    <p class="sec-label">02 &nbsp; Tech Stack</p>
    <h2 class="sec-title">Built With</h2>
    <div class="stack-row">
      <div class="stack-item"><span class="stack-dot dot-teal"></span><span class="stack-text">HTML5</span></div>
      <div class="stack-item"><span class="stack-dot dot-teal"></span><span class="stack-text">CSS3 · Grid / Flexbox</span></div>
      <div class="stack-item"><span class="stack-dot dot-teal"></span><span class="stack-text">Vanilla JavaScript</span></div>
      <div class="stack-item"><span class="stack-dot dot-red"></span><span class="stack-text">Chart.js v4.4.1</span></div>
      <div class="stack-item"><span class="stack-dot dot-purple"></span><span class="stack-text">REST API · Basic Auth</span></div>
      <div class="stack-item"><span class="stack-dot dot-white"></span><span class="stack-text">Manrope Font</span></div>
      <div class="stack-item"><span class="stack-dot dot-white"></span><span class="stack-text">Custom SVG Icons</span></div>
      <div class="stack-item"><span class="stack-dot dot-teal"></span><span class="stack-text">Mobile-first CSS</span></div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- PROJECT STRUCTURE -->
  <section class="reveal">
    <p class="sec-label">03 &nbsp; Project Structure</p>
    <h2 class="sec-title">File Layout</h2>
    <div class="code-block">
      <div class="code-topbar">
        <div class="code-dot cd-red"></div>
        <div class="code-dot cd-yellow"></div>
        <div class="code-dot cd-green"></div>
        <span class="code-filename">tech-care-dashboard/</span>
      </div>
      <div class="code-body">
        <div class="tree">
          <div><span class="c-teal">tech-care-dashboard/</span></div>
          <div>&nbsp;├── <span class="c-teal dir">index.html</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="note"># Main dashboard layout</span></div>
          <div>&nbsp;├── <span class="c-purple dir">styles.css</span> &nbsp;&nbsp;&nbsp;&nbsp;<span class="note"># Responsive styling &amp; animations</span></div>
          <div>&nbsp;├── <span class="c-red dir">app.js</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="note"># API integration &amp; dynamic data</span></div>
          <div>&nbsp;└── <span class="file">README.md</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="note"># You're reading it! 📖</span></div>
        </div>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- QUICK SETUP -->
  <section class="reveal">
    <p class="sec-label">04 &nbsp; Quick Setup</p>
    <h2 class="sec-title">Get Running in 60 Seconds</h2>
    <div class="code-block">
      <div class="code-topbar">
        <div class="code-dot cd-red"></div>
        <div class="code-dot cd-yellow"></div>
        <div class="code-dot cd-green"></div>
        <span class="code-filename">bash</span>
      </div>
      <div class="code-body">
        <div><span class="c-dim"># Clone the repository</span></div>
        <div><span class="c-teal">git clone</span> https://github.com/YOUR_USERNAME/tech-care-dashboard.git</div>
        <div><span class="c-teal">cd</span> tech-care-dashboard</div>
        <br>
        <div><span class="c-dim"># Open in browser</span></div>
        <div><span class="c-teal">open</span> index.html</div>
        <div><span class="c-dim"># OR with live server</span></div>
        <div><span class="c-teal">live-server</span> <span class="c-purple">.</span></div>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- API INTEGRATION -->
  <section class="reveal">
    <p class="sec-label">05 &nbsp; API Integration</p>
    <h2 class="sec-title">Live Data Source</h2>
    <div class="api-grid">
      <div class="api-item">
        <div class="api-item-label">Data Source</div>
        <div class="api-item-val"><span class="pill-green"></span>Coalition Technologies Test API</div>
      </div>
      <div class="api-item">
        <div class="api-item-label">Authentication</div>
        <div class="api-item-val"><span class="pill-green"></span>Basic Auth · coalition:skills-test</div>
      </div>
      <div class="api-item">
        <div class="api-item-label">Endpoints</div>
        <div class="api-item-val"><span class="pill-green"></span>Patient data, diagnosis history, lab results</div>
      </div>
      <div class="api-item">
        <div class="api-item-label">Error Handling</div>
        <div class="api-item-val"><span class="pill-green"></span>Fallback UI for network failures</div>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- RESPONSIVE BREAKPOINTS -->
  <section class="reveal">
    <p class="sec-label">06 &nbsp; Responsive Breakpoints</p>
    <h2 class="sec-title">Screen Size Support</h2>
    <div class="code-block">
      <div class="code-topbar">
        <div class="code-dot cd-red"></div>
        <div class="code-dot cd-yellow"></div>
        <div class="code-dot cd-green"></div>
        <span class="code-filename">breakpoints</span>
      </div>
      <table class="resp-table" style="width:100%;">
        <thead>
          <tr>
            <th>Screen Size</th>
            <th>Layout</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><span class="screen-badge">1920px+</span></td><td>3-column grid</td></tr>
          <tr><td><span class="screen-badge">1400px</span></td><td>Optimized 3-column</td></tr>
          <tr><td><span class="screen-badge">1200px</span></td><td>2-column + hidden nav</td></tr>
          <tr><td><span class="screen-badge">992px</span></td><td>Single column</td></tr>
          <tr><td><span class="screen-badge">768px</span></td><td>Mobile optimized</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <div class="divider"></div>

  <!-- DESIGN SYSTEM -->
  <section class="reveal">
    <p class="sec-label">07 &nbsp; Design System</p>
    <h2 class="sec-title">Color Palette</h2>
    <div class="palette">
      <div class="swatch" style="background:#072635;"><span class="swatch-label" style="color:rgba(255,255,255,0.7);">#072635<br>Dark Blue</span></div>
      <div class="swatch" style="background:#01F0FF;"><span class="swatch-label" style="color:#072635;">#01F0FF<br>Teal</span></div>
      <div class="swatch" style="background:#E66253;"><span class="swatch-label" style="color:#fff;">#E66253<br>Systolic</span></div>
      <div class="swatch" style="background:#8C6FE6;"><span class="swatch-label" style="color:#fff;">#8C6FE6<br>Diastolic</span></div>
      <div class="swatch" style="background:#F6F7F8;"><span class="swatch-label" style="color:#072635;">#F6F7F8<br>Background</span></div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- DEV NOTES -->
  <section class="reveal">
    <p class="sec-label">08 &nbsp; Development Notes</p>
    <h2 class="sec-title">Under the Hood</h2>
    <div class="stack-row">
      <div class="stack-item"><span class="stack-dot dot-teal"></span><span class="stack-text">Zero Dependencies (Chart.js only)</span></div>
      <div class="stack-item"><span class="stack-dot dot-teal"></span><span class="stack-text">Vanilla JS — No frameworks</span></div>
      <div class="stack-item"><span class="stack-dot dot-teal"></span><span class="stack-text">CSS Grid / Flexbox layouts</span></div>
      <div class="stack-item"><span class="stack-dot dot-teal"></span><span class="stack-text">Custom SVG Icons</span></div>
      <div class="stack-item"><span class="stack-dot dot-purple"></span><span class="stack-text">Performance Optimized</span></div>
      <div class="stack-item"><span class="stack-dot dot-purple"></span><span class="stack-text">Semantic HTML + ARIA</span></div>
      <div class="stack-item"><span class="stack-dot dot-red"></span><span class="stack-text">Dual dataset BP Chart</span></div>
      <div class="stack-item"><span class="stack-dot dot-red"></span><span class="stack-text">Custom Chart.js Tooltips</span></div>
    </div>
  </section>

</div>

<!-- ═══════════════ FOOTER ═══════════════ -->
<div class="footer">
  <div class="footer-left">
    <strong>Urvil Patel</strong> — Full Stack Developer<br>
    Built for Coalition Technologies Skills Assessment<br>
    <span style="color:rgba(255,255,255,0.2);">urvil@techwithurvil.com</span>
  </div>
  <div class="footer-links">
    <a class="footer-link">LinkedIn</a>
    <a class="footer-link">Portfolio</a>
    <a class="footer-link">Live Demo</a>
    <a class="footer-link" style="color:rgba(255,255,255,0.4);border-color:rgba(255,255,255,0.08);">MIT License</a>
  </div>
</div>

<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
</script>

</body>
</html>
