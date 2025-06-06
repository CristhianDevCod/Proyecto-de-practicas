import {
    Modal,
    React,
    useState,
    useContext,
    CheckRoundedIcon,
    CircularProgress,
    CloseRoundedIcon,
    HourglassFullRoundedIcon,
    SearchRoundedIcon,
    TextField
} from '../../Exports-Modules/Exports';
import { esES } from '@mui/x-data-grid';


import Button from '@mui/joy/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';


import './Styles/Styles.css';
import { CustomNoRowsOverlay, CustomPagination, PAGE_SIZE, StyledDataGrid } from './Styles/Styles';
import Tables from './Tables';
import { UserProfileContext } from '../../Context/ProfileContex';
import { NotificationsContextNoveltie } from '../../Context/ContextNotificationNoveltie';
import {
    GetLengthAccepts,
    GetLengthPending,
    GetLengthRejects
} from '../Hooks/Hooks';
import Header from './Header/Header';
import Details from './Details/Details';
import ModalSurePoint from './ModalSurePoint/ModalSurePoint';

const ExtraHours = () => {
    const {
        api,
        data,
        socket,
        message,
        getData,
        setTurnoIni,
        setTurnoFin,
        dataHistory,
        formHourExtra,
        contextHolder,
        warningMessage,
        getDataHistory,
        submitHoursExtra,
        isHourExtraAllowed,
        isHourInputChanged,
        handleCheckAvailability,
        handleFormDataHoursExtra,
    } = useContext(NotificationsContextNoveltie);
    const { fullName } = useContext(UserProfileContext);
    const hourExtraPending = GetLengthPending(fullName);
    const hourExtraAccepts = GetLengthAccepts(fullName);
    const hourExtraRejects = GetLengthRejects(fullName);
    const [openDetailsHourExtra, setOpenDetailsHourExtra] = useState(false);
    const [selectedDetailsHoursExtra, setSelectedDetailsHoursExtra] = useState(null);
    const [openModalSurePoint, setOpenModalSurePoint] = useState(false);

    const [openModalCancel, setOpenModalCancel] = useState(false);
    const [selectedModalCancel, setselectedModalCancel] = useState(null);
    const [loading, setLoading] = useState(false);

    const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0 });

    //MAXIMO DE DATOS PÓR PAGINA 





    const hanldeSelectHourExtra = (hours) => {
        setSelectedDetailsHoursExtra(hours);
    }
    //MANEJADORES PARA LOS MODALES 
    const handleOpenModalDetailsHourExtra = () => {
        setOpenDetailsHourExtra(true);
    }
    const handleCloseModalDetailsHourExtra = () => {
        setOpenDetailsHourExtra(false);
    }
    //MODAL DE SEGURIADAD
    const handleOpenModalSurePoint = () => {
        setOpenModalSurePoint(true);
    }
    const handleCloseModalSurePoint = () => {
        setOpenModalSurePoint(false);
    }

    //MODAL DE CANCELAR LAS HORAS EXTRAS
    const handleOpenModalCancel = () => {
        setOpenModalCancel(true);
    }
    const handleCloseModalCancel = () => {
        setOpenModalCancel(false);
        setTimeout(() => {
            getDataHistory();
        }, 500);
    }

    const handleSelectModalCancel = (hourExtra) => {
        setselectedModalCancel(hourExtra);
    }



    //FUNCION PARA FORMATEAR LAS HORAS 
    const formatTime = (time) => {
        const [hour, minute] = time.split(':');
        return `${hour}:${minute}`;
    };

    const onSubmit = () => {
        submitHoursExtra();
        handleCloseModalSurePoint();
        setTimeout(() => {
            getDataHistory();
        }, 500);

    };

    // FUNCION PARA OBTENER LA FECHA ACTUAL
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const now = `${year}-${month}-${day}`;

    var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    //FUNCION PARA CANCELAR LAS HORAS EXTRAS PEDIDAS POR EL ASESOR 
    const handleCancelHourExtra = (cancelHourExtra) => {
        if (socket) {
            socket.emit('cancelHourExtra', {
                ...cancelHourExtra,
                Id: cancelHourExtra.Id,
                Documento: cancelHourExtra.Documento,
                Fecha_Aprobador: now,
                Hora_Aprobador: time,
                Nombre_Aprobador: cancelHourExtra.Nombre_Completo,
                Estado: 'Cancelado'
            });
            api.success({
                message: 'Horas extras canceladas correctamente!!',
            });
            handleCloseModalCancel();
            getDataHistory();
        };
    };

    const handleUpdateAll = async () => {
        setLoading(true);
        try {
            await getData();
            getDataHistory();
            GetLengthPending();
            GetLengthAccepts();
            GetLengthRejects();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }




    return (
        <>
            {contextHolder}
            <Header
                Card={Card}
                Divider={Divider}
                loading={loading}
                CardContent={CardContent}
                CircularProgress={CircularProgress}
                CheckRoundedIcon={CheckRoundedIcon}
                CloseRoundedIcon={CloseRoundedIcon}
                hourExtraAccepts={hourExtraAccepts}
                hourExtraPending={hourExtraPending}
                hourExtraRejects={hourExtraRejects}
                HourglassFullRoundedIcon={HourglassFullRoundedIcon}
            />


            <Tables
                esES={esES}
                data={data}
                Modal={Modal}
                Button={Button}
                message={message}
                loading={loading}
                useState={useState}
                TextField={TextField}
                PAGE_SIZE={PAGE_SIZE}
                formatTime={formatTime}
                setTurnoIni={setTurnoIni}
                setTurnoFin={setTurnoFin}
                dataHistory={dataHistory}
                formHourExtra={formHourExtra}
                warningMessage={warningMessage}
                StyledDataGrid={StyledDataGrid}
                paginationModel={paginationModel}
                handleUpdateAll={handleUpdateAll}
                openModalCancel={openModalCancel}
                CircularProgress={CircularProgress}
                CheckRoundedIcon={CheckRoundedIcon}
                CloseRoundedIcon={CloseRoundedIcon}
                CustomPagination={CustomPagination}
                SearchRoundedIcon={SearchRoundedIcon}
                setPaginationModel={setPaginationModel}
                isHourInputChanged={isHourInputChanged}
                isHourExtraAllowed={isHourExtraAllowed}
                CustomNoRowsOverlay={CustomNoRowsOverlay}
                selectedModalCancel={selectedModalCancel}
                hanldeSelectHourExtra={hanldeSelectHourExtra}
                handleCancelHourExtra={handleCancelHourExtra}
                handleOpenModalCancel={handleOpenModalCancel}
                handleCloseModalCancel={handleCloseModalCancel}
                handleSelectModalCancel={handleSelectModalCancel}
                handleCheckAvailability={handleCheckAvailability}
                handleOpenModalSurePoint={handleOpenModalSurePoint}
                handleFormDataHoursExtra={handleFormDataHoursExtra}
                handleOpenModalDetailsHourExtra={handleOpenModalDetailsHourExtra}
            />

            <ModalSurePoint
                Modal={Modal}
                Button={Button}
                onSubmit={onSubmit}
                openModalSurePoint={openModalSurePoint}
                handleOpenModalSurePoint={handleOpenModalSurePoint}
                handleCloseModalSurePoint={handleCloseModalSurePoint}
            />

            <Details selectedDetailsHoursExtra={selectedDetailsHoursExtra} Modal={Modal} openDetailsHourExtra={openDetailsHourExtra} handleCloseModalDetailsHourExtra={handleCloseModalDetailsHourExtra} />

        </>

    )
}

export default ExtraHours