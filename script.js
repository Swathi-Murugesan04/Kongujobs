const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(item => item.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    document.querySelectorAll('.job-card').forEach(card => {
      card.hidden = !(filter === 'all' || card.dataset.category === filter);
    });
  });
});

const roleSelect = document.getElementById('role');
document.querySelectorAll('[data-role]').forEach(link => {
  link.addEventListener('click', () => {
    const role = link.dataset.role;
    if (roleSelect) {
      const option = [...roleSelect.options].find(item => item.text.toLowerCase() === role.toLowerCase());
      if (option) roleSelect.value = option.value;
      else if (role.toLowerCase().includes('overseas')) roleSelect.value = 'Overseas Jobs';
      else if (role.toLowerCase().includes('remote') || role.toLowerCase().includes('home')) roleSelect.value = 'Work From Home';
      else if (role.toLowerCase().includes('training')) roleSelect.value = 'Training & Career Guidance';
    }
  });
});

document.getElementById('enquiryForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = [
    'Hello Kongu Job Agency, I would like to enquire about job opportunities.',
    '',
    `Name: ${data.get('fullName')}`,
    `Phone: ${data.get('phone')}`,
    `Preferred location: ${data.get('location')}`,
    `Job category: ${data.get('role')}`,
    `Experience: ${data.get('experience') || 'Not specified'}`,
    `Additional details: ${data.get('message') || 'Not specified'}`,
    '',
    'Please share relevant details. Thank you.'
  ].join('\n');
  document.getElementById('formStatus').textContent = 'Opening WhatsApp with your enquiry. Please review and press Send there.';
  window.open(`https://wa.me/917373537833?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
document.getElementById('year').textContent = new Date().getFullYear();
