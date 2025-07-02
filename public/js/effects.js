document.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  document.querySelector('.background-overlay').style.transform = `translateY(${scrolled * 0.3}px)`;
});
