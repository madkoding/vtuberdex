const { processMarkdownFiles } = require("./lib/processMarkdown");
const { generateIndex } = require("./lib/generateIndex");
const path = require("path");

const markdownDir = path.join(__dirname, "..", "markdown");
const outputDir = path.join(__dirname, "..", "public");
const templatePath = path.join(__dirname, "templates", "template.html");


// Procesar archivos Markdown y generar las páginas
const links = processMarkdownFiles(markdownDir, outputDir, templatePath);

// Generar índice en `/public/index.html`
generateIndex(links, outputDir);

console.log("Site generation completed.");
