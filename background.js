chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'sync') {
    updateRules();
  }
});

function updateRules() {
  chrome.storage.sync.get(null, function(items) {
    const rules = [];
    let id = 1;

    const mediumLikeSites = [
      'medium.com', 'towardsaws.com', 'hackernoon.com', 'medium.freecodecamp.org', 'medium.mybridge.co',
      'proandroiddev.com', 'blog.usejournal.com', 'blog.angularindepth.com', 'blog.bitsrc.io',
      'blog.devartis.com', 'blog.maddevs.io', 'blog.getambassador.io', 'instagram-engineering.com',
      'calia.me', 'engineering.opsgenie.com', 'android.jlelse.eu', 'robinhood.engineering',
      'blog.hipolabs.com', 'ux.shopify.com', 'enlear.academy', 'cantorsparadise.com',
      'blog.roost.io', '500ish.com', 'faun.pub', 'asleekgeek.com', 'andrewzuo.com', 'awstip.com',
      'baos.pub', 'plainenglish.io', 'betterappsec.com', 'blog.angulartraining.com',
      'blog.codegiant.io', 'blog.coffeeapplied.com', 'blog.devgenius.io', 'blog.kotlin-academy.com',
      'blog.kubernauts.io', 'blog.securitybreak.io', 'blog.securityevaluators.com',
      'blog.startupstash.com', 'bytes.grubhub.com', 'coinsbench.com', 'engineering.talkdesk.com',
      'interviewnoodle.com', 'levelupprogramming.net', 'marcbalmer.ch', 'medium.matcha.fyi',
      'netflixtechblog.com', 'pub.towardsai.net', 'systemweakness.com', 'tech.olx.com',
      'techuisite.com', 'themakingofamillionaire.com', 'trading-data-analysis.pro',
      'unbounded.io', 'wire.insiderfinance.io', 'inbitcoinwetrust.net', 'blog.dancounsell.com',
      'experiencestack.co', 'golang.thisweekin.io', 'insightsndata.com'
    ];

    const mediumRedirectUrl = items['medium.com'];
    const mediumLogic = items['mediumLogic'] || 'freedium';

    if (mediumRedirectUrl) {
      for (const site of mediumLikeSites) {
        const escapedSite = site.replace(/\./g, '\\.');
        let regexFilter, regexSubstitution;

        if (mediumLogic === 'freedium') {
          // Existing logic for Freedium - appends the full URL
          regexFilter = `^https?://(?:[^/]+\\.)?${escapedSite}(/.*)`;
          regexSubstitution = `https://${mediumRedirectUrl}\\1`;
        } else {
          // New logic for Scribe - redirects to the base URL
          regexFilter = `^https?://(?:[^/]+\\.)?${escapedSite}(/.*)`;
          regexSubstitution = `https://${mediumRedirectUrl}`;
        }
        
        rules.push({
          id: id++,
          priority: 1,
          action: { type: 'redirect', redirect: { regexSubstitution: regexSubstitution } },
          condition: { regexFilter: regexFilter, resourceTypes: ['main_frame'] }
        });
      }
    }

    // Process other rules from storage that are not medium-like
    for (const [site, redirectUrl] of Object.entries(items)) {
      if (!redirectUrl || site === 'medium.com' || site === 'mediumLogic') continue;

      const escapedSite = site.replace(/\./g, '\\.');
      let regexFilter;
      if (site === 'instagram.com') {
        regexFilter = `^https?:\/\/(?:www\.)?${escapedSite}\/(p|reel)\/([^\/]+)\/?`;
      } else {
        regexFilter = `^https?:\/\/(?:www\.)?${escapedSite}(\/.*)`;
      }
      const regexSubstitution = `https://${redirectUrl}\\1`;

      rules.push({
        id: id++,
        priority: 1,
        action: { type: 'redirect', redirect: { regexSubstitution: regexSubstitution } },
        condition: { regexFilter: regexFilter, resourceTypes: ['main_frame'] }
      });
    }

    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: Array.from({ length: 100 }, (_, i) => i + 1),
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