# AppControl Schema VSCode Extension

## Overview

The AppControl Schema VSCode Extension provides a comprehensive toolset for working with AppControl configuration files. This extension includes features such as YAML autocompletion for AppControl schemas, snippets for cron expressions, and templates for AppControl files.

Appcontrol website is https://appcontrol.xcomponent.com. 

AppControl is positioned as an essential solution for businesses looking to ensure the continuity and operational integrity of their applications, whether in the cloud or on-premises. With advanced shutdown and restart management, diagnostics, and continuous auditing capabilities, AppControl enables businesses of all sizes to maintain uninterrupted operations and focus on growth.


## Features

- **YAML Autocompletion**: Provides autocompletion for AppControl YAML configuration files, helping to ensure correct syntax and structure.
- **Cron Snippets**: Includes predefined snippets for common Quartz cron expressions, making it easier to schedule tasks.
- **Template Management**: Allows users to use templates packaged with this extension.

## Installation

1. Clone this repository or download the extension from the VSCode Marketplace.
2. Open VSCode and navigate to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Click on the three dots in the upper right corner of the Extensions view and select "Install from VSIX".
4. Select the downloaded `.vsix` file and install the extension.

## Usage

### YAML Autocompletion

To use the YAML autocompletion feature:

1. Open a YAML file in VSCode.
2. Start typing your AppControl configuration. You will see autocompletion suggestions based on the AppControl schema.
3. Select the appropriate suggestions to ensure correct configuration.

### Cron Snippets

To use the predefined Quartz cron snippets:

1. Open a YAML file in VSCode.
2. Type `quartz-` and select from the available cron snippets such as `quartz-every-minute`, `quartz-every-hour`, etc.
3. The selected cron expression will be inserted into your YAML file.

### Template Management

To use templates:

1. Create empty file
2. Press `Ctrl+Shift+P` to open the command palette.
2. Type `AppControl: Insert Templates` and press Enter.

## Commands

- `AppControl: Insert Template`: Get templates delivered in this extension.
- `AppControl: Generate Quartz Cron Expression`: Opens a webview for generating and validating Quartz cron expressions.

## Extension Settings

This extension does not include any specific settings.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

This extension uses the following open-source libraries:
- [simple-git](https://github.com/steveukx/git-js) for Git operations.
- [cron-validator](https://github.com/kelektiv/node-cron) for validating cron expressions.
