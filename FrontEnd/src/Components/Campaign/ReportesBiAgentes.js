import React from 'react';
import PowerBIReports from './PowerBiReports';

const ReportesBiAgentes = () => {
  const embedUrl = 'https://app.powerbi.com/view?r=eyJrIjoiOWVmZDhjYjYtYWVlYi00NmFlLTlmNzUtMTNjNTk0NDQ3ZTZlIiwidCI6ImE1M2VkNGQ4LTAyODMtNDMxMy1iYjIwLWRjMzUwNDI4ZDg1OSIsImMiOjR9';
  const embedToken = 'TU_EMBED_TOKEN';
  const reportId = '3b302ef3-d785-4af3-bcb5-909dcae61808'; // Asegúrate de cambiar esto con el ID correcto de tu informe

  return (
    <div>
      <h1>Power BI Report</h1>
      <PowerBIReports embedUrl={embedUrl} embedToken={embedToken} reportId={reportId} />
    </div>
  );
};

export default ReportesBiAgentes;
