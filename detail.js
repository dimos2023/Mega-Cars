const heroImg = document.querySelector('[data-hero]');
const thumbEls = document.querySelectorAll('[data-thumb]');

thumbEls.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    const src = thumb.getAttribute('data-thumb');
    heroImg.setAttribute('src', src);
    thumbEls.forEach((t) => t.classList.remove('is-active'));
    thumb.classList.add('is-active');
  });
});
