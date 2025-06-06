import * as React from 'react';
import { PieChart } from '@mui/x-charts';


const size = {
    width: 290,
    height: 300
};



const MyPayrollPie = ({ Skeleton, loading, dataPayroll }) => {

    const DataNoveltiesCount = dataPayroll
        ? dataPayroll.reduce((acc, data) => {
            const novelty = data.novedad_ausencia === '' || data.novedad_ausencia === undefined || data.novedad_ausencia === null ? 'NOVEDAD SIN JUSTIFICAR' : data.novedad_ausencia;
            acc[novelty] = (acc[novelty] || 0) + 1;
            return acc;
        }, {})
        : {};

    const data = Object.entries(DataNoveltiesCount).map(([novelty, count]) => ({
        value: count,
        label: novelty.length > 5 ? `${novelty.substring(0, 20)}...` : novelty
        // label: novelty
    }));

    const ResultData = data ? data : [];

    const series = [{
        data: ResultData,
        innerRadius: 80,
        cornerRadius: 5,
        highlightScope: { faded: 'global', highlighted: 'item' },
        faded: { color: 'gray' }
    }];
    return (
        <>
            {loading ? (
                <Skeleton variant="rounded" />
            ) : (
                <PieChart
                    series={series}
                    {...size}
                    slotProps={{
                        legend: {
                            direction: 'row',
                            itemMarkWidth: 20,
                            itemMarkHeight: 2,
                            markGap: 5,
                            itemGap: 10,
                            position: {
                                vertical: 'top',
                                horizontal: 'middle',
                            },
                            labelStyle: {
                                fontSize: 8,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontFamily: 'Nunito',
                            }
                        }
                    }}
                />
            )}
        </>
    );
}

export default MyPayrollPie;