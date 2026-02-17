const privetModels = [
  {
    id: 'MAEXTRO S800',
    name: 'MAEXTRO S800',
    lede: 'Flagship electric grand tourer engineered for serene, long-range authority.',
    detail: 'maextro-s800.html',
    gallery: [
      'Image/MAEXTRO%20S800/2.png',
      'Image/MAEXTRO%20S800/3.png',
      'Image/MAEXTRO%20S800/4.png',
      'Image/MAEXTRO%20S800/5.png',
      'Image/MAEXTRO%20S800/6.png',
      'Image/MAEXTRO%20S800/7.png'
    ],
    stats: [
      ['0-100 km/h', '3.4 s'],
      ['Range', 'Up to 750 km'],
      ['Drive', 'AWD'],
      ['Cabin', 'Lounge-grade, adaptive air ride']
    ]
  },
  {
    id: 'YANGWANG U9',
    name: 'YANGWANG U9',
    lede: 'Electric hypercar with quad-motor precision and arresting aero drama.',
    detail: 'yangwang-u9.html',
    gallery: [
      'Image/YANGWANG%20U9/1.png',
      'Image/YANGWANG%20U9/2.png',
      'Image/YANGWANG%20U9/3.png',
      'Image/YANGWANG%20U9/4.png',
      'Image/YANGWANG%20U9/5.png',
      'Image/YANGWANG%20U9/6.png'
    ],
    stats: [
      ['0-100 km/h', '2.0 s'],
      ['Power', '1,300 hp (est.)'],
      ['Drive', 'Quad-motor AWD'],
      ['Character', 'Track-bred, telemetry-ready']
    ]
  },
  {
    id: 'YANGWANG U8L',
    name: 'YANGWANG U8L',
    lede: 'Luxury off-road SUV with electric drive, range extender calm, and 7-seat presence.',
    detail: 'yangwang-u8l.html',
    gallery: [
      'Image/YANGWANG%20U8L/1.png',
      'Image/YANGWANG%20U8L/2.png',
      'Image/YANGWANG%20U8L/3.png',
      'Image/YANGWANG%20U8L/4.png',
      'Image/YANGWANG%20U8L/5.png',
      'Image/YANGWANG%20U8L/6.png'
    ],
    stats: [
      ['0-100 km/h', '3.6 s'],
      ['Drive', 'E-AWD + terrain intelligence'],
      ['Seating', 'Up to 7'],
      ['Capability', 'On-road grace, off-road assurance']
    ]
  }
];

const params = new URLSearchParams(window.location.search);
const requested = (params.get('model') || '').toUpperCase();
const model = privetModels.find((m) => m.id.toUpperCase() === requested) || privetModels[0];

const titleEl = document.getElementById('privet-title');
const ledeEl = document.getElementById('privet-lede');
const metaEl = document.getElementById('privet-meta');
const gridEl = document.getElementById('privet-grid');
const statsEl = document.getElementById('privet-stats');
const copyEl = document.getElementById('privet-copy');
const detailEl = document.getElementById('privet-detail');
const pdfInput = document.getElementById('pdf-input');
const pdfList = document.getElementById('pdf-list');

titleEl.textContent = `${model.name} | Private Space`;
ledeEl.textContent = model.lede;
metaEl.innerHTML = `<span class="chip">${model.name}</span><span class="chip">Confidential dossier</span>`;

gridEl.innerHTML = '';
model.gallery.forEach((src) => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = `${model.name} detail`;
  gridEl.appendChild(img);
});

statsEl.innerHTML = '';
model.stats.forEach(([label, value]) => {
  const li = document.createElement('li');
  li.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
  statsEl.appendChild(li);
});

copyEl.innerHTML = `
  <p>Engineered for clients who value certainty, refinement, and immediacy. Your dedicated advisor is already aligning financing pathways, delivery choreography, and after-sales provisioning to your preferences.</p>
  <p>Inside this space you can store PDFs—inspection reports, spec confirmations, and ownership documents—so decisions are made with clarity and traceability.</p>
`;

detailEl.href = model.detail;

pdfInput.addEventListener('change', () => {
  pdfList.innerHTML = '';
  Array.from(pdfInput.files || []).forEach((file) => {
    const li = document.createElement('li');
    const sizeKb = Math.round(file.size / 1024);
    li.textContent = `${file.name} (${sizeKb} KB)`;
    pdfList.appendChild(li);
  });
});
