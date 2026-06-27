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

// ─── SKILLS TABS ───
const skillsTabs = document.querySelectorAll('.skills-tab');
const skillsPanels = document.querySelectorAll('.skills-panel');
skillsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const cat = tab.dataset.cat;
        skillsTabs.forEach(t => t.classList.toggle('active', t === tab));
        skillsPanels.forEach(p => p.classList.toggle('active', p.dataset.cat === cat));
    });
});

// ─── MOBILE SIDEBAR ───
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarClose = document.getElementById('sidebarClose');

function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('visible');
    menuToggle.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');
    menuToggle.classList.remove('open');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});
sidebarClose.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);
document.querySelectorAll('.sidebar-links a').forEach(a => a.addEventListener('click', closeSidebar));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });

// ─── FOOTER YEAR ───
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── HEADER ACTIVE NAV ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 120) cur = s.id; });
    navLinks.forEach(a => { a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--accent)' : ''; });
}, { passive: true });
