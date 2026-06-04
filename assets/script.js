// ─── CURSOR ───
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
(function animRing() {
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
})();

// ─── 3D TILT ───
function applyTilt(el) {
    el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        const tiltX = y * -14, tiltY = x * 14;
        el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02,1.02,1.02)`;
        const shine = el.querySelector('.project-shine');
        if (shine) { shine.style.setProperty('--mx', (x + .5) * 100 + '%'); shine.style.setProperty('--my', (y + .5) * 100 + '%'); }
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = '';
    });
}
document.querySelectorAll('[data-tilt]').forEach(applyTilt);

// ─── SCROLL REVEAL ───
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ─── HEADER ACTIVE NAV ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 120) cur = s.id; });
    navLinks.forEach(a => { a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--accent)' : ''; });
}, { passive: true });
