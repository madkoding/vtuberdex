// lib/parseMetadata.js
function parseMetadata(yaml) {
    const lines = yaml.split("\n");
    const metadata = {};
    let currentKey = null;
  
    lines.forEach((line) => {
      if (line.trim() === "") return;
  
      if (/^\s{2}/.test(line)) {
        // Subclave
        const [subKey, subValue] = line.trim().split(/:\s+(.*)/);
        if (currentKey && subKey && subValue !== undefined) {
          if (typeof metadata[currentKey] !== "object") {
            metadata[currentKey] = {};
          }
          metadata[currentKey][subKey.trim().replace(/:$/, "")] = subValue.replace(/^"|"$/g, "").trim();
        }
      } else {
        const [key, value] = line.split(/:\s+(.*)/);
        if (value === undefined) {
          currentKey = key.trim().replace(/:$/, "");
          metadata[currentKey] = {};
        } else {
          metadata[key.trim().replace(/:$/, "")] = value.replace(/^"|"$/g, "").trim();
          currentKey = null;
        }
      }
    });
  
    return metadata;
  }
  
  module.exports = parseMetadata;
  