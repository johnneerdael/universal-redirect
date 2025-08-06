chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (namespace === 'sync') {
      updateRules();
    }
  }
});

function updateRules() {
  chrome.storage.sync.get(null, function(items) {
    const rules = [];
    let id = 1;
    for (const [site, redirectUrl] of Object.entries(items)) {
      rules.push({
        id: id++,
        priority: 1,
        action: {
          type: 'redirect',
          redirect: {
            regexSubstitution: `https://${redirectUrl}/\\1`
          }
        },
        condition: {
          regexFilter: `^(https?://(?:[^/]+\.)?${site}/.*)`,
          resourceTypes: ['main_frame']
        }
      });
    }

    chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: Array.from({ length: 50 }, (_, i) => i + 1), addRules: rules });
  });
}

updateRules();
