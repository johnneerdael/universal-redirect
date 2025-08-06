# Universal Redirect

A generic Chrome extension for creating custom URL redirects.

## Overview

Universal Redirect allows you to define your own redirection rules. You can specify a source website (e.g., `medium.com`) and a destination URL (e.g., `freedium.cfd`), and the extension will automatically redirect you whenever you visit a page on the source website.

This is useful for:
*   Bypassing paywalls by redirecting to alternative front-ends (like a Medium.com article to a Freedium link).
*   Redirecting from old domains to new ones.
*   Creating custom URL shortcuts.

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
    *   **Site to redirect:** Select the website you want to redirect from the dropdown list (currently, only Medium.com is available).
    *   **Redirect URL:** Enter the domain you want to redirect to (e.g., `freedium.cfd`). Do not include `https://` or any path.
    *   **Save:** Click the "Save" button.

The rule will be saved, and the extension will start redirecting immediately. You can change the redirect URL at any time by re-saving the options.
