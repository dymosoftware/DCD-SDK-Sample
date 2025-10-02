# Simple Print

1. Run the `SimplePrint.html` and a label should be printed

2. Open the `Console` in browser to see the log messages (`Control+Shift+J` for Chrome in Windows)

3. If you want to edit the label text, change the content of `SimplePrintLabel.js` file. Alternatively, edit the `SimplePrint.label` file with the Dymo software (use the [old software](https://www.dymo.com/support?cfid=dymo-compatibility-chart) is recommended).
Then open the edited `SimplePrint.label` file and copy the content to `SimplePrintLabel.js` file. Finally, add `\` at the end of each line (except the last, after `;`). In VS Code you can search for `$` (press the `.*` button) and replace with `\`.