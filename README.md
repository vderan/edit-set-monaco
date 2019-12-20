# Monaco Editor Webpack Loader Plugin

A plugin to simplify loading the [Monaco Editor](https://github.com/Microsoft/monaco-editor) with [webpack](https://webpack.js.org/).

## Installing
```sh
npm install monaco-editor-webpack-plugin
```

## Using
* `webpack.config.js`:
```js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new MonacoWebpackPlugin()
  ]
};
```

* `index.js`:
```js
import * as monaco from 'monaco-editor'
// or import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// if shipping only a subset of the features & languages is desired

monaco.editor.create(document.getElementById('container'), {
  value: 'console.log("Hello, world")',
  language: 'javascript'
});
```

## Options

Options can be passed in to `MonacoWebpackPlugin`. They can be used to generate a smaller editor bundle by selecting only certain languages or only certain editor features:

* `filename` (`string`) - custom filename template for worker scripts, respects the same options as [loader-utils' interpolateName](https://github.com/webpack/loader-utils#interpolatename). Useful for adding content-based hashes so that files can be served with long-lived caching headers.
  * default value: `'[name].worker.js'`.
* `publicPath` (`string`) - custom public path for worker scripts, overrides the public path from which files generated by this plugin will be served. This wins out over Webpack's dynamic runtime path and can be useful to avoid attempting to load workers cross-origin when using a CDN for other static resources. Use e.g. '/' if you want to load your resources from the current origin..
  * default value: `''`.
* `languages` (`string[]`) - include only a subset of the languages supported.
  * default value: <!-- LANGUAGES_BEGIN -->`['apex', 'azcli', 'bat', 'clojure', 'coffee', 'cpp', 'csharp', 'csp', 'css', 'dockerfile', 'fsharp', 'go', 'handlebars', 'html', 'ini', 'java', 'javascript', 'json', 'less', 'lua', 'markdown', 'msdax', 'mysql', 'objective', 'perl', 'pgsql', 'php', 'postiats', 'powerquery', 'powershell', 'pug', 'python', 'r', 'razor', 'redis', 'redshift', 'ruby', 'rust', 'sb', 'scheme', 'scss', 'shell', 'solidity', 'sql', 'st', 'swift', 'typescript', 'vb', 'xml', 'yaml']`<!-- LANGUAGES_END -->.

  Some languages share the same web worker. If one of the following languages is included, you must also include the language responsible for instantiating their shared worker:

  | Language      | Instantiator  |
  | ------------- | ------------- |
  | javascript    | typescript    |
  | handlebars    | html          |
  | scss, less    | css           |



* `features` (`string[]`) - include only a subset of the editor features.
  * default value: <!-- FEATURES_BEGIN -->`['accessibilityHelp', 'bracketMatching', 'caretOperations', 'clipboard', 'codeAction', 'codelens', 'colorDetector', 'comment', 'contextmenu', 'coreCommands', 'cursorUndo', 'dnd', 'find', 'folding', 'fontZoom', 'format', 'goToDefinitionCommands', 'goToDefinitionMouse', 'gotoError', 'gotoLine', 'hover', 'inPlaceReplace', 'inspectTokens', 'iPadShowKeyboard', 'linesOperations', 'links', 'multicursor', 'parameterHints', 'quickCommand', 'quickOutline', 'referenceSearch', 'rename', 'smartSelect', 'snippets', 'suggest', 'toggleHighContrast', 'toggleTabFocusMode', 'transpose', 'wordHighlighter', 'wordOperations', 'wordPartOperations']`<!-- FEATURES_END -->.
  * excluded features: It is also possible to exclude certain default features prefixing them with an exclamation mark '!'.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
