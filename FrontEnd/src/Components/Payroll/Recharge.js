import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const Recharge = ({ dataPayroll, loading, Skeleton }) => {
    // Función para mapear las horas de las diferentes columnas
    const mapHours = (data, columnName) => {
        return data.map(item => {
            return item[columnName];
        });
    };

    const Dates = dataPayroll ? dataPayroll.map((item) => {
        const fecha = item.fecha;
        const day = fecha.split('-')[2];
        return day;
    }) : [];

    const horaNocturna = mapHours(dataPayroll, 'HORA_NOCTURNA');
    const horaDominical = mapHours(dataPayroll, 'HORA_DOMINICAL');
    const horaDominicalNocturna = mapHours(dataPayroll, 'HORA_DOMINICAL_NOCTURNA');
    const horaFestivo = mapHours(dataPayroll, 'HORA_FESTIVO');
    const horaFestivoNocturna = mapHours(dataPayroll, 'HORA_FESTIVO_NOCTURNA');

    // Combina todas las horas en un array para usarlo en el gráfico
    const series = [
        { data: horaNocturna, label: 'Recargo Nocturno' },
        { data: horaDominical, label: 'Recargo Dominical' },
        { data: horaDominicalNocturna, label: 'Recargo Dominical Nocturno' },
        { data: horaFestivo, label: 'Recargo Festivo' },
        { data: horaFestivoNocturna, label: 'Recargo Festivo Nocturno' }
    ];

    const DataP = series ? series : [];

    return (

        loading ? (
            <Skeleton variant="rounded" width={400} />
        ) : (
            <>
                <BarChart
                    height={300}
                    series={DataP}
                    xAxis={[{
                        data: Dates, scaleType: 'band',
                        colorMap: {
                            type: 'ordinal',
                            colors: ['#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#08589e']
                        }
                    }]}
                    borderRadius={5}
                    grid={{ horizontal: true }}
                    slotProps={{
                        legend: {
                            // direction: 'column',
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
            </>
        )
    );
};

export default Recharge;
