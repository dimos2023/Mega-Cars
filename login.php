<?php
session_start();
$pageTitle = 'Sign in | Quantum Motors';
$bodyClass = 'login-body';
$headerNav = [
  ['label' => 'Models', 'href' => 'index.php#models'],
  ['label' => 'Shopping tools', 'href' => 'index.php#tools'],
  ['label' => 'Quantum world', 'href' => 'index.php#stories'],
];
$headerActions = [
  ['label' => 'Home', 'href' => 'index.php', 'class' => 'pill-link'],
  ['label' => 'Register', 'href' => 'register.php', 'class' => 'pill-link'],
];

$captchaA = random_int(1, 9);
$captchaB = random_int(1, 9);
$captchaQuestion = "{$captchaA} + {$captchaB}";
$captchaAnswer = $captchaA + $captchaB;
include 'partials/header.php';
?>

<main class="login-hero">
  <div class="login-grid">
    <div>
      <p class="eyebrow">Member access</p>
      <h1>Enter your Private Space</h1>
      <p class="login-meta">Secure gateway to your tailored dossiers, interactive 3D views, and post-purchase concierge.</p>
    </div>
    <div class="login-card" id="login-card">
      <form
        id="login-form"
        class="form-card"
        data-captcha-answer="<?= $captchaAnswer ?>"
        style="background: transparent; border: none; box-shadow: none; padding: 0;"
      >
        <div class="field-grid">
          <div class="field">
            <label for="login-email">Email</label>
            <input id="login-email" name="email" type="email" class="input-control" required>
          </div>
          <div class="field">
            <label for="login-password">Password</label>
            <input id="login-password" name="password" type="password" class="input-control" required>
          </div>
          <div class="field" style="grid-column: 1 / -1;">
            <label for="login-captcha">Human verification</label>
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
              <span class="badge" style="background: rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.14);">
                Solve: <?= htmlspecialchars($captchaQuestion) ?>
              </span>
            </div>
            <input id="login-captcha" name="captcha" type="number" inputmode="numeric" class="input-control" placeholder="Your answer" required>
            <div id="captcha-error" class="form-alert error" hidden>Incorrect CAPTCHA. Please solve the sum.</div>
          </div>
        </div>
        <div class="form-footer" style="padding: 0; margin-top: 14px;">
          <p class="muted" id="login-status">Enter your email and password to continue.</p>
          <button type="submit" class="btn primary" style="width: 100%;">Sign in</button>
        </div>
      </form>
    </div>
    <p class="login-footer">Hover to tilt - Secure session - Redirects to your Private Space</p>
  </div>
</main>

<?php include 'partials/footer.php'; ?>

<script>
  (() => {
    const form = document.getElementById('login-form');
    const emailEl = document.getElementById('login-email');
    const passEl = document.getElementById('login-password');
    const captchaEl = document.getElementById('login-captcha');
    const captchaErrorEl = document.getElementById('captcha-error');
    const statusEl = document.getElementById('login-status');

    const demoEmail = 'ahmed.ashry@taskedin.net';
    const demoPass = 'Ea5608300Ea@';
    const captchaAnswer = parseInt(form.dataset.captchaAnswer, 10);
    emailEl.value = '';
    passEl.value = '';
    captchaEl.value = '';

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailEl.value.trim();
      const pass = passEl.value;
      const captchaValue = parseInt(captchaEl.value, 10);
      if (Number.isNaN(captchaValue) || captchaValue !== captchaAnswer) {
        captchaErrorEl.hidden = false;
        captchaEl.focus();
        return;
      }
      captchaErrorEl.hidden = true;
      if (email === demoEmail && pass === demoPass) {
        sessionStorage.setItem('qmUserEmail', email);
        statusEl.textContent = 'Signed in. Redirecting to your Private Space...';
        statusEl.className = 'muted';
        setTimeout(() => {
          window.location.href = 'privet-space.php';
        }, 500);
      } else {
        statusEl.textContent = 'Invalid credentials. Please check your email or password.';
        statusEl.className = 'form-alert error';
      }
    });

    // 3D tilt on card
    const card = document.getElementById('login-card');
    const allowTilt = window.matchMedia('(pointer: fine)').matches;
    if (allowTilt) {
      const tilt = (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
      };
      const reset = () => {
        card.style.transform = 'rotateX(0) rotateY(0)';
      };
      card.addEventListener('mousemove', tilt);
      card.addEventListener('mouseleave', reset);
    }
  })();
</script>
