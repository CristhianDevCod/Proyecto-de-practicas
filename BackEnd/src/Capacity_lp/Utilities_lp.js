import moment from 'moment';

// FUNCIÓN PARA CONVERTIR VALOR A FECHA EN CASO DE QUE LLEGUE POR EJEMPLO: 08/06/2024
const ExcelDateToJSDate = (serial) => {
  const start = new Date(Date.UTC(1900, 0, 1));
  const excelLeapYearAdjustment = 1;

  const days = Math.floor(serial);
  const ms = (serial - days) * 86400000;

  const date = new Date(start.getTime() + (days - excelLeapYearAdjustment) * 86400000 + ms);
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - timezoneOffset);
};

// FUNCIÓN EXTRA PARA CONVERTIR FECHAS DE EXCEL A JS
const convertirSerialAFecha = (valor) => {
  if (typeof valor === 'number') {
    const fecha = ExcelDateToJSDate(valor);
    return moment(fecha).format('YYYY-MM-DD');
  }
  const formatos = ['DD-MM-YYYY', 'YYYY-MM-DD', 'MM/DD/YYYY', 'YYYY/MM/DD'];
  for (let formato of formatos) {
    const fecha = moment(valor, formato, true);
    if (fecha.isValid()) {
      return fecha.format('YYYY-MM-DD');
    }
  }
  return null;
};

module.exports = { convertirSerialAFecha, ExcelDateToJSDate };
