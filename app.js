const seedJobs = [
  {
    title: 'Asesor(a) de Ventas',
    company: 'Retail Nova',
    location: 'Lima',
    salary: 'S/ 1,600 + comisiones',
    description: 'Atención al cliente, cierre de ventas y seguimiento de leads.',
    type: 'Tiempo completo'
  },
  {
    title: 'Diseñador(a) Gráfico',
    company: 'Pixel Studio',
    location: 'Remoto',
    salary: 'S/ 2,800',
    description: 'Diseño de piezas para redes, landings y campañas digitales.',
    type: 'Remoto'
  },
  {
    title: 'Analista de Datos Jr',
    company: 'DataBridge',
    location: 'Arequipa',
    salary: 'S/ 3,000',
    description: 'Limpieza de datos, dashboards y reportes semanales.',
    type: 'Híbrido'
  }
];

const jobs = JSON.parse(localStorage.getItem('jobs') || 'null') || seedJobs;

const jobsList = document.getElementById('jobsList');
const resultsCount = document.getElementById('resultsCount');
const qInput = document.getElementById('q');
const cityInput = document.getElementById('city');

function render(list) {
  jobsList.innerHTML = '';
  resultsCount.textContent = `${list.length} resultados`;

  if (!list.length) {
    jobsList.innerHTML = '<div class="card">No encontramos vacantes con ese filtro.</div>';
    return;
  }

  list.forEach(job => {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <h4>${job.title}</h4>
      <p class="job-meta">${job.company} · ${job.location}</p>
      <p>${job.description}</p>
      <strong>${job.salary}</strong>
      <div class="tag">${job.type || 'Tiempo completo'}</div>
    `;
    jobsList.appendChild(el);
  });
}

function filterJobs() {
  const q = qInput.value.toLowerCase().trim();
  const city = cityInput.value.toLowerCase();
  const filtered = jobs.filter(job => {
    const matchesQ = !q || [job.title, job.company, job.description].join(' ').toLowerCase().includes(q);
    const matchesCity = !city || job.location.toLowerCase() === city;
    return matchesQ && matchesCity;
  });
  render(filtered);
}

document.getElementById('searchBtn').addEventListener('click', filterJobs);

document.getElementById('jobForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const newJob = {
    title: formData.get('title'),
    company: formData.get('company'),
    location: formData.get('location'),
    salary: formData.get('salary'),
    description: formData.get('description'),
    type: 'Publicado por empresa'
  };

  jobs.unshift(newJob);
  localStorage.setItem('jobs', JSON.stringify(jobs));
  form.reset();
  render(jobs);
});

render(jobs);
