const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const parseMetadata = require("./lib/parseMetadata");
const generateHTML = require("./lib/generateHTML");
const generateChartScript = require("./lib/generateChart");

// Rutas de archivos y directorios
const templatePath = path.join(__dirname, "templates", "template.html");
const markdownDir = path.join(__dirname, "..", "markdown");
const outputDir = path.join(__dirname, "..", "public");

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Leer plantilla
const template = fs.readFileSync(templatePath, "utf8");

// Procesar archivos Markdown
fs.readdirSync(markdownDir).forEach((file) => {
  if (path.extname(file) === ".md") {
    const filePath = path.join(markdownDir, file);
    const markdown = fs.readFileSync(filePath, "utf8");

    // Extraer metadata
    const metaRegex = /---\s*([\s\S]*?)\s*---/;
    const match = markdown.match(metaRegex);
    let metadata = {};
    if (match) {
      metadata = parseMetadata(match[1].trim());
    }

    // Remover metadata del contenido
    const content = markdown.replace(metaRegex, "").trim();

    // Convertir Markdown a HTML
    const contentHtml = marked(content);

    // Calcular porcentajes para HP y PM
    const stats = metadata.stats || {};
    const [currentHp, totalHp] = (stats.hp || "0/0").split("/").map(Number);
    const [currentPm, totalPm] = (stats.pm || "0/0").split("/").map(Number);
    const hpPercentage = totalHp > 0 ? Math.min((currentHp / totalHp) * 100, 100).toFixed(0) : 0;
    const pmPercentage = totalPm > 0 ? Math.min((currentPm / totalPm) * 100, 100).toFixed(0) : 0;

    // Extraer colores
    const colors = metadata.colors || {
      background: "bg-gray-900",
      border: "border-purple-500",
      text: "text-white",
      chartLines: "rgba(128, 90, 213, 1)",
      chartFill: "rgba(128, 90, 213, 0.2)",
    };

    // Generar script del gráfico
    const chartScript = generateChartScript(stats, colors);

    // Generar HTML final
    const html = generateHTML(
      template,
      metadata,
      contentHtml,
      stats,
      { hpPercentage, pmPercentage },
      chartScript
    );

    // Crear una carpeta para el archivo generado
    const folderName = path.basename(file, ".md");
    const outputFolder = path.join(outputDir, folderName);
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    // Escribir archivo `index.html` en la carpeta correspondiente
    const outputPath = path.join(outputFolder, "index.html");
    fs.writeFileSync(outputPath, html);
    console.log(`Generated: ${outputPath}`);
  }
});
