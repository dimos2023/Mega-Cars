(() => {
  if (document.getElementById('qm-chatbot-launcher')) return;

  const ensureBgAudio = () => {
    if (document.getElementById('qm-bg-audio')) return;
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/10/02/audio_2b93b2e549.mp3?filename=luxury-soft-ambient-121006.mp3');
    audio.id = 'qm-bg-audio';
    audio.loop = true;
    audio.autoplay = true;
    audio.preload = 'auto';
    audio.playsInline = true;
    audio.muted = true; // allow autoplay on load
    audio.volume = 0.18;
    audio.dataset.label = 'Quantum Motors ambience';
    audio.style.display = 'none';
    document.body.appendChild(audio);

    const tryPlay = () => audio.play().catch(() => {});
    const unmute = () => {
      audio.muted = false;
      audio.volume = 0.18;
      tryPlay();
      ['pointerdown', 'touchstart', 'click', 'keydown', 'scroll'].forEach((evt) =>
        window.removeEventListener(evt, unmute)
      );
    };

    // Initial attempts (some browsers allow muted autoplay only)
    tryPlay();
    setTimeout(tryPlay, 400);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) tryPlay();
    });

    // Unmute as soon as user interacts anywhere
    ['pointerdown', 'touchstart', 'click', 'keydown', 'scroll'].forEach((evt) =>
      window.addEventListener(evt, unmute, { once: true })
    );
  };

  const ensureWhatsApp = () => {
    if (document.getElementById('qm-whatsapp')) return;
    const style = document.createElement('style');
    style.textContent = `
      .whatsapp-fab {
        position: fixed;
        left: clamp(12px, 3vw, 24px);
        bottom: clamp(20px, 6vw, 34px);
        width: 54px;
        height: 54px;
        border-radius: 50%;
        background: #25d366;
        border: 1px solid rgba(0,0,0,0.18);
        box-shadow: 0 14px 34px rgba(0,0,0,0.35);
        display: grid;
        place-items: center;
        color: #0b0c0f;
        text-decoration: none;
        z-index: 1500;
        transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
      }
      .whatsapp-fab:hover,
      .whatsapp-fab:focus-visible {
        transform: translateY(-2px) scale(1.03);
        box-shadow: 0 18px 40px rgba(0,0,0,0.45);
      }
      .whatsapp-icon {
        width: 28px;
        height: 28px;
        fill: currentColor;
      }
    `;
    document.head.appendChild(style);

    const link = document.createElement('a');
    link.id = 'qm-whatsapp';
    link.className = 'whatsapp-fab';
    link.href = 'https://wa.me/201212332993';
    link.target = '_blank';
    link.rel = 'noopener';
    link.setAttribute('aria-label', 'Chat on WhatsApp');
    link.innerHTML = `
      <svg class="whatsapp-icon" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.1 4 14.3c0 2.3.7 4.4 2 6.2L4 29l8-2.1c1.3.4 2.7.6 4 .6 6.6 0 12-5.1 12-11.3C28 8.1 22.6 3 16 3zm0 20.6c-1.2 0-2.4-.2-3.5-.7l-.3-.1-4.7 1.2 1.3-4.4-.3-.4C7.4 18 6.7 16.2 6.7 14.3c0-5 4.4-9.1 9.8-9.1s9.8 4.1 9.8 9.1-4.4 9.1-9.8 9.1zm5.4-6.7c-.3-.1-1.8-.9-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-1 .9s-.5-.1-.8-.2c-.2-.1-1.5-.6-2.8-1.9-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.6.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1.1-.2.2-.3.1-.2 0-.4 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1-1.1 2.4s1.1 2.8 1.3 3c.2.3 2.2 3.3 5.4 4.5.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/>
      </svg>
    `;
    document.body.appendChild(link);
  };
  const kb = {
    s800: {
      name: 'MAEXTRO S800',
      price: '0',
      range: 'Up to 750 km',
      accel: '0-100 km/h in 3.4 s',
      drive: 'AWD',
      note: 'Flagship electric sedan with lounge comfort.'
    },
    u9: {
      name: 'YANGWANG U9',
      price: '0',
      range: '(Range not published)',
      accel: '0-100 km/h in 2.0 s',
      drive: 'Quad-motor AWD',
      note: 'Electric hypercar with torque vectoring.'
    },
    u8l: {
      name: 'YANGWANG U8L',
      price: '0',
      range: '(Range not published)',
      accel: '0-100 km/h in 3.6 s',
      drive: 'E-AWD',
      note: 'Luxury off-road SUV with range extender.'
    }
  };

  const contactInfo = 'For concierge support: email hello@quantum-motors.example or use register.html.';

  const makeEl = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  };

  ensureBgAudio();
  ensureWhatsApp();

  const launcher = makeEl('button', 'chatbot-launcher');
  launcher.id = 'qm-chatbot-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Open chat');
  launcher.innerHTML = `
    <svg class="chatbot-brain" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M30 6c-6 0-11 5-11 11v2c-4 1-7 5-7 9 0 4 2 7 5 9v6c0 6 5 11 11 11h2V6h-2Zm4 0v48h2c6 0 11-5 11-11v-6c3-2 5-5 5-9 0-4-3-8-7-9v-2c0-6-5-11-11-11h-2Z" fill="currentColor"/>
    </svg>
  `;

  const panel = makeEl('div', 'chatbot-panel');
  panel.id = 'qm-chatbot-panel';
  const header = makeEl('div', 'chatbot-header');
  const title = makeEl('h4', '', 'Quantum Assist');
  const closeBtn = makeEl('button', 'btn ghost', '×');
  closeBtn.style.background = 'transparent';
  closeBtn.style.border = 'none';
  closeBtn.style.color = '#f8f9fc';
  closeBtn.style.cursor = 'pointer';
  closeBtn.setAttribute('aria-label', 'Close chat');

  header.append(title, closeBtn);

  const body = makeEl('div', 'chatbot-body');
  body.setAttribute('role', 'log');
  body.setAttribute('aria-live', 'polite');

  const inputRow = makeEl('div', 'chatbot-input-row');
  const input = makeEl('input', 'chatbot-input');
  input.type = 'text';
  input.placeholder = 'Ask about models, prices, contact...';
  const sendBtn = makeEl('button', 'chatbot-send', 'Send');
  sendBtn.type = 'button';
  inputRow.append(input, sendBtn);

  panel.append(header, body, inputRow);
  document.body.append(panel, launcher);

  const scrollToBottom = () => {
    body.scrollTop = body.scrollHeight;
  };

  const addMessage = (text, type = 'bot') => {
    const msg = makeEl('div', `chatbot-msg ${type}`, text);
    body.appendChild(msg);
    scrollToBottom();
  };

  const detectModel = (txt) => {
    const t = txt.toLowerCase();
    if (t.includes('s800') || t.includes('maextro')) return 's800';
    if (t.includes('u9')) return 'u9';
    if (t.includes('u8') || t.includes('u8l')) return 'u8l';
    return null;
  };

  const reply = (question) => {
    const q = question.toLowerCase();
    const modelKey = detectModel(q);
    const model = modelKey ? kb[modelKey] : null;
    const wantsPrice = /price|cost|usd|egp|جنيه|سعر/.test(q);
    const wantsRange = /range|km|distance|مدى/.test(q);
    const wantsAccel = /0-100|accel|تسارع/.test(q);
    const wantsContact = /contact|reach|mail|email|تواصل|dealer|phone|رقم/.test(q);
    const wantsPay = /payment|pay|finance|lease|installment|تمويل|تقسيط/.test(q);

    if (model) {
      const parts = [];
      parts.push(`${model.name}: ${model.note}`);
      if (wantsPrice) parts.push(`Price: ${model.price}`);
      if (wantsRange && model.range) parts.push(`Range: ${model.range}`);
      if (wantsAccel) parts.push(`Acceleration: ${model.accel}`);
      parts.push(`Drive: ${model.drive}`);
      if (wantsPay) parts.push('Payment: cash, bank finance, lease/subscription, fleet programs.');
      if (wantsContact) parts.push(contactInfo);
      if (parts.length <= 2 && !wantsPrice && !wantsRange && !wantsAccel && !wantsPay && !wantsContact) {
        parts.push('Ask about price, range, acceleration, payment, or contact and I will answer.');
      }
      return parts.join(' • ');
    }

    if (wantsContact) {
      return `${contactInfo} You can also submit the registration form for a call back.`;
    }
    if (wantsPay) {
      return 'Payment options: cash, bank finance, lease/subscription, and corporate fleet programs. Need a quote? Use the registration form for a tailored offer.';
    }
    return 'I can answer about MAEXTRO S800, YANGWANG U9, and YANGWANG U8L: price, range, acceleration, payment options, and how to contact us.';
  };

  const handleSend = () => {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    input.value = '';
    setTimeout(() => addMessage(reply(text), 'bot'), 200);
  };

  launcher.addEventListener('click', () => {
    panel.classList.toggle('is-open');
    if (panel.classList.contains('is-open')) {
      input.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.remove('is-open');
  });

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  addMessage('Hi! Ask me about MAEXTRO S800, YANGWANG U9, or YANGWANG U8L, including price, specs, and how to contact us.');

  // Greeter hover avatar
  let greeter;
  const showGreeter = () => {
    if (!launcher.isConnected) return;
    if (!greeter) {
      greeter = document.createElement('div');
      greeter.className = 'chatbot-greeter';
      greeter.innerHTML = '<div class="greeter-avatar">🙇‍♂️</div><div class="greeter-text">Ni Hao!<br><small>Tap to chat</small></div>';
      document.body.appendChild(greeter);
    }
    const rect = launcher.getBoundingClientRect();
    greeter.style.left = `${rect.left - 80}px`;
    greeter.style.top = `${rect.top - 10}px`;
    greeter.classList.add('is-visible');
  };
  const hideGreeter = () => {
    if (greeter) greeter.classList.remove('is-visible');
  };

  launcher.addEventListener('mouseenter', showGreeter);
  launcher.addEventListener('focus', showGreeter);
  launcher.addEventListener('mouseleave', hideGreeter);
  launcher.addEventListener('blur', hideGreeter);
})();
