function generateChartScript(stats, colors) {
    const resistencia = parseInt(stats.resistencia) || 0;
    const carisma = parseInt(stats.carisma) || 0;
    const creatividad = parseInt(stats.creatividad) || 0;
    const actitud = parseInt(stats.actitud) || 0;
  
    const chartLines = colors.chartLines || "rgba(128, 90, 213, 1)";
    const chartFill = colors.chartFill || "rgba(128, 90, 213, 0.2)";
  
    return `
      const ctx = document.getElementById('statsChart').getContext('2d');
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Resistencia', 'Carisma', 'Creatividad', 'Actitud'],
          datasets: [{
            label: 'Atributos',
            data: [${resistencia}, ${carisma}, ${creatividad}, ${actitud}],
            backgroundColor: '${chartFill}',
            borderColor: '${chartLines}',
            borderWidth: 2,
          }],
        },
        options: {
          scales: {
            r: {
              min: 0,
              max: 100,
              ticks: {
                color: '#ffffff',
                backdropColor: 'transparent',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
              angleLines: {
                color: 'rgba(255, 255, 255, 0.3)',
              },
              pointLabels: {
                color: '#ffffff',
              },
            },
          },
        },
      });
    `;
  }
  
  module.exports = generateChartScript;
  