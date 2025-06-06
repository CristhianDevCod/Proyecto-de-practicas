import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

const SendChange = ({ Dia_Trabajo_Actual, minDate, handleDateChange, errorMessages, userProfile, handleSenderChange, Usuario_Red_Recibe, userList, onChange, Mensaje_Envia, handleRequestSubmit, handleRecipientChange, isButtonDisabled, Button, validateShiftDisabled, handleKeyDown }) => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(userList);

    useEffect(() => {
        if (searchValue === '') {
            setFilteredUsers(userList); // Restablecer la lista completa si el campo de búsqueda está vacío
        } else {
            const filtered = Array.isArray(userList) && userList.filter((user) =>
                (user.matchingSocios[0].Nombres.toLowerCase() + ' ' + user.matchingSocios[0].Apellidos.toLowerCase()).includes(searchValue.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [searchValue, userList]);
    return (
        <>

            <div className='row g-3'>
                <div className='col'>
                    <div className='text-muted'>¿Qué día deseas cambiar?</div>
                    <input
                        type='date'
                        placeholder='Día'
                        className='form-control'
                        id='date-input'
                        name='Fecha'
                        onKeyDown={handleKeyDown}
                        value={Dia_Trabajo_Actual}
                        min={minDate}
                        onChange={(e) => {
                            handleDateChange(e);
                        }}
                    />
                    {errorMessages.Dia_Trabajo_Actual && (
                        <div id='invalid-feedback-change'>{errorMessages.Dia_Trabajo_Actual}</div>
                    )}
                </div>
            </div>

            {validateShiftDisabled === true ? (
                <div className='row g-3'>
                    <div className='text-danger'>
                        'NO PUEDES CAMBIAR ESTE DIA DE TRABAJO, YA QUE CONTIENE TURNO DE CIERRE, PRUEBA A CAMBIAR OTRO DIA DE TRABAJO!!!'
                    </div>
                </div>
            ) : ''}

            <div className='row g-3'>
                <div className='col'>
                </div>
                <div className='col'>
                    <div className='text-muted'>Buscar</div>
                    <input
                        className='form-control'
                        placeholder='Buscar asesor'
                        disabled={!Dia_Trabajo_Actual}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                </div>
            </div>

            <div className='row g-3'>
                <div className='col'>
                    <div className='text-muted'>Tú</div>
                    <input
                        className='form-control'
                        placeholder='Tú'
                        name='Usuario_Red_Envia'
                        disabled
                        value={userProfile.user}
                        onChange={handleSenderChange}
                    />
                </div>
                <div className='col'>
                    <div className='text-muted'>Receptor</div>
                    <select
                        disabled={userList.length === 0}
                        className='form-select '
                        value={Usuario_Red_Recibe}
                        onChange={(e) => { handleRecipientChange(e); }}>
                        <option value=''>Seleccionar asesor</option>
                        {Array.isArray(filteredUsers) && filteredUsers.map((data) => (
                            <option key={data.matchingSocios[0].Documento} value={data.matchingSocios[0].Usuario_Red}>
                                {data.matchingSocios[0].Nombres} {data.matchingSocios[0].Apellidos}
                            </option>
                        ))}
                    </select>





                    {errorMessages.Usuario_Red_Recibe && (
                        <div id='invalid-feedback-change'>{errorMessages.Usuario_Red_Recibe}</div>
                    )}
                </div>
            </div>


            <div className='' style={{ marginTop: '5%' }}>
                <div className='text-muted'>Motivo del cambio</div>
                <TextArea
                    showCount
                    maxLength={150}
                    style={{
                        height: 120,
                        marginBottom: 24
                    }}
                    onChange={onChange}
                    value={Mensaje_Envia}
                    placeholder='Mensaje'
                />
            </div>

            <div className='container-solicitar-buttom'>
                <Button
                    variant='solid'
                    size='sm'
                    onClick={handleRequestSubmit}
                    disabled={!!isButtonDisabled || !!validateShiftDisabled}
                >
                    {isButtonDisabled ? (
                        <div className='spinner-border text-light' role='status'>
                            <span className='visually-hidden'>Espere...</span>
                        </div>
                    ) : 'Solicitar'}
                </Button>
            </div>

        </>
    )
}

export default SendChange