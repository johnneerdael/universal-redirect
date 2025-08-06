# Project Overview

This project is a simple yet effective Chrome extension called "Freedium." Its main purpose is to automatically redirect all Medium.com articles to Freedium, a privacy-friendly alternative front-end. By intercepting URL requests to Medium.com, the extension ensures that users can access content without being tracked.

The extension is built using `manifest.json`, which defines its core functionalities and permissions. The redirection logic is handled by a declarative rule in the `rules.json` file, which matches Medium.com URLs and redirects them to the corresponding Freedium URL. This approach ensures that the extension is lightweight and efficient, as it does not require a background script to handle redirections.

## Directory Overview

The directory is structured to support a Chrome extension, with all the necessary files for it to function correctly. It includes the manifest file, which defines the extension's behavior, and a `rules.json` file, which specifies the redirection logic. Additionally, it contains an `icons` folder with different-sized icons for the extension, ensuring it is visually represented across different contexts in the browser.

## Key Files

- **`manifest.json`**: The manifest file is the heart of the extension, defining its name, version, and permissions. It specifies that the extension requires the `declarativeNetRequest` permission to intercept and redirect URLs. It also sets the host permissions to allow the extension to run on all Medium.com subdomains, ensuring comprehensive coverage.

- **`rules.json`**: This file contains the redirection logic, which is implemented using a declarative rule. The rule is configured to match any URL from Medium.com and redirect it to Freedium, preserving the original article path. This method is efficient and respects user privacy, as it avoids running unnecessary background scripts.

- **`icons/`**: This folder contains all the icons for the extension, with different sizes for various parts of the Chrome UI, such as the toolbar, extensions page, and favicon.

## Usage

To use this extension, you need to load it into Chrome in developer mode. First, download all the files and place them in a single directory. Then, open Chrome and navigate to `chrome://extensions`. Enable "Developer mode" and click "Load unpacked." Finally, select the directory containing the extension files, and it will be ready to use. Once installed, the extension will automatically redirect all Medium.com articles to Freedium without any further configuration.
