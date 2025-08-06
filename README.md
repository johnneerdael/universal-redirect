# Universal Redirector

**Universal Redirector** is a powerful and flexible Chrome extension that automatically redirects URLs from a predefined list of websites to a user-specified destination. It's particularly useful for redirecting from popular platforms like Medium and YouTube to privacy-friendly or alternative front-ends.

## Features

- **Automatic Redirection**: Seamlessly redirects pages in the background without any user interaction.
- **Custom Destination**: Configure your preferred destination URL for redirections.
- **Wide Range of Supported Sites**: Includes a comprehensive list of Medium-like websites and is easily expandable.
- **Efficient and Lightweight**: Uses Chrome's `declarativeNetRequest` API for high performance and minimal resource usage.
- **Open Source**: The code is open for anyone to inspect, modify, and contribute.

## Installation

### From the Chrome Web Store (Recommended)

Once the extension is published, you will be able to install it directly from the Chrome Web Store.

1.  Go to the extension's page on the Chrome Web Store.
2.  Click "Add to Chrome".
3.  The extension will be installed and ready to use.

### Local Installation for Development

If you want to install the extension locally for testing or development:

1.  Clone this repository to your local machine:
    ```bash
    git clone <repository-url>
    ```
2.  Open Google Chrome and navigate to `chrome://extensions`.
3.  Enable **Developer mode** using the toggle switch in the top-right corner.
4.  Click the **Load unpacked** button.
5.  Select the directory where you cloned the repository.

The extension will now be active.

## How to Use

After installation, you need to configure the redirection settings:

1.  Right-click the extension icon in the Chrome toolbar and select **Options**.
2.  In the options page, you will see input fields for the sites you can redirect (e.g., `medium.com`, `youtube.com`).
3.  Enter the destination URL where you want the sites to be redirected. For example, if you want Medium articles to go to `freedium.cfd`, you would enter `freedium.cfd` in the input field for `medium.com`.
4.  The changes are saved automatically, and the redirection rules will be updated instantly.

### Alternative Front-ends

This extension is great for redirecting to privacy-respecting alternative front-ends. Here are some popular examples:

- **Invidious**: An alternative front-end to YouTube. Find instances at [docs.invidious.io](https://docs.invidious.io/instances/).
- **Nitter**: An alternative front-end to Twitter. Find instances at [github.com/zedeus/nitter/wiki/Instances](https://github.com/zedeus/nitter/wiki/Instances).
- **SearXNG**: A privacy-respecting metasearch engine. Find instances at [searx.space](https://searx.space/).
- **ProxiTok**: A privacy-respecting front-end for TikTok. Find instances at [github.com/pablouser1/ProxiTok#instances](https://github.com/pablouser1/ProxiTok#instances).
- **Redlib**: A private front-end for Reddit. Find instances at [github.com/redlib-org/redlib#instances](https://github.com/redlib-org/redlib#instances).

## Supported Sites

The extension automatically redirects the following sites if a destination for `medium.com` is configured:

- towardsaws.com
- hackernoon.com
- medium.freecodecamp.org
- medium.mybridge.co
- proandroiddev.com
- blog.usejournal.com
- blog.angularindepth.com
- blog.bitsrc.io
- blog.devartis.com
- blog.maddevs.io
- blog.getambassador.io
- instagram-engineering.com
- calia.me
- engineering.opsgenie.com
- android.jlelse.eu
- robinhood.engineering
- blog.hipolabs.com
- ux.shopify.com
- enlear.academy
- www.cantorsparadise.com
- blog.roost.io
- 500ish.com
- faun.pub
- asleekgeek.com
- andrewzuo.com
- awstip.com
- baos.pub
- *.plainenglish.io
- betterappsec.com
- blog.angulartraining.com
- blog.codegiant.io
- blog.coffeeapplied.com
- blog.devgenius.io
- blog.kotlin-academy.com
- blog.kubernauts.io
- blog.securitybreak.io
- blog.securityevaluators.com
- blog.startupstash.com
- bytes.grubhub.com
- coinsbench.com
- engineering.talkdesk.com
- interviewnoodle.com
- levelupprogramming.net
- marcbalmer.ch
- medium.matcha.fyi
- netflixtechblog.com
- pub.towardsai.net
- systemweakness.com
- tech.olx.com
- techuisite.com
- themakingofamillionaire.com
- trading-data-analysis.pro
- unbounded.io
- wire.insiderfinance.io
- www.inbitcoinwetrust.net
- blog.dancounsell.com
- experiencestack.co
- golang.thisweekin.io
- insightsndata.com

## Publishing to the Chrome Web Store

To publish the extension to the Chrome Web Store, follow these steps:

1.  Ensure all development files and unnecessary assets (like `.git`, `.DS_Store`, `.env`, `GEMINI.md`) are excluded. The provided `zip` command handles this.
2.  Create a `zip` file of the extension's contents:
    ```bash
    zip -r universal-redirect.zip . -x "*.git*" -x "*.DS_Store" -x "README.md" -x ".env" -x "GEMINI.md"
    ```
3.  Go to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard).
4.  Click on **Add new item**.
5.  Upload the `universal-redirect.zip` file.
6.  Complete the store listing information, including the extension's name, description, icons, and screenshots.
7.  Under the "Privacy practices" tab, be transparent about what the extension does.
8.  Once you have filled out all the required fields, you can submit the extension for review by clicking **Publish**.

---

Thank you for using Universal Redirector!