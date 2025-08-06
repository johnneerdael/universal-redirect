const form = document.getElementById('options-form');
const status = document.getElementById('status');
const tableBody = document.querySelector('#redirects-table tbody');
const siteSelect = document.getElementById('site');
const redirectUrlInput = document.getElementById('redirect-url');
const redirectUrlHelper = document.getElementById('redirect-url-helper');

const helpers = {
  'medium.com': 'e.g., Freedium',
  'youtube.com': 'e.g., Invidious',
  'x.com': 'e.g., Nitter',
  'tiktok.com': 'e.g., ProxiTok',
  'google.com': 'e.g., SearXNG',
  'reddit.com': 'e.g., Redlib'
};
const helperurl = {
  'medium.com': '<a href="https://github.com/Freedium-cfd" target="_blank">https://github.com/Freedium-cfd</a>',
  'youtube.com': '<a href="https://docs.invidious.io/instances/" target="_blank">https://docs.invidious.io/instances/</a>',
  'x.com': '<a href="https://github.com/zedeus/nitter" target="_blank">https://github.com/zedeus/nitter</a>',
  'tiktok.com': '<a href="https://github.com/pablouser1/ProxiTok/wiki/Public-instances" target="_blank">https://github.com/pablouser1/ProxiTok/wiki/Public-instances</a>',
  'google.com': '<a href="https://searx.space/" target="_blank">https://searx.space/</a>',
  'reddit.com': '<a href="https://github.com/redlib-org/redlib-instances/blob/main/instances.md" target="_blank">https://github.com/redlib-org/redlib-instances/blob/main/instances.md</a>'
};

function extractHostname(url) {
  try {
    if (!url.startsWith('http')) {
      url = 'https://' + url;
    }
    return new URL(url).hostname;
  } catch (e) {
    return url.split('/')[0];
  }
}

function updateHelperText() {
  const selectedSite = siteSelect.value;
  const url = helperurl[selectedSite] || '';
  redirectUrlHelper.innerHTML = `${url}`;
}

siteSelect.addEventListener('change', updateHelperText);

function saveRule(site, redirectUrl) {
  const hostname = extractHostname(redirectUrl);
  chrome.storage.sync.set({ [site]: hostname }, function() {
    status.textContent = 'Settings saved.';
    setTimeout(() => { status.textContent = ''; }, 3000);
    loadRules();
  });
}

function deleteRule(site) {
  chrome.storage.sync.remove(site, function() {
    status.textContent = 'Rule deleted.';
    setTimeout(() => { status.textContent = ''; }, 3000);
    loadRules();
  });
}

function loadRules() {
  chrome.storage.sync.get(null, function(items) {
    tableBody.innerHTML = '';
    for (const [site, redirectUrl] of Object.entries(items)) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${site}</td>
        <td><a href="https://${redirectUrl}" target="_blank">${redirectUrl}</a></td>
        <td>
          <button class="edit-btn" data-site="${site}" data-url="${redirectUrl}">Edit</button>
          <button class="delete-btn" data-site="${site}">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    }
  });
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const site = siteSelect.value;
  const redirectUrl = redirectUrlInput.value;
  saveRule(site, redirectUrl);
  form.reset();
  updateHelperText();
});

tableBody.addEventListener('click', function(event) {
  if (event.target.classList.contains('edit-btn')) {
    const site = event.target.dataset.site;
    const url = event.target.dataset.url;
    siteSelect.value = site;
    redirectUrlInput.value = url;
    document.getElementById('edit-site').value = site;
    updateHelperText();
  }

  if (event.target.classList.contains('delete-btn')) {
    const site = event.target.dataset.site;
    if (confirm(`Are you sure you want to delete the rule for ${site}?`)) {
      deleteRule(site);
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  loadRules();
  updateHelperText();
});
