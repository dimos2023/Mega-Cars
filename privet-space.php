<?php
$pageTitle = 'Private Space | Quantum Motors';
$headerNav = [
  ['label' => 'Home', 'href' => 'index.php'],
  ['label' => 'Models', 'href' => 'index.php#models'],
  ['label' => 'Shopping tools', 'href' => 'index.php#tools'],
  ['label' => 'Quantum world', 'href' => 'index.php#stories'],
];
$headerActions = [
  ['label' => 'Schedule', 'href' => 'meeting.php', 'class' => 'pill-link'],
];
$scripts = ['script.js', 'chatbot.js', 'privet-space.js'];
include 'partials/header.php';
?>

<main class="privet-page">
  <section class="section-shell privet-hero">
    <div>
      <p class="eyebrow">Private Space</p>
      <h1 id="privet-title">Your curated vehicle dossier</h1>
      <p class="lede" id="privet-lede">Deep-dive assets, specifications, and ownership reassurance tailored to your selected model.</p>
      <div class="privet-actions">
        <a class="btn primary" href="meeting.php">Confirm purchase path</a>
        <a class="btn ghost" href="register.php">Update registration</a>
      </div>
    </div>
    <div class="privet-meta" id="privet-meta"></div>
  </section>

  <section class="section-shell privet-layout">
    <div class="privet-gallery">
      <h3>Expanded gallery</h3>
      <div class="privet-grid" id="privet-grid"></div>
    </div>

    <aside class="privet-panel">
      <h3>Technical brief</h3>
      <ul id="privet-stats" class="privet-stats"></ul>
      <div class="privet-copy" id="privet-copy"></div>
      <div class="privet-links">
        <a class="text-link" id="privet-detail" href="#" target="_blank">Open detailed page &rarr;</a>
        <a class="text-link" href="testdrive.php" target="_blank">Open interactive 3D &rarr;</a>
      </div>
      <div class="privet-upload">
        <h4>Upload / view PDF dossier</h4>
        <p class="muted">Add spec sheets, contracts, or inspection reports (PDF only, local preview).</p>
        <input type="file" id="pdf-input" accept="application/pdf" multiple>
        <ul id="pdf-list" class="pdf-list"></ul>
      </div>
    </aside>
  </section>
</main>

<?php include 'partials/footer.php'; ?>
