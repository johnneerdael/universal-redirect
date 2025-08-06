chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'sync') {
    updateRules();
  }
});

function updateRules() {
  chrome.storage.sync.get(null, function(items) {
    const rules = [];
    let id = 1;

    for (const [site, redirectUrl] of Object.entries(items)) {
      if (!redirectUrl) continue;

      let regexFilter;
      let regexSubstitution;

      const escapedSite = site.replace(/\./g, '\\.');

      if (site === 'medium.com') {
        regexFilter = '^(https?://(?:[^/]+\\.)?medium\.com/.*)$';
        regexSubstitution = 'https://' + redirectUrl + '/\\0';
      } else {
        regexFilter = '^(https?://(?:www\.)?' + escapedSite + '/(.*))$';
        regexSubstitution = 'https://' + redirectUrl + '/\\1';
      }

      rules.push({
        id: id++,
        priority: 1,
        action: {
          type: 'redirect',
          redirect: { regexSubstitution: regexSubstitution }
        },
        condition: {
          regexFilter: regexFilter,
          resourceTypes: ['main_frame']
        }
      });
    }

    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: Array.from({ length: 50 }, (_, i) => i + 1),
      addRules: rules
    }, () => {
      if (chrome.runtime.lastError) {
        console.error(`Error updating rules: ${chrome.runtime.lastError.message}`);
      } else {
        console.log('Redirect rules updated successfully.');
      }
    });
  });
}

updateRules();
