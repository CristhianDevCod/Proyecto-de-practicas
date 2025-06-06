import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


const MyPayrollCharts = ({ dataPayroll, loading, Skeleton }) => {

    const pData = dataPayroll ? dataPayroll.map((item) => {
        var hora = item.horas_dimensionadas_hora;

        var partes = hora.split(':');
        var horas = parseFloat(partes[0]);
        var minutos = parseFloat(partes[1]);
        var horaDecimal = horas + (minutos / 100);
        return horaDecimal;
    }) : 0;

    const uData = dataPayroll ? dataPayroll.map((item) => {
        var hora = item.horas_presente;

        var partes = hora.split(':');
        var horas = parseFloat(partes[0]);
        var minutos = parseFloat(partes[1]);
        var horaDecimal = parseFloat(horas + (minutos / 100));

        return horaDecimal;
    }) : 0;

    const Dates = dataPayroll ? dataPayroll.map((item) => {
        const fecha = item.fecha;
        const day = fecha.split('-')[2];
        return day;
    }) : [];



    const DataP = pData ? pData : [];
    const DataU = uData ? uData : [];

    return (
        loading ? (
            <Skeleton variant="rounded" width={400} />
        ) : (

            <BarChart
                height={300}
                borderRadius={5}
                yAxis={[{ data: DataP, scaleType: 'linear', label: 'Cantidad' }]}
                xAxis={[{ data: Dates, scaleType: 'band' }]}
                series={[{ data: DataP, label: 'Meta', color: '#453df7' }, { data: DataU, label: 'Mi meta', color: '#c8c5fd' }]}
                grid={{ horizontal: true }}
                slotProps={{
                    legend: {
                        itemMarkWidth: 20,
                        itemMarkHeight: 2,
                        markGap: 5,
                        itemGap: 10,
                        labelStyle: {
                            fontSize: 10,
                            fill: 'black',
                            fontWeight: 'bold',
                            fontFamily: 'Nunito',
                        },

                    }
                }}
            />
        )
    );
};

export default MyPayrollCharts;
