<?php
$pageTitle = $pageTitle ?? 'Quantum Motors';
$bodyClass = $bodyClass ?? '';
$styles = $styles ?? ['Style.css'];
$scripts = $scripts ?? ['script.js', 'chatbot.js'];
$includeBackdrop = $includeBackdrop ?? true;
$headerNav = $headerNav ?? [
  ['label' => 'About', 'href' => 'about.php'],
  ['label' => 'Models', 'href' => 'index.php#models'],
  ['label' => 'Shopping tools', 'href' => 'index.php#tools'],
  ['label' => 'Quantum world', 'href' => 'index.php#stories'],
];
$headerActions = $headerActions ?? [
  ['label' => 'Sign in', 'href' => 'login.php', 'class' => 'pill-link'],
  ['label' => 'Subscribe', 'href' => 'register.php', 'class' => 'btn subscribe-cta'],
  ['label' => 'Find a dealer', 'href' => 'index.php#tools', 'class' => 'pill-link'],
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($pageTitle) ?></title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet">
  <?php foreach ($styles as $style): ?>
    <link rel="stylesheet" href="<?= htmlspecialchars($style) ?>">
  <?php endforeach; ?>
  <?php foreach ($scripts as $script): ?>
    <?php
      $src = $script;
      if ($script === 'script.js') {
        $src .= '?v=2';
      }
    ?>
    <script defer src="<?= htmlspecialchars($src) ?>"></script>
  <?php endforeach; ?>
</head>
<body class="<?= htmlspecialchars($bodyClass) ?>">
  <?php if ($includeBackdrop): ?>
    <div class="page-backdrop" id="page-backdrop" aria-hidden="true"></div>
  <?php endif; ?>
  <header class="site-header">
    <div class="logo" aria-label="Quantum Motors">QUANTUM MOTORS</div>
    <nav class="primary-nav" aria-label="Primary">
      <?php foreach ($headerNav as $item): ?>
        <a href="<?= htmlspecialchars($item['href']) ?>"><?= htmlspecialchars($item['label']) ?></a>
      <?php endforeach; ?>
    </nav>
    <div class="header-actions">
      <?php foreach ($headerActions as $action): ?>
        <a class="<?= htmlspecialchars($action['class']) ?>" href="<?= htmlspecialchars($action['href']) ?>"><?= htmlspecialchars($action['label']) ?></a>
      <?php endforeach; ?>
      <button class="menu-toggle" aria-label="Open navigation">
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
