const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'frontend/src/FocusFlow.jsx');
const destPath = path.join(__dirname, 'frontend/public/FocusFlow.html'); // or just frontend/FocusFlow.html depending on where user wants it

const jsxContent = fs.readFileSync(srcPath, 'utf8');

let newJsx = jsxContent
  .replace(/import\s+{([^}]+)}\s+from\s+['"]react['"];/g, 'const {$1} = React;')
  .replace(/import\s+{([^}]+)}\s+from\s+['"]recharts['"];/g, 'const {$1} = Recharts;')
  .replace(/export\s+default\s+function\s+FocusFlow/g, 'function FocusFlow');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FocusFlow Standalone</title>
    <!-- React and ReactDOM -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
    <!-- Recharts Dependencies -->
    <script src="https://unpkg.com/prop-types@15.8.1/prop-types.min.js"></script>
    <script src="https://unpkg.com/recharts@2.12.7/umd/Recharts.js" crossorigin></script>
    <!-- Babel standalone for JSX -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
${newJsx}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FocusFlow />);
    </script>
</body>
</html>`;

fs.writeFileSync(destPath, htmlContent);
console.log('FocusFlow.html created successfully at ' + destPath);