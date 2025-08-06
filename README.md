# Universal Redirect

A privacy-focused Chrome extension that automatically redirects you to alternative, privacy-friendly front-ends for popular websites. Take control of your browsing experience and protect your data from tracking.

## How It Works

This extension uses Chrome's `declarativeNetRequest` API to create redirection rules. When you navigate to a supported website, the extension intercepts the request before it's sent and redirects it to the privacy-focused alternative you've chosen. This method is fast, secure, and respects your privacy because the extension doesn't need to read the content of the pages you visit.

## Why Use Universal Redirect?

Many popular websites, such as Google, YouTube, and Reddit, are known for their extensive tracking and data collection practices. Universal Redirect allows you to bypass these platforms and access their content through alternative front-ends that are designed with privacy in mind. These front-ends offer a more secure and anonymous browsing experience, free from ads, trackers, and other invasive technologies.

### Key Benefits:

*   **Enhanced Privacy:** By redirecting to privacy-focused front-ends, you can significantly reduce the amount of data that is collected about you. These alternatives do not use invasive tracking methods, ensuring that your browsing habits remain private.
*   **Improved Performance:** Alternative front-ends are often lighter and more efficient than their mainstream counterparts. This means faster loading times and a more streamlined user experience, without the clutter of ads and other unnecessary elements.
*   **Greater Control:** Universal Redirect gives you the power to choose how you access content. You can easily switch between different front-ends or add your own custom redirects, giving you full control over your browsing experience.

## Supported Platforms

Universal Redirect supports the following platforms and their privacy-friendly alternatives:

*   **Medium.com** -> **Freedium:** A privacy-respecting front-end for Medium that allows you to read articles without tracking or paywalls.
*   **YouTube.com** -> **Invidious:** An open-source alternative to YouTube that provides a lightweight and ad-free viewing experience.
*   **X.com/Twitter.com** -> **Nitter:** A free and open-source alternative to Twitter that focuses on privacy and performance.
*   **TikTok.com** -> **ProxiTok:** A privacy-respecting front-end for TikTok that allows you to browse content without being tracked.
*   **Google.com** -> **SearXNG:** A metasearch engine that aggregates results from other search engines while protecting your privacy.
*   **Reddit.com** -> **Redlib:** A private front-end for Reddit that offers a clean and anonymous browsing experience.

## How to Install

Since this extension is not yet on the Chrome Web Store, you need to load it manually in Developer Mode.

1.  **Download the code:** Clone this repository or download the source code as a ZIP file and unzip it.
2.  **Open Chrome Extensions:** Navigate to `chrome://extensions` in your Chrome browser.
3.  **Enable Developer Mode:** In the top-right corner of the Extensions page, toggle the "Developer mode" switch on.
4.  **Load the extension:** Click the "Load unpacked" button that appears on the left.
5.  **Select the directory:** In the file dialog, select the folder where you downloaded the extension files (the folder that contains `manifest.json`).

The extension should now be installed and active.

## How to Use

1.  **Open the Options Page:**
    *   Go to the `chrome://extensions` page.
    *   Find the "Universal Redirect" extension card.
    *   Click on the "Details" button.
    *   Click on "Extension options".
    *   Alternatively, you can right-click the extension icon in your browser toolbar and select "Options".

2.  **Add a Redirect Rule:**
    *   On the options page, you will see a simple form.
    *   **Site to redirect:** Select the website you want to redirect from the dropdown list.
    *   **Redirect URL:** Enter *only the hostname* of the alternative front-end you want to use (e.g., `invidious.io`, `nitter.net`). Do not include `https://` or any path.
    *   **Save:** Click the "Save" button.

The rule will be saved, and the extension will start redirecting immediately. You can change the redirect URL at any time by re-saving the options.
