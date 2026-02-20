<?php
$pageTitle = 'Survey | Quantum Motors';
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
    <p class="eyebrow">Step 2</p>
    <h1>Short survey to tailor your purchase</h1>
    <p class="lede">Reaching this page means you are a standout, serious client. Answer accurately so we confirm you're ready for a 10M+ EGP purchase and prepare a VIP experience.</p>
    <div class="intro-actions">
      <a class="btn ghost" href="register.php">&larr; Back to registration</a>
      <a class="btn primary" href="index.php#models">View models</a>
    </div>
  </section>

  <section class="section-shell form-layout">
    <form class="form-card" id="survey-form" novalidate>
      <div>
        <p class="eyebrow">Survey</p>
        <h3>Usage & delivery preferences</h3>
        <p class="muted">Answer a few quick questions so our advisors can tailor the offer.</p>
      </div>
      <div class="field-grid">
        <div class="field">
          <label for="decision-maker">Decision authority</label>
          <div class="option-chips">
            <label class="option-chip"><input type="radio" name="decision-maker" value="Final decision maker / owner" required> Owner / final decision maker</label>
            <label class="option-chip"><input type="radio" name="decision-maker" value="Board-level approver"> Board-level approver</label>
            <label class="option-chip"><input type="radio" name="decision-maker" value="Advisor only"> Advisor / not final</label>
          </div>
        </div>
        <div class="field">
          <label for="timeline">Purchase timeline</label>
          <select id="timeline" name="timeline" class="input-control" required>
            <option value="" disabled selected>Select timeline</option>
            <option value="Immediate (0-30 days)">Immediate (0-30 days)</option>
            <option value="Soon (1-3 months)">Soon (1-3 months)</option>
            <option value="This year (3-6 months)">This year (3-6 months)</option>
            <option value="Exploring (6+ months)">Exploring (6+ months)</option>
          </select>
        </div>
        <div class="field">
          <label for="budget">Per-vehicle budget</label>
          <select id="budget" name="budget" class="input-control" required>
            <option value="" disabled selected>Select a range</option>
            <option value="Up to USD 150k">Up to USD 150k</option>
            <option value="USD 150k - 250k">USD 150k - 250k</option>
            <option value="USD 250k - 400k">USD 250k - 400k</option>
            <option value="Above USD 400k">Above USD 400k</option>
          </select>
        </div>
        <div class="field">
          <label for="units">How many vehicles are you securing?</label>
          <select id="units" name="units" class="input-control" required>
            <option value="" disabled selected>Select quantity</option>
            <option value="Flagship single vehicle (>=10M EGP)">1 flagship vehicle (>=10M EGP)</option>
            <option value="2-3 units or more">2-3 units</option>
            <option value="Fleet 5+ vehicles">Fleet 5+ vehicles</option>
            <option value="Just exploring ideas">Just exploring ideas</option>
          </select>
        </div>
        <div class="field">
          <label for="funding">Payment readiness</label>
          <select id="funding" name="funding" class="input-control" required>
            <option value="" disabled selected>Select readiness</option>
            <option value="Cash ready / liquid">Cash ready / liquid</option>
            <option value="Bank/finance approval secured">Bank/finance approval secured</option>
            <option value="Awaiting approval">Awaiting approval</option>
            <option value="Still exploring">Still exploring</option>
          </select>
        </div>
        <div class="field span-2">
          <label>Vehicle use cases</label>
          <div class="option-chips">
            <label class="option-chip"><input type="checkbox" name="use-case" value="Daily commute"> Daily commute</label>
            <label class="option-chip"><input type="checkbox" name="use-case" value="Business / executive"> Business / executive</label>
            <label class="option-chip"><input type="checkbox" name="use-case" value="Family / chauffeur"> Family / chauffeur</label>
            <label class="option-chip"><input type="checkbox" name="use-case" value="Performance / track"> Performance / track</label>
            <label class="option-chip"><input type="checkbox" name="use-case" value="Off-road / desert"> Off-road / desert</label>
          </div>
        </div>
        <div class="field span-2">
          <label>Services you need</label>
          <div class="option-chips">
            <label class="option-chip"><input type="checkbox" name="services" value="Test drive booking"> Test drive booking</label>
            <label class="option-chip"><input type="checkbox" name="services" value="Financing guidance"> Financing guidance</label>
            <label class="option-chip"><input type="checkbox" name="services" value="Insurance support"> Insurance support</label>
            <label class="option-chip"><input type="checkbox" name="services" value="Home/office charging install"> Home/office charging install</label>
            <label class="option-chip"><input type="checkbox" name="services" value="Fleet / corporate offer"> Fleet / corporate offer</label>
          </div>
        </div>
        <div class="field">
          <label for="delivery-city">Preferred delivery city</label>
          <input id="delivery-city" name="delivery-city" type="text" class="input-control" placeholder="City for delivery or collection" required>
        </div>
        <div class="field">
          <label for="contact-channel">Preferred contact channel</label>
          <select id="contact-channel" name="contact-channel" class="input-control" required>
            <option value="" disabled selected>Select a channel</option>
            <option value="Phone call">Phone call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
            <option value="In-person at Centre">In-person at Centre</option>
          </select>
        </div>
        <div class="field span-2">
          <label for="comments">Anything else we should know?</label>
          <textarea id="comments" name="comments" class="input-control" placeholder="Scheduling windows, special configurations, or driver requirements"></textarea>
        </div>
      </div>
      <div class="form-footer">
        <p class="muted">You need at least 80% aligned answers to continue to scheduling.</p>
        <button type="submit" class="btn primary">Submit survey</button>
      </div>
      <div id="survey-message" class="form-alert" hidden></div>
    </form>

    <aside class="info-card">
      <p class="eyebrow">After you submit</p>
      <h3>We prepare your offer</h3>
      <p class="muted">Your advisor will use these answers to tailor pricing, payment options, and delivery timing.</p>
      <ul>
        <li>We hold your preferred model slot while we confirm paperwork.</li>
        <li>We coordinate a test drive in your chosen city if requested.</li>
        <li>We share financing/lease pathways that match your timeline.</li>
      </ul>
      <p class="muted">Questions? <a class="text-link" href="mailto:hello@quantum-motors.example">Email our team</a>.</p>
    </aside>
  </section>
</main>

<?php include 'partials/footer.php'; ?>
