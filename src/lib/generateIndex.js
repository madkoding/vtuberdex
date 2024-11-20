const fs = require("fs");
const path = require("path");

function generateIndex(links, outputDir) {
  const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Index</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-900 text-white">
  <div class="container mx-auto p-6">
    <h1 class="text-4xl font-bold mb-6">Index</h1>
    <ul class="space-y-4">
      ${links
        .map(
          (link) => `
        <li>
          <a href="${link.url}" class="text-purple-500 hover:underline">${link.title}</a>
        </li>
      `
        )
        .join("")}
    </ul>
  </div>
</body>
</html>
`;

  const indexPath = path.join(outputDir, "index.html");
  fs.writeFileSync(indexPath, indexHtml);
  console.log(`Index generated: ${indexPath}`);
}

module.exports = { generateIndex };
