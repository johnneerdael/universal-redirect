const form = document.getElementById('options-form');
const status = document.getElementById('status');
const tableBody = document.querySelector('#redirects-table tbody');
const siteSelect = document.getElementById('site');
const redirectUrlInput = document.getElementById('redirect-url');
const redirectUrlHelper = document.getElementById('redirect-url-helper');
const mediumOptionsDiv = document.getElementById('medium-options');
const mediumLogicSelect = document.getElementById('medium-logic');

  const urlHelpers = {
    "medium.com": "e.g., Freedium/Scribe",
    "youtube.com": "e.g., Invidious",
    "x.com": "e.g., Nitter",
    "tiktok.com": "e.g., ProxiTok",
    "google.com": "e.g., Whoogle/SearXNG",
    "reddit.com": "e.g., Redlib",
    "instagram.com": "e.g., Proxigram"
  };

const helperurl = {
  'medium.com': '<a href="https://git.sr.ht/~edwardloveall/scribe/tree/main/docs/instances.md" target="_blank">Scribe Instances</a>',
  'youtube.com': '<a href="https://docs.invidious.io/instances/" target="_blank">Invidious Instances</a>',
  'x.com': '<a href="https://status.d420.de/" target="_blank">Nitter Instances</a>',
  'tiktok.com': '<a href="https://github.com/pablouser1/ProxiTok/wiki/Public-instances" target="_blank">ProxiTok Instances</a>',
  'google.com': '<a href="https://github.com/benbusby/whoogle-search/blob/main/misc/instances.txt" target="_blank">Whoogle Instances</a> / <a href="https://searx.space/" target="_blank">SearXNG Instances</a>',
  'reddit.com': '<a href="https://github.com/redlib-org/redlib-instances/blob/main/instances.md" target="_blank">Redlib Instances</a>',
  "instagram.com": '<a href="https://codeberg.org/proxigram/proxigram/wiki/Instances" target="_blank">Proxigram Instances</a>'
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
  const helperText = urlHelpers[selectedSite] || '';
  const url = helperurl[selectedSite] || '';

  // Show/hide medium-specific options
  if (selectedSite === 'medium.com') {
    mediumOptionsDiv.style.display = 'block';
  } else {
    mediumOptionsDiv.style.display = 'none';
  }

  // Update the placeholder text inside the input box
  redirectUrlInput.placeholder = helperText;

  // Update the helper text and link below the input box
  redirectUrlHelper.innerHTML = `${url}`;
}

siteSelect.addEventListener('change', updateHelperText);

function saveRule(site, redirectUrl, mediumLogic) {
  const hostname = extractHostname(redirectUrl);
  const data = { [site]: hostname };
  if (site === 'medium.com' && mediumLogic) {
    data['mediumLogic'] = mediumLogic;
  }
  chrome.storage.sync.set(data, function() {
    status.textContent = 'Settings saved.';
    setTimeout(() => { status.textContent = ''; }, 3000);
    loadRules();
  });
}

function deleteRule(site) {
  chrome.storage.sync.remove(site, function() {
    // Also remove the mediumLogic setting if the medium rule is deleted
    if (site === 'medium.com') {
      chrome.storage.sync.remove('mediumLogic', function() {
        status.textContent = 'Rule deleted.';
        setTimeout(() => { status.textContent = ''; }, 3000);
        loadRules();
      });
    } else {
      status.textContent = 'Rule deleted.';
      setTimeout(() => { status.textContent = ''; }, 3000);
      loadRules();
    }
  });
}

function loadRules() {
  chrome.storage.sync.get(null, function(items) {
    tableBody.innerHTML = '';
    for (const [site, redirectUrl] of Object.entries(items)) {
      if (site === 'mediumLogic') continue;
      
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
  const mediumLogic = (site === 'medium.com') ? mediumLogicSelect.value : null;
  saveRule(site, redirectUrl, mediumLogic);
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