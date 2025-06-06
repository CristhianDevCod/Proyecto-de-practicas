import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const HourExtra = ({ dataPayrollHourExtra, loading, Skeleton }) => {

    const mapHours = (data, columnName) => {
        return data.map(item => {
            return item[columnName];
        });
    };

    const Dates = dataPayrollHourExtra ? dataPayrollHourExtra.map((item) => {
        const fecha = item.fecha;
        const day = fecha.split('-')[2];
        return day;
    }) : [];


    const horaExtraOrdinaria = mapHours(dataPayrollHourExtra, 'H_E_O');
    const extraHoraNocturna = mapHours(dataPayrollHourExtra, 'E_H_N');
    const horaExtraDominical = mapHours(dataPayrollHourExtra, 'H_E_D_D');
    const horaExtraFestivoDominical = mapHours(dataPayrollHourExtra, 'H_E_F_D');
    const horaExtraDominicalNocturna = mapHours(dataPayrollHourExtra, 'H_E_D_N');
    const horaExtraFestivoNocturna = mapHours(dataPayrollHourExtra, 'H_E_F_N');


    const series = [
        { data: horaExtraOrdinaria, label: 'Hora Extra Ordinaria' },
        { data: extraHoraNocturna, label: 'Extra Hora Nocturna' },
        { data: horaExtraDominical, label: 'Hora Extra Diurna Dominical' },
        { data: horaExtraFestivoDominical, label: 'Hora Extra Festivo Dominical' },
        { data: horaExtraDominicalNocturna, label: 'Hora Extra Dominical Nocturna' },
        { data: horaExtraFestivoNocturna, label: 'Hora Extra Festivo Nocturna' }
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
            </ >
        )
    );
}

export default HourExtra