const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const parseMetadata = require("./parseMetadata");
const generateHTML = require("./generateHTML");
const generateChartScript = require("./generateChart");
const { ensureDir, readFile } = require("./utils/fileUtils");

function processMarkdownFiles(markdownDir, outputDir, templatePath) {
  const links = [];
  const template = readFile(templatePath);

  fs.readdirSync(markdownDir).forEach((file) => {
    if (path.extname(file) === ".md") {
      const filePath = path.join(markdownDir, file);
      const markdown = readFile(filePath);

      const metaRegex = /---\s*([\s\S]*?)\s*---/;
      const match = markdown.match(metaRegex);
      let metadata = {};
      if (match) {
        metadata = parseMetadata(match[1].trim());
      }

      const content = markdown.replace(metaRegex, "").trim();
      const contentHtml = marked(content);

      const stats = metadata.stats || {};
      const [currentHp, totalHp] = (stats.hp || "0/0").split("/").map(Number);
      const [currentPm, totalPm] = (stats.pm || "0/0").split("/").map(Number);
      const hpPercentage = totalHp > 0 ? Math.min((currentHp / totalHp) * 100, 100).toFixed(0) : 0;
      const pmPercentage = totalPm > 0 ? Math.min((currentPm / totalPm) * 100, 100).toFixed(0) : 0;

      const colors = metadata.colors || {};
      const chartScript = generateChartScript(stats, colors);

      const html = generateHTML(template, metadata, contentHtml, stats, { hpPercentage, pmPercentage }, chartScript);

      const folderName = path.basename(file, ".md");
      const outputFolder = path.join(outputDir, folderName);
      ensureDir(outputFolder);

      const outputPath = path.join(outputFolder, "index.html");
      fs.writeFileSync(outputPath, html);

      links.push({
        title: metadata.title || folderName,
        url: `./${folderName}/`,
      });

      console.log(`Generated: ${outputPath}`);
    }
  });

  return links;
}

module.exports = { processMarkdownFiles };
