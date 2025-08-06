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
        // Special rule for Medium: capture the entire URL and append it.
        regexFilter = `^(https?://(?:[^/]+\\.)?medium\.com/.*)$`;
        // Correctly escaped backreference for the entire match (\0)
        regexSubstitution = `https://${redirectUrl}/\0`;
      } else {
        // General rule for all other sites: capture only the path.
        regexFilter = `^https?://(?:www\.)?${escapedSite}(/.*)$`;
        // Correctly escaped backreference for the first capture group (\1)
        regexSubstitution = `https://${redirectUrl}/\1`;
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
