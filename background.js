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
      let regexFilter, regexSubstitution;
      if (site === 'youtube.com') {
        regexFilter = `^(https?://(?:www\\.)?youtube\\.com/watch\\?v=(.*))`;
        regexSubstitution = `https://${redirectUrl}/watch?v=\1`;
      } else if (site === 'x.com') {
        regexFilter = `^(https?://(?:www\\.)?x\\.com/(.*))`;
        regexSubstitution = `https://${redirectUrl}/`;
      } else if (site === 'tiktok.com') {
        regexFilter = `^(https?://(?:www\\.)?tiktok\\.com/(.*))`;
        regexSubstitution = `https://${redirectUrl}/`;
      } else if (site === 'google.com') {
        regexFilter = `^(https?://(?:www\\.)?google\\.com/search\\?q=(.*))`;
        regexSubstitution = `https://${redirectUrl}/search?q=`;
      } else if (site === 'reddit.com') {
        regexFilter = `^(https?://(?:www\\.)?reddit\\.com/(.*))`;
        regexSubstitution = `https://${redirectUrl}/`;
      } else {
        regexFilter = `^(https?://(?:[^/]+\\.)?${site}/.*)$`;
        regexSubstitution = `https://${redirectUrl}/`;
      }

      rules.push({
        id: id++,
        priority: 1,
        action: {
          type: 'redirect',
          redirect: {
            regexSubstitution
          }
        },
        condition: {
          regexFilter,
          resourceTypes: ['main_frame']
        }
      });
    }

    chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: Array.from({ length: 50 }, (_, i) => i + 1), addRules: rules });
  });
}

updateRules();
