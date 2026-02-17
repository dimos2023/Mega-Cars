const models3d = [
  {
    id: 'maextro-s800',
    name: 'MAEXTRO S800',
    copy: 'Flagship electric sedan reimagined with an immersive, lounge-grade cabin and adaptive air ride.',
    detailLink: 'maextro-s800.html',
    gallery: [
      'Image/MAEXTRO%20S800/2.png',
      'Image/MAEXTRO%20S800/3.png',
      'Image/MAEXTRO%20S800/4.png',
      'Image/MAEXTRO%20S800/5.png',
      'Image/MAEXTRO%20S800/6.png',
      'Image/MAEXTRO%20S800/7.png',
      'Image/MAEXTRO%20S800/8.png'
    ],
    stats: [
      { label: '0-100 km/h', value: '3.4 s' },
      { label: 'Range', value: 'Up to 750 km' },
      { label: 'Drive', value: 'AWD' }
    ]
  },
  {
    id: 'yangwang-u9',
    name: 'YANGWANG U9',
    copy: 'Electric hypercar with quad-motor torque vectoring, sculpted for track precision.',
    detailLink: 'yangwang-u9.html',
    gallery: [
      'Image/YANGWANG%20U9/1.png',
      'Image/YANGWANG%20U9/2.png',
      'Image/YANGWANG%20U9/3.png',
      'Image/YANGWANG%20U9/4.png',
      'Image/YANGWANG%20U9/5.png',
      'Image/YANGWANG%20U9/6.png',
      'Image/YANGWANG%20U9/7.png'
    ],
    stats: [
      { label: '0-100 km/h', value: '2.0 s' },
      { label: 'Power', value: '1,300 hp (est.)' },
      { label: 'Drive', value: 'Quad-motor AWD' }
    ]
  },
  {
    id: 'yangwang-u8l',
    name: 'YANGWANG U8L',
    copy: 'Luxury off-road SUV with electric drive, range extender confidence, and seven-seat space.',
    detailLink: 'yangwang-u8l.html',
    gallery: [
      'Image/YANGWANG%20U8L/1.png',
      'Image/YANGWANG%20U8L/2.png',
      'Image/YANGWANG%20U8L/3.png',
      'Image/YANGWANG%20U8L/4.png',
      'Image/YANGWANG%20U8L/5.png',
      'Image/YANGWANG%20U8L/6.png',
      'Image/YANGWANG%20U8L/7.png'
    ],
    stats: [
      { label: '0-100 km/h', value: '3.6 s' },
      { label: 'Drive', value: 'E-AWD' },
      { label: 'Seating', value: 'Up to 7' }
    ]
  }
];

const heroFrame = document.getElementById('hero-frame');
const thumbRow = document.getElementById('thumb-row');
const modelName = document.getElementById('model-name');
const modelCopy = document.getElementById('model-copy');
const modelStats = document.getElementById('model-stats');
const modelIndexEl = document.getElementById('model-index');
const openDetail = document.getElementById('open-detail');
const stage = document.getElementById('stage');

const prevBtn = document.getElementById('prev-model');
const nextBtn = document.getElementById('next-model');

let current = 0;
let frameIndex = 0;
let isPlaying = true;
let playTimer;
const FRAME_INTERVAL = 800; // ms

const setModelById = (id) => {
  const idx = models3d.findIndex((m) => m.id === id);
  current = idx >= 0 ? idx : 0;
  renderModel();
};

const renderStats = (stats) => {
  modelStats.innerHTML = '';
  stats.forEach((s) => {
    const row = document.createElement('div');
    row.className = 'spec';
    row.innerHTML = `<span>${s.label}</span><strong>${s.value}</strong>`;
    modelStats.appendChild(row);
  });
};

const buildThumbs = (model) => {
  thumbRow.innerHTML = '';
  model.gallery.forEach((src, idx) => {
    const btn = document.createElement('button');
    const img = document.createElement('img');
    img.src = src;
    img.alt = `${model.name} angle ${idx + 1}`;
    btn.appendChild(img);
    if (idx === frameIndex) btn.classList.add('active');
    btn.addEventListener('click', () => {
      frameIndex = idx;
      updateFrame(model);
      buildThumbs(model);
    });
    thumbRow.appendChild(btn);
  });
};

const updateFrame = (model) => {
  heroFrame.classList.add('is-fading');
  const nextSrc = model.gallery[frameIndex];
  setTimeout(() => {
    heroFrame.src = nextSrc;
    heroFrame.onload = () => {
      heroFrame.classList.remove('is-fading');
    };
  }, 80);
};

const renderModel = () => {
  const model = models3d[current];
  frameIndex = Math.min(frameIndex, model.gallery.length - 1);
  modelName.textContent = model.name;
  modelCopy.textContent = model.copy;
  openDetail.href = model.detailLink;
  modelIndexEl.textContent = `${current + 1} / ${models3d.length}`;
  renderStats(model.stats);
  updateFrame(model);
  buildThumbs(model);
};

const handleMove = (evt) => {
  stopPlayback();
  const rect = stage.getBoundingClientRect();
  const x = evt.clientX - rect.left;
  const pct = Math.max(0, Math.min(1, x / rect.width));
  const model = models3d[current];
  const idx = Math.min(model.gallery.length - 1, Math.floor(pct * model.gallery.length));
  frameIndex = idx;
  updateFrame(model);
  const tilt = (pct - 0.5) * 10; // degrees
  heroFrame.style.transform = `scale(1.02) rotateY(${tilt}deg)`;
};

const resetTilt = () => {
  heroFrame.style.transform = 'scale(1)';
};

stage.addEventListener('mousemove', handleMove);
stage.addEventListener('mouseleave', resetTilt);
stage.addEventListener('touchmove', (e) => {
  if (e.touches.length) handleMove(e.touches[0]);
}, { passive: true });
stage.addEventListener('touchend', resetTilt);

prevBtn.addEventListener('click', () => {
  current = (current - 1 + models3d.length) % models3d.length;
  renderModel();
});

nextBtn.addEventListener('click', () => {
  current = (current + 1) % models3d.length;
  renderModel();
});

const stepPlayback = () => {
  if (!isPlaying) return;
  const model = models3d[current];
  frameIndex = (frameIndex + 1) % model.gallery.length;
  updateFrame(model);
  buildThumbs(model);
};

const startPlayback = () => {
  if (playTimer) clearInterval(playTimer);
  playTimer = setInterval(stepPlayback, FRAME_INTERVAL);
  isPlaying = true;
  playToggle.classList.add('is-playing');
  playToggle.textContent = '❚❚';
};

const stopPlayback = () => {
  if (playTimer) clearInterval(playTimer);
  isPlaying = false;
  playToggle.classList.remove('is-playing');
  playToggle.textContent = '▶';
};

const playToggle = document.getElementById('play-toggle');
playToggle.addEventListener('click', () => {
  if (isPlaying) {
    stopPlayback();
  } else {
    startPlayback();
  }
});

const params = new URLSearchParams(window.location.search);
const requestedId = params.get('id');
setModelById(requestedId || models3d[0].id);

// initial render
renderModel();
startPlayback();
