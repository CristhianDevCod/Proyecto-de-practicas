import { React, useEffect, useState, useContext, Avatar, Tooltip, ArrowLeftRoundedIcon, ArrowRightRoundedIcon, CircularProgress, useCallback } from '../../Exports-Modules/Exports';
import Button from '@mui/joy/Button';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';


import { UserProfileContext } from '../../Context/ProfileContex';

import './Styles/Styles.css';
import Shifts from './Shifts/Shifts';
import NotShifts from './NotShifts/NotShifts';
import Service from '../../Machine/Service';
import Search from './Search/Search';
import DetailsShifts from './DetailsShifts';
import apiClient from '../../Service/Service';

const MyGroup = () => {
    const { Servidor, accessToken } = Service();
    const { fullName } = useContext(UserProfileContext);
    const [weekDates, setWeekDates] = useState([]);
    const [tableData, setTableData] = useState({});
    const [tableDataSHIFTS, setTableDataSHIFTS] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [messageError, setmessageError] = useState('');
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
    const [selectedShift, setSelectedShift] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);



    const getCurrentWeekDates = useCallback(() => {
        const currentDate = new Date();
        const currentDay = currentDate.getDay();

        // Restar días necesarios para que la semana comience en lunes
        const weekStartDate = new Date(currentDate);
        weekStartDate.setDate(currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1) + (currentWeekIndex * 7));

        // Establecer las horas en 0 para evitar problemas con las horas meridianas
        weekStartDate.setHours(0, 0, 0, 0);

        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStartDate);
            date.setDate(weekStartDate.getDate() + i);
            weekDates.push(date);
        }
        return weekDates;
    }, [currentWeekIndex]);


    useEffect(() => {
        const dates = getCurrentWeekDates();
        setWeekDates(dates);
    }, [getCurrentWeekDates]);

    useEffect(() => {
        setLoading(true);
        const dates = getCurrentWeekDates();
        setWeekDates(dates);
        const Usuario_Red = fullName && fullName.map((data) => data.Usuario_Red)
        apiClient.get(`http://${Servidor}/API/GET/LIST-ADVISER/FOR-BOSS/${Usuario_Red}`)
            .then(response => {
                setLoading(false);
                setTableData(response.data);
                setTableDataSHIFTS(response.data.SHIFTS);
            })
            .catch(error => {
                setLoading(false);
                setmessageError('Error al obtener los datos');
            });
    }, [fullName, Servidor, currentWeekIndex, accessToken, getCurrentWeekDates]);

    //manejador para pasar las semanas 
    const handleNextWeek = () => {
        setCurrentWeekIndex(currentWeekIndex + 1);
    };
    //manejador para retroceder las semanas 
    const HandleBackWeek = () => {
        setCurrentWeekIndex(currentWeekIndex - 1);
    }

    //manejador para poner la semana actual  
    const handleResetWeek = () => {
        setCurrentWeekIndex(0);
    };

    const filteredTableData = tableData.ADVISER ? tableData.ADVISER.filter((adviser) =>
        adviser.Nombres.toLowerCase().includes(searchTerm.toLowerCase()) || adviser.Apellidos.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

 
    const isToday = (someDate) => {
        const today = new Date();
        return someDate.getDate() === today.getDate() && someDate.getMonth() === today.getMonth() && someDate.getFullYear() === today.getFullYear();
    };

    const formatTime = (time) => {
        const [hour, minute] = time.split(':');
        return `${hour}:${minute}`;
    };
    return (
        <>
            <div className='card border-light mt-3 mb-3 shadow-sm bg-body rounded'>
                <div className='card-body'>
                    <div className='text-center'>
                        <div className='mb-0 title-vista-semanal'>Vista semanal</div>
                    </div>
                </div>
            </div>

            <div className='card border-light'>
                <Search
                    Button={Button}
                    Tooltip={Tooltip}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    HandleBackWeek={HandleBackWeek}
                    handleNextWeek={handleNextWeek}
                    handleResetWeek={handleResetWeek}
                    HomeRoundedIcon={HomeRoundedIcon}
                    currentWeekIndex={currentWeekIndex}
                    ArrowLeftRoundedIcon={ArrowLeftRoundedIcon}
                    ArrowRightRoundedIcon={ArrowRightRoundedIcon}
                />
                <div className='d-flex justify-content-center'>
                    {loading ? (<CircularProgress variant='indeterminate' color='primary' />) : (
                        <div className='card-body'>
                            <div className='table-responsive'>
                                <table className='table table-borderless'>
                                    <thead className='theader'>
                                        <tr>
                                            <th className='header-days-names'></th>
                                            {weekDates.map((date, index) => (
                                                <th scope='col' key={index} className='header-days-names text-uppercase'>
                                                    {index === 0 ? date.toLocaleDateString('es', { month: 'long' }) : ''}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>


                                    <tbody>
                                        <tr>
                                            <td className='header-days-names'></td>
                                            {weekDates.map((date, index) => (
                                                <td className={`header-days-names ${isToday(date) ? 'table-primary' : ''}`} key={index}>
                                                    {date.toLocaleDateString('es', { weekday: 'short' })} {date.getUTCDate()}
                                                </td>
                                            ))}

                                        </tr>
                                        {filteredTableData && filteredTableData.map((adviser, dateIndex) => (
                                            <tr key={dateIndex} className='container-visible-shifts'>

                                                <td className='d-flex'>
                                                    {loading ? (<CircularProgress variant='indeterminate' color='primary' />) :
                                                        (
                                                            <>
                                                                <Avatar src={adviser.ID_Imagen} alt='Avatar' />
                                                                <span className=''>
                                                                    <span className='names-user-list'>{adviser.Apellidos} {adviser.Nombres}</span>
                                                                    <br />
                                                                    <span>
                                                                        <span className='names-user-list-cargo'>{adviser.Cargo}</span>
                                                                    </span>
                                                                </span>
                                                            </>
                                                        )}
                                                </td>
                                                {weekDates.map((date, dateIndex) => {
                                                    const formattedDate = date.toISOString().substr(0, 10);
                                                    const shiftFound = tableDataSHIFTS && tableDataSHIFTS.find(shift => {
                                                        return shift.Documento === adviser.Documento && shift.Fecha === formattedDate;
                                                    });
                                                    return (
                                                        <td
                                                            key={dateIndex}
                                                            className={`header-days-names ${isToday(date) ? 'table-primary' : 'container-shifts-list'}`}
                                                            style={{ height: '100%' }}
                                                            onClick={() => {
                                                                if (shiftFound) {
                                                                    setSelectedShift(shiftFound);
                                                                    setIsModalOpen(true);
                                                                }
                                                            }}
                                                        >
                                                            {shiftFound ? <Shifts shiftFound={shiftFound} formatTime={formatTime} /> : <NotShifts />}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <DetailsShifts selectedShift={selectedShift} isModalOpen={isModalOpen} handleModalClose={handleModalClose} />

                                <div className='text-center'>
                                    <div className='mb-0 title-vista-semanal' style={{ color: 'red' }}>{messageError}</div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div >

        </>
    )
}

export default MyGroup