const views = {
  account: document.getElementById('accountForm'),
  sections: document.getElementById('sectionView'),
  code: document.getElementById('codeForm'),
  done: document.getElementById('doneView')
};
let selectedCourse = '';

function showView(name, step) {
  Object.values(views).forEach(view => view.classList.remove('active'));
  views[name].classList.add('active');
  document.querySelectorAll('.step').forEach(el => {
    el.classList.toggle('active', Number(el.dataset.step) <= step);
  });
}

document.getElementById('togglePassword').addEventListener('click', () => {
  const field = document.getElementById('password');
  field.type = field.type === 'password' ? 'text' : 'password';
});

document.getElementById('accountForm').addEventListener('submit', event => {
  event.preventDefault();
  // Demo only: values are intentionally not stored or sent anywhere.
  showView('sections', 2);
});

document.querySelectorAll('[data-course]').forEach(button => {
  button.addEventListener('click', () => {
    selectedCourse = button.dataset.course;
    document.getElementById('chosenCourse').textContent = selectedCourse;
    showView('code', 3);
  });
});

document.getElementById('changeAccount').addEventListener('click', () => {
  document.getElementById('accountForm').reset();
  showView('account', 1);
});

document.getElementById('backToSections').addEventListener('click', () => showView('sections', 2));

document.getElementById('activationCode').addEventListener('input', event => {
  let value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12);
  event.target.value = value.match(/.{1,4}/g)?.join('-') || '';
});

document.getElementById('codeForm').addEventListener('submit', event => {
  event.preventDefault();
  showView('done', 3);
});

document.getElementById('restart').addEventListener('click', () => {
  document.getElementById('accountForm').reset();
  document.getElementById('codeForm').reset();
  selectedCourse = '';
  showView('account', 1);
});
