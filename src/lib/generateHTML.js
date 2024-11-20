// lib/generateHTML.js
function generateHTML(template, metadata, contentHtml, stats, percentages, chartScript) {
  const { hpPercentage, pmPercentage } = percentages;

  return template
    .replace(/{{title}}/g, metadata.title || "Untitled")
    .replace(/{{subtitle}}/g, metadata.subtitle || "")
    .replace(/{{firstAppearance}}/g, metadata.firstAppearance || "Unknown")
    .replace(/{{theme}}/g, metadata.theme || "None")
    .replace(/{{affiliation}}/g, metadata.affiliation || "None")
    .replace(/{{hp}}/g, stats.hp || "0/0")
    .replace(/{{pm}}/g, stats.pm || "0/0")
    .replace(/{{hpPercentage}}/g, hpPercentage)
    .replace(/{{pmPercentage}}/g, pmPercentage)
    .replace(/{{background}}/g, metadata.colors.background || "gray")
    .replace(/{{primary}}/g, metadata.colors.primary || "purple")
    .replace(/{{secondary}}/g, metadata.colors.secondary || "purple")
    .replace(/{{sectionBackground}}/g, metadata.colors.sectionBackground || "gray")
    .replace(/{{textPrimary}}/g, metadata.colors.textPrimary || "white")
    .replace(/{{textSecondary}}/g, metadata.colors.textSecondary || "gray")
    .replace(/{{borderGradientStart}}/g, "rgba(147, 51, 234, 1)")
    .replace(/{{borderGradientEnd}}/g, "rgba(236, 72, 153, 1)")
    .replace(/{{imageSrc}}/g, metadata.imageSrc)
    .replace(/{{number}}/g, metadata.number)
    .replace(/{{{content}}}/g, contentHtml)
    .replace(/{{chartScript}}/g, chartScript);
}

module.exports = generateHTML;
