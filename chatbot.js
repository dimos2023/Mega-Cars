(() => {
  if (document.getElementById('qm-chatbot-launcher')) return;

  const kb = {
    s800: {
      name: 'MAEXTRO S800',
      price: 'Price on request',
      range: 'Up to 750 km',
      accel: '0-100 km/h in 3.4 s',
      drive: 'AWD',
      note: 'Flagship electric sedan with lounge comfort.'
    },
    u9: {
      name: 'YANGWANG U9',
      price: 'From USD 290,000',
      range: '(Range not published)',
      accel: '0-100 km/h in 2.0 s',
      drive: 'Quad-motor AWD',
      note: 'Electric hypercar with torque vectoring.'
    },
    u8l: {
      name: 'YANGWANG U8L',
      price: 'From USD 170,000',
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

  const launcher = makeEl('button', 'chatbot-launcher');
  launcher.id = 'qm-chatbot-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Open chat');
  launcher.innerHTML = '<span>?</span>';

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
})();
