<?php
$pageTitle = 'Schedule Meeting | Quantum Motors';
$headerNav = [
  ['label' => 'About', 'href' => 'about.php'],
  ['label' => 'Models', 'href' => 'index.php#models'],
  ['label' => 'Shopping tools', 'href' => 'index.php#tools'],
  ['label' => 'Quantum world', 'href' => 'index.php#stories'],
];
$headerActions = [
  ['label' => 'Find a dealer', 'href' => 'index.php#tools', 'class' => 'pill-link'],
];
include 'partials/header.php';
?>

<main class="form-page">
  <section class="section-shell form-hero">
    <p class="eyebrow">Step 3</p>
    <h1>Pick your meeting slot</h1>
    <p class="lede">Choose how you want to meet: at our Centre, at your company, or virtually. We'll bring the right executive team for your investment level.</p>
    <div class="intro-actions">
      <a class="btn ghost" href="survey.php">&larr; Back to survey</a>
      <a class="btn primary" href="index.php#models">View models</a>
    </div>
  </section>

  <section class="section-shell form-layout">
    <form class="form-card" id="meeting-form">
      <div>
        <p class="eyebrow">Scheduling</p>
        <h3>Meeting preferences</h3>
        <p class="muted">Choose how and when you want to meet to finalize your Quantum Motors purchase.</p>
      </div>
      <div class="field-grid">
        <div class="field">
          <label>Meeting type</label>
          <div class="option-chips">
            <label class="option-chip"><input type="radio" name="meeting-type" value="Quantum Centre" required> At Quantum Centre</label>
            <label class="option-chip"><input type="radio" name="meeting-type" value="At your company"> At your company</label>
            <label class="option-chip"><input type="radio" name="meeting-type" value="Virtual"> Virtual (video)</label>
          </div>
        </div>
        <div class="field">
          <label for="meeting-city">City / location</label>
          <input id="meeting-city" name="meeting-city" type="text" class="input-control" placeholder="City or company site" required>
        </div>
        <div class="field">
          <label for="meeting-date">Preferred date</label>
          <input id="meeting-date" name="meeting-date" type="date" class="input-control" required>
        </div>
        <div class="field">
          <label for="meeting-time">Preferred time</label>
          <input id="meeting-time" name="meeting-time" type="time" class="input-control" required>
        </div>
        <div class="field">
          <label for="attendees">Attendees</label>
          <input id="attendees" name="attendees" type="text" class="input-control" placeholder="e.g., CEO + CFO + Fleet lead" required>
        </div>
        <div class="field">
          <label for="contact-channel">Contact channel to confirm</label>
          <select id="contact-channel" name="contact-channel" class="input-control" required>
            <option value="" disabled selected>Select a channel</option>
            <option value="Phone call">Phone call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
          </select>
        </div>
        <div class="field span-2">
          <label for="meeting-notes">On-site details (if at your company)</label>
          <textarea id="meeting-notes" name="meeting-notes" class="input-control" placeholder="Gate pass, parking, required safety gear, meeting room details"></textarea>
        </div>
      </div>
      <div class="form-footer">
        <p class="muted">We'll confirm your requested slot within business hours.</p>
        <button type="submit" class="btn primary">Confirm meeting</button>
      </div>
      <div id="meeting-message" class="form-alert" hidden></div>
    </form>

    <aside class="info-card">
      <p class="eyebrow">What we prepare</p>
      <h3>Executive session</h3>
      <p class="muted">Spec sheets, payment pathways, and delivery dates for MAEXTRO S800, YANGWANG U9, or YANGWANG U8L.</p>
      <ul>
        <li>Test-drive scheduling where available.</li>
        <li>Finance / lease options aligned to your timeline.</li>
        <li>Fleet and VIP delivery services for high-value orders.</li>
      </ul>
    </aside>
  </section>
</main>

<?php include 'partials/footer.php'; ?>
