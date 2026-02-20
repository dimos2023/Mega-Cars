<?php
$pageTitle = 'Register | Quantum Motors';
$headerNav = [
  ['label' => 'About', 'href' => 'about.php'],
  ['label' => 'Models', 'href' => 'index.php#models'],
  ['label' => 'Shopping tools', 'href' => 'index.php#tools'],
  ['label' => 'Quantum world', 'href' => 'index.php#stories'],
];
$headerActions = [
  ['label' => 'Find a dealer', 'href' => 'index.php#tools', 'class' => 'pill-link'],
];

require_once __DIR__ . '/db.php';

$formData = [];
$errors = [];

function qm_old(array $data, string $key): string
{
    return htmlspecialchars($data[$key] ?? '', ENT_QUOTES, 'UTF-8');
}

function qm_selected(array $data, string $key, string $value): string
{
    return isset($data[$key]) && $data[$key] === $value ? 'selected' : '';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $formData = [
        'email' => trim($_POST['email'] ?? ''),
        'phone' => trim($_POST['phone'] ?? ''),
        'role' => trim($_POST['role'] ?? ''),
        'company' => trim($_POST['company'] ?? ''),
        'address' => trim($_POST['address'] ?? ''),
        'linkedin_url' => trim($_POST['linkedin_url'] ?? ''),
        'current_type' => trim($_POST['current-type'] ?? ''),
        'current_brand' => trim($_POST['current-brand'] ?? ''),
        'desired_model' => trim($_POST['desired-model'] ?? ''),
        'payment_method' => trim($_POST['payment-method'] ?? ''),
        'notes' => trim($_POST['notes'] ?? ''),
    ];

    if (!filter_var($formData['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Please enter a valid email address.';
    }

    // Basic LinkedIn URL validation: must be a valid URL on linkedin.com or a subdomain, and include a path.
    $linkedinUrl = $formData['linkedin_url'];
    $urlParts = parse_url($linkedinUrl);
    $host = $urlParts['host'] ?? '';
    $hostIsLinkedin = (bool) preg_match('/(^|\\.)linkedin\\.(com|cn)$/i', $host);
    $validLinkedin = $urlParts
        && isset($urlParts['scheme'], $urlParts['host'], $urlParts['path'])
        && in_array(strtolower($urlParts['scheme']), ['https', 'http'], true)
        && $hostIsLinkedin
        && trim($urlParts['path'], '/') !== '';
    if (!$validLinkedin) {
        $errors[] = 'Please provide a valid LinkedIn profile URL.';
    }

    $requiredKeys = [
        'phone',
        'role',
        'company',
        'address',
        'linkedin_url',
        'current_type',
        'current_brand',
        'desired_model',
        'payment_method',
    ];

    foreach ($requiredKeys as $key) {
        if ($formData[$key] === '') {
            $errors[] = 'All fields are required except the notes field.';
            break;
        }
    }

    if (!$errors) {
        try {
            $registrationId = qm_store_registration($formData);
            header('Location: survey.php?registration_id=' . urlencode($registrationId));
            exit;
        } catch (Throwable $e) {
            $errors[] = 'Could not save the registration to the database. Please try again or contact support.';
        }
    }
}

include 'partials/header.php';
?>

<main class="form-page">
  <section class="section-shell form-hero">
    <p class="eyebrow">Registration</p>
    <h1>Complete your Quantum Motors registration</h1>
    <p class="lede">Share your business details and preferred model. After submitting, you will move straight to a short survey to tailor your purchase experience.</p>
    <div class="intro-actions">
      <a class="btn ghost" href="index.php">Back to homepage</a>
      <a class="btn primary" href="index.php#models">View the line-up</a>
    </div>
  </section>

  <section class="section-shell form-layout">
    <form class="form-card" action="register.php" method="post">
      <?php if ($errors): ?>
        <div class="form-alert error">
          <ul>
            <?php foreach ($errors as $error): ?>
              <li><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></li>
            <?php endforeach; ?>
          </ul>
        </div>
      <?php endif; ?>
      <div>
        <p class="eyebrow">Step 1</p>
        <h3>Registration details</h3>
        <p class="muted">Add your contact, company info, and the Quantum Motors you want.</p>
      </div>
      <div class="field-grid">
        <div class="field">
          <label for="email">Email</label>
          <input id="email" name="email" type="email" class="input-control" placeholder="name@example.com" value="<?= qm_old($formData, 'email') ?>" required>
          <div id="email-error" class="form-alert error" hidden>Please use your company email (no Gmail, Outlook, Yahoo, etc.).</div>
        </div>
        <div class="field">
          <label for="phone">Phone number</label>
          <input id="phone" name="phone" type="tel" class="input-control" placeholder="+971 50 000 0000" value="<?= qm_old($formData, 'phone') ?>" required>
        </div>
        <div class="field">
          <label for="role">Job title</label>
          <input id="role" name="role" type="text" class="input-control" placeholder="Procurement manager" value="<?= qm_old($formData, 'role') ?>" required>
        </div>
        <div class="field">
          <label for="company">Company name</label>
          <input id="company" name="company" type="text" class="input-control" placeholder="Your company" value="<?= qm_old($formData, 'company') ?>" required>
        </div>
        <div class="field">
          <label for="linkedin_url">LinkedIn profile URL</label>
          <input id="linkedin_url" name="linkedin_url" type="url" class="input-control" placeholder="https://www.linkedin.com/in/your-profile" value="<?= qm_old($formData, 'linkedin_url') ?>" required>
        </div>
        <div class="field span-2">
          <label for="address">Detailed address</label>
          <textarea id="address" name="address" class="input-control" placeholder="Building, street, city, country" required><?= qm_old($formData, 'address') ?></textarea>
        </div>
        <div class="field">
          <label for="current-type">Current vehicle type</label>
          <select id="current-type" name="current-type" class="input-control" required>
            <option value="" disabled <?= !isset($formData['current_type']) || $formData['current_type'] === '' ? 'selected' : '' ?>>Select a type</option>
            <option value="Sedan" <?= qm_selected($formData, 'current_type', 'Sedan') ?>>Sedan</option>
            <option value="SUV" <?= qm_selected($formData, 'current_type', 'SUV') ?>>SUV</option>
            <option value="Coupe / Hypercar" <?= qm_selected($formData, 'current_type', 'Coupe / Hypercar') ?>>Coupe / Hypercar</option>
            <option value="Luxury MPV / Van" <?= qm_selected($formData, 'current_type', 'Luxury MPV / Van') ?>>Luxury MPV / Van</option>
            <option value="Fleet / Commercial" <?= qm_selected($formData, 'current_type', 'Fleet / Commercial') ?>>Fleet / Commercial</option>
          </select>
        </div>
        <div class="field">
          <label for="current-brand">Current vehicle brand</label>
          <select id="current-brand" name="current-brand" class="input-control" required>
            <option value="" disabled <?= !isset($formData['current_brand']) || $formData['current_brand'] === '' ? 'selected' : '' ?>>Select a brand</option>
            <option value="Mercedes-Benz" <?= qm_selected($formData, 'current_brand', 'Mercedes-Benz') ?>>Mercedes-Benz</option>
            <option value="BMW" <?= qm_selected($formData, 'current_brand', 'BMW') ?>>BMW</option>
            <option value="Audi" <?= qm_selected($formData, 'current_brand', 'Audi') ?>>Audi</option>
            <option value="Porsche" <?= qm_selected($formData, 'current_brand', 'Porsche') ?>>Porsche</option>
            <option value="Range Rover" <?= qm_selected($formData, 'current_brand', 'Range Rover') ?>>Range Rover</option>
            <option value="Lexus" <?= qm_selected($formData, 'current_brand', 'Lexus') ?>>Lexus</option>
            <option value="Other" <?= qm_selected($formData, 'current_brand', 'Other') ?>>Other</option>
          </select>
        </div>
        <div class="field">
          <label for="desired-model">Desired Quantum Motors model</label>
          <select id="desired-model" name="desired-model" class="input-control" required>
            <option value="" disabled <?= !isset($formData['desired_model']) || $formData['desired_model'] === '' ? 'selected' : '' ?>>Select a model</option>
            <option value="MAEXTRO S800" <?= qm_selected($formData, 'desired_model', 'MAEXTRO S800') ?>>MAEXTRO S800</option>
            <option value="YANGWANG U9" <?= qm_selected($formData, 'desired_model', 'YANGWANG U9') ?>>YANGWANG U9</option>
            <option value="YANGWANG U8L" <?= qm_selected($formData, 'desired_model', 'YANGWANG U8L') ?>>YANGWANG U8L</option>
          </select>
        </div>
        <div class="field">
          <label for="payment-method">Preferred payment method</label>
          <select id="payment-method" name="payment-method" class="input-control" required>
            <option value="" disabled <?= !isset($formData['payment_method']) || $formData['payment_method'] === '' ? 'selected' : '' ?>>Select a method</option>
            <option value="Cash" <?= qm_selected($formData, 'payment_method', 'Cash') ?>>Cash</option>
            <option value="Bank finance" <?= qm_selected($formData, 'payment_method', 'Bank finance') ?>>Bank finance</option>
            <option value="Lease / subscription" <?= qm_selected($formData, 'payment_method', 'Lease / subscription') ?>>Lease / subscription</option>
            <option value="Corporate fleet programme" <?= qm_selected($formData, 'payment_method', 'Corporate fleet programme') ?>>Corporate fleet programme</option>
            <option value="Installments with partner" <?= qm_selected($formData, 'payment_method', 'Installments with partner') ?>>Installments with partner</option>
          </select>
        </div>
        <div class="field span-2">
          <label for="notes">Notes for your advisor (optional)</label>
          <textarea id="notes" name="notes" class="input-control" placeholder="Any timing, delivery, or configuration notes"><?= qm_old($formData, 'notes') ?></textarea>
        </div>
      </div>
      <div class="form-footer">
        <p class="muted">Submit to move to the quick survey.</p>
        <button type="submit" class="btn primary">Register & continue</button>
      </div>
    </form>

    <aside class="info-card">
      <p class="eyebrow">What to expect</p>
      <h3>Concierge follow-up</h3>
      <p class="muted">Our team will align the right payment path and delivery slot after your registration and survey.</p>
      <ul>
        <li>Dedicated advisor for your company or personal purchase.</li>
        <li>Priority booking for MAEXTRO S800, YANGWANG U9, or YANGWANG U8L.</li>
        <li>Financing partners, fleet offers, and test drive scheduling.</li>
      </ul>
      <p class="muted">Need help now? <a class="text-link" href="mailto:hello@quantum-motors.example">Email our team</a>.</p>
    </aside>
  </section>
</main>

<?php include 'partials/footer.php'; ?>
