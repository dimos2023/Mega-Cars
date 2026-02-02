const videos = [
  {
    id: 'jykAufMNHYY',
    title: 'Quantum Motors feature film'
  },
  {
    id: 'wlaZWRXgB_I',
    title: 'Quantum Motors performance story'
  },
  {
    id: 'zIKAn8yDkpA',
    title: 'Quantum Motors Middle East film'
  }
];

const models = [
  {
    id: 'maextro-s800',
    name: 'MAEXTRO S800',
    tagline: 'Flagship electric sedan with grand-touring comfort.',
    blurb: 'Long-range battery, lounge-grade cabin, and adaptive air ride built for the region.',
    price: 'Price on request',
    heroImage: 'Image/MAEXTRO%20S800/1.png',
    cardImage: 'Image/MAEXTRO%20S800/2.png',
    detailLink: 'maextro-s800.html',
    gallery: [
      'Image/MAEXTRO%20S800/3.png',
      'Image/MAEXTRO%20S800/4.png',
      'Image/MAEXTRO%20S800/5.png',
      'Image/MAEXTRO%20S800/6.png',
      'Image/MAEXTRO%20S800/7.png',
      'Image/MAEXTRO%20S800/8.png',
      'Image/MAEXTRO%20S800/9.png',
      'Image/MAEXTRO%20S800/10.png',
      'Image/MAEXTRO%20S800/11.png',
      'Image/MAEXTRO%20S800/12.png',
      'Image/MAEXTRO%20S800/13.png',
      'Image/MAEXTRO%20S800/14.png',
      'Image/MAEXTRO%20S800/15.png',
      'Image/MAEXTRO%20S800/16.png',
      'Image/MAEXTRO%20S800/17.png',
      'Image/MAEXTRO%20S800/18.png',
      'Image/MAEXTRO%20S800/19.png',
      'Image/MAEXTRO%20S800/20.png'
    ],
    buildLink: '#configure-s800',
    driveLink: '#test-drive-s800',
    stats: [
      { label: '0-100 km/h', value: '3.4 s' },
      { label: 'Range', value: 'Up to 750 km' },
      { label: 'Drive', value: 'AWD' },
      { label: 'From', value: 'Price on request' }
    ]
  },
  {
    id: 'yangwang-u9',
    name: 'YANGWANG U9',
    tagline: 'Electric hypercar with four-motor torque vectoring.',
    blurb: 'Track-focused aero, instant launches, and precision control for every corner.',
    price: 'From USD 290,000',
    heroImage: 'Image/YANGWANG%20U9/1.png',
    cardImage: 'Image/YANGWANG%20U9/2.png',
    detailLink: 'yangwang-u9.html',
    gallery: [
      'Image/YANGWANG%20U9/3.png',
      'Image/YANGWANG%20U9/4.png',
      'Image/YANGWANG%20U9/5.png',
      'Image/YANGWANG%20U9/6.png',
      'Image/YANGWANG%20U9/7.png'
    ],
    buildLink: '#configure-u9',
    driveLink: '#test-drive-u9',
    stats: [
      { label: '0-100 km/h', value: '2.0 s' },
      { label: 'Power', value: '1,300 hp (est.)' },
      { label: 'Drive', value: 'Quad-motor AWD' },
      { label: 'From', value: 'USD 290,000' }
    ]
  },
  {
    id: 'yangwang-u8l',
    name: 'YANGWANG U8L',
    tagline: 'Luxury off-road SUV with electric drive and range extender.',
    blurb: 'Seven-seat space, intelligent terrain modes, and water-fording confidence.',
    price: 'From USD 170,000',
    heroImage: 'Image/YANGWANG%20U8L/1.png',
    cardImage: 'Image/YANGWANG%20U8L/2.png',
    detailLink: 'yangwang-u8l.html',
    gallery: [
      'Image/YANGWANG%20U8L/3.png',
      'Image/YANGWANG%20U8L/4.png',
      'Image/YANGWANG%20U8L/5.png',
      'Image/YANGWANG%20U8L/6.png',
      'Image/YANGWANG%20U8L/7.png',
      'Image/YANGWANG%20U8L/8.png',
      'Image/YANGWANG%20U8L/9.png',
      'Image/YANGWANG%20U8L/10.png',
      'Image/YANGWANG%20U8L/11.png'
    ],
    buildLink: '#configure-u8l',
    driveLink: '#test-drive-u8l',
    stats: [
      { label: '0-100 km/h', value: '3.6 s' },
      { label: 'Drive', value: 'E-AWD' },
      { label: 'Seating', value: 'Up to 7' },
      { label: 'From', value: 'USD 170,000' }
    ]
  }
];

const heroBackdrop = document.getElementById('hero-backdrop');
const heroTitle = document.getElementById('hero-title');
const heroCopy = document.getElementById('hero-copy');
const heroStats = document.getElementById('hero-stats');
const heroDots = document.getElementById('hero-dots');
const heroConfigure = document.getElementById('hero-configure');
const heroDrive = document.getElementById('hero-drive');
const heroPrev = document.getElementById('hero-prev');
const heroNext = document.getElementById('hero-next');
const modelGrid = document.getElementById('model-grid');
const pageBackdrop = document.getElementById('page-backdrop');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const videoFrame = document.getElementById('hero-video');
const videoDots = document.getElementById('video-dots');
const videoPrev = document.getElementById('video-prev');
const videoNext = document.getElementById('video-next');

let heroIndex = 0;
let videoIndex = 0;
let backdropIndex = 0;
let backdropTimer;

const createStat = (stat) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'stat';
  wrapper.innerHTML = `
    <span class="stat-label">${stat.label}</span>
    <span class="stat-value">${stat.value}</span>
  `;
  return wrapper;
};

const updateDots = () => {
  heroDots.querySelectorAll('.dot').forEach((dot, idx) => {
    dot.classList.toggle('is-active', idx === heroIndex);
  });
};

const renderHero = (index) => {
  heroIndex = (index + models.length) % models.length;
  const model = models[heroIndex];
  heroBackdrop.style.backgroundImage = `url('${model.heroImage}')`;
  heroTitle.textContent = model.name;
  heroCopy.textContent = model.tagline;
  heroConfigure.href = model.buildLink;
  heroDrive.href = model.driveLink;

  heroStats.innerHTML = '';
  model.stats.forEach((stat) => heroStats.appendChild(createStat(stat)));
  updateDots();
};

const buildHeroDots = () => {
  heroDots.innerHTML = '';
  models.forEach((model, idx) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show ${model.name}`);
    dot.addEventListener('click', () => {
      renderHero(idx);
      restartTimer();
    });
    heroDots.appendChild(dot);
  });
};

const buildModelCards = () => {
  modelGrid.innerHTML = '';
  models.forEach((model) => {
    const card = document.createElement('article');
    card.className = 'model-card';
    card.innerHTML = `
      <div class="model-thumb">
        <a href="${model.detailLink || '#'}">
          <img src="${model.cardImage}" alt="${model.name}">
        </a>
      </div>
      <div class="model-body">
        <div class="model-meta">
          <span class="chip">${model.name.split(' ')[0]}</span>
          <span>${model.price}</span>
        </div>
        <h3><a class="model-link" href="${model.detailLink || '#'}">${model.name}</a></h3>
        <p class="muted">${model.blurb}</p>
        <div class="model-actions">
          <a class="btn primary" href="${model.detailLink || '#'}">Open detail</a>
          <a class="text-link" href="${model.driveLink}">Test drive</a>
        </div>
      </div>
    `;
    modelGrid.appendChild(card);
  });
};

const startTimer = () => {};
const restartTimer = () => {};

prefersReducedMotion.addEventListener('change', () => {
  clearInterval(backdropTimer);
  startBackdropRotation();
});

const renderVideo = (index) => {
  videoIndex = (index + videos.length) % videos.length;
  const video = videos[videoIndex];
  if (!videoFrame) return;
  const src = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.id}&modestbranding=1&rel=0&playsinline=1&showinfo=0&enablejsapi=1`;
  videoFrame.setAttribute('src', src);
  videoFrame.setAttribute('title', video.title);
  if (videoDots) {
    videoDots.querySelectorAll('.dot').forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === videoIndex);
    });
  }
};

const buildVideoDots = () => {
  if (!videoDots) return;
  videoDots.innerHTML = '';
  videos.forEach((video, idx) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show video ${idx + 1}: ${video.title}`);
    dot.addEventListener('click', () => renderVideo(idx));
    videoDots.appendChild(dot);
  });
};

heroPrev.addEventListener('click', () => {
  renderHero(heroIndex - 1);
});

heroNext.addEventListener('click', () => {
  renderHero(heroIndex + 1);
});

const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.addEventListener('click', () => {
    const willOpen = !document.body.classList.contains('nav-open');
    document.body.classList.toggle('nav-open', willOpen);
    menuToggle.setAttribute('aria-expanded', willOpen.toString());
  });
}

document.querySelectorAll('.primary-nav a').forEach((link) => {
  link.addEventListener('click', () => document.body.classList.remove('nav-open'));
});

const startBackdropRotation = () => {
  if (!pageBackdrop) return;
  const s800 = models.find((m) => m.id === 'maextro-s800');
  const backdropImages = s800 ? [s800.heroImage] : [];
  if (backdropImages.length) {
    pageBackdrop.style.backgroundImage = `url('${backdropImages[0]}')`;
  }
};

buildHeroDots();
buildModelCards();
renderHero(heroIndex);
startTimer();
buildVideoDots();
renderVideo(videoIndex);
startBackdropRotation();

if (videoPrev && videoNext) {
  videoPrev.addEventListener('click', () => renderVideo(videoIndex - 1));
  videoNext.addEventListener('click', () => renderVideo(videoIndex + 1));
}
