import React from 'react';
import { notification } from '../../Exports-Modules/Exports';
import * as XLSX from 'xlsx';

import CreateCapacity from './CreateCapacity/CreateCapacity';

import '../../Pages/Home/Styles/Styles.css';

const HomeCapacity = () => {
    const [api, contextHolder] = notification.useNotification();

    return (
        <>
            {contextHolder}
            <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
                <div className='card-body'>
                    <div className='text-center'>
                        <div className='mb-0 title-Export'>Planeación Largo Plazo</div>
                    </div>
                </div>
            </div>

            <div className='p-3 card border-light shadow-sm bg-body rounded'>
                <CreateCapacity  XLSX={XLSX} api={api} contextHolder={contextHolder}/>
            </div>
        </>
    )
};
export default HomeCapacity;
