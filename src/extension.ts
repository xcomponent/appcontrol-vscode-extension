import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { isValidCron } from 'cron-validator';

export function activate(context: vscode.ExtensionContext) {
  // Command to insert YAML templates
  context.subscriptions.push(
    vscode.commands.registerCommand('appcontrol.insertTemplate', async () => {
      const templatesPath = vscode.workspace.getConfiguration().get<string>('appcontrol.templatesPath');
      if (templatesPath) {
        const templatesDir = path.isAbsolute(templatesPath) ? templatesPath : path.join(context.extensionPath, templatesPath);
        const templateFiles = fs.readdirSync(templatesDir).filter(file => file.endsWith('.yaml'));

        const templateOptions = templateFiles.map(file => {
          return { label: file, description: path.join(templatesDir, file) };
        });

        const selectedTemplate = await vscode.window.showQuickPick(templateOptions, {
          placeHolder: 'Select a template to insert'
        });

        if (selectedTemplate) {
          const templateContent = fs.readFileSync(selectedTemplate.description!, 'utf-8');
          const editor = vscode.window.activeTextEditor;
          if (editor) {
            editor.edit(editBuilder => {
              editBuilder.insert(editor.selection.start, templateContent);
            });
          }
        }
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('appcontrol.generateCron', () => {
      const panel = vscode.window.createWebviewPanel(
        'cronGenerator',
        'Cron Expression Generator',
        vscode.ViewColumn.One,
        {}
      );

      panel.webview.html = getWebviewContent();

      panel.webview.onDidReceiveMessage(
        message => {
          switch (message.command) {
            case 'validate':
              validateCronExpression(message.text);
              return;
          }
        },
        undefined,
        context.subscriptions
      );
    })
  );
}

function getWebviewContent() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Quartz Cron Expression Generator</title>
    </head>
    <body>
      <h1>Quartz Cron Expression Generator</h1>
      <input id="cronExpression" type="text" placeholder="Enter Quartz cron expression">
      <button onclick="validateCron()">Validate</button>
      <p id="validationResult"></p>
      <script>
        const vscode = acquireVsCodeApi();
        function validateCron() {
          const cronExpression = document.getElementById('cronExpression').value;
          vscode.postMessage({ command: 'validate', text: cronExpression });
        }
      </script>
    </body>
    </html>
  `;
}


function validateCronExpression(cronExpression: string) {
  // Quartz cron expressions typically include seconds field and year field
  const isValid = isValidCron(cronExpression, { alias: true, seconds: true });

  if (isValid) {
    vscode.window.showInformationMessage('Quartz cron expression is valid!');
  } else {
    vscode.window.showErrorMessage('Quartz cron expression is invalid.');
  }
}

export function deactivate() {
  console.log('AppControl extension is now deactivated.');
}

