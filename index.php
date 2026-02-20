<?php
$pageTitle = 'Quantum Motors | Three Model Showcase';
include 'partials/header.php';
?>

<main>
  <section class="video-hero full" aria-label="Brand film">
    <div class="video-frame">
      <iframe
        id="hero-video"
        class="hero-video"
        src="https://www.youtube-nocookie.com/embed/jykAufMNHYY?autoplay=1&mute=1&controls=0&loop=1&playlist=jykAufMNHYY&modestbranding=1&rel=0&playsinline=1&showinfo=0&enablejsapi=1"
        title="Quantum Motors feature film"
        frameborder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
        aria-hidden="true">
      </iframe>
    </div>
    <div class="video-controls">
      <button class="nav-btn" id="video-prev" aria-label="Previous video">&#x2190;</button>
      <div class="dot-group" id="video-dots" aria-label="Select video"></div>
      <button class="nav-btn" id="video-next" aria-label="Next video">&#x2192;</button>
    </div>
  </section>

  <section class="model-range" id="models">
    <div class="section-shell">
      <div class="section-header">
        <p class="eyebrow">Model range</p>
        <div>
          <h2>Choose your Quantum Motors</h2>
          <p class="muted">Three icons crafted for drivers across the Middle East.</p>
        </div>
      </div>
      <div class="model-grid" id="model-grid"></div>
    </div>
  </section>

  <section class="tools" id="tools">
    <div class="section-shell">
      <div class="section-header">
        <p class="eyebrow">Shopping tools</p>
        <div>
          <h2>Bring it closer</h2>
          <p class="muted">Build, compare, or book a drive in just a few taps.</p>
        </div>
      </div>
      <div class="tool-grid">
        <article class="tool-card">
          <h3>Build & price</h3>
          <p>Create your perfect specification and preview it instantly.</p>
          <a href="#models" class="text-link">Start building</a>
        </article>
        <article class="tool-card">
          <h3>Book a test drive</h3>
          <p>Choose your preferred model and a nearby Quantum Motors Centre.</p>
          <a href="#stories" class="text-link">Schedule now</a>
        </article>
        <article class="tool-card">
          <h3>Compare models</h3>
          <p>Line up performance, range, and practicality side by side.</p>
          <a href="#models" class="text-link">Open comparison</a>
        </article>
        <article class="tool-card">
          <h3>Find a Centre</h3>
          <p>Locate the nearest Quantum Motors Centre across the Middle East.</p>
          <a href="#tools" class="text-link">View locations</a>
        </article>
      </div>
    </div>
  </section>

  <section class="story" id="stories">
    <div class="section-shell story-grid">
      <div class="story-media collage">
        <img src="Image/MAEXTRO%20S800/2.png" alt="MAEXTRO S800 front view">
        <img src="Image/YANGWANG%20U9/1.png" alt="YANGWANG U9 profile">
        <img src="Image/YANGWANG%20U8L/1.png" alt="YANGWANG U8L off-road stance">
      </div>
      <div class="story-copy">
        <p class="eyebrow">Quantum world</p>
        <h2>Three icons. One experience.</h2>
        <p class="lede">Discover MAEXTRO S800, YANGWANG U9, and YANGWANG U8L together -- grand touring, hypercar thrills, and luxury off-road confidence in one curated journey.</p>
        <div class="story-actions">
          <a class="btn primary" href="#models">View the line-up</a>
          <a class="btn ghost" href="register.php">Register for offers</a>
        </div>
      </div>
    </div>
  </section>
</main>

<?php include 'partials/footer.php'; ?>
