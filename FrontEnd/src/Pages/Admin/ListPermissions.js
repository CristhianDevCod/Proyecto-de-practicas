import React from 'react'

const ListPermissions = ({ List, Accordion, AccordionSummary, AccordionDetails, ExpandMoreIcon, handleCheckboxChange, handleIdModulo, userPermissions }) => {
    return (
        <div>
            <List>
                {/*Turnos*/}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                onChange={(e) => handleCheckboxChange(1.0, e.target.checked) || handleIdModulo(e)}
                                type='checkbox'
                                value='1.0'
                                id='defaultCheck1'
                                checked={userPermissions.some((p) => p.Id_Modulo === 1.0)}
                            />
                            <label className='form-check-label' htmlFor='defaultCheck1'>
                                Turnos
                            </label>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(1.1, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='1.1'
                                    id='defaultCheck2'
                                    checked={userPermissions.some((p) => p.Id_Modulo === 1.1)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck2'>
                                    1.1 Mis Turnos
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(1.2, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='1.2'
                                    id='defaultCheck3'
                                    checked={userPermissions.some(p => p.Id_Modulo === 1.2)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck3'>
                                    1.2 Turnos Mi Equipo
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(1.3, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='1.3'
                                    id='defaultCheck4'
                                    checked={userPermissions.some(p => p.Id_Modulo === 1.3)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck4'>
                                    1.3 Importar Turnos
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(1.4, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='1.4'
                                    id='defaultCheck5'
                                    checked={userPermissions.some(p => p.Id_Modulo === 1.4)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck5'>
                                    1.4 Exportar Turnos
                                </label>
                            </div>

                            <div className='form-check mx-3'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(1.41, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='1.41'
                                    id='defaultCheck6'
                                    checked={userPermissions.some(p => p.Id_Modulo === 1.41)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck6'>
                                    1.41 Exportar Turnos Completos
                                </label>
                            </div>

                            <div className='form-check mx-3'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(1.42, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='1.42'
                                    id='defaultCheck7'
                                    checked={userPermissions.some(p => p.Id_Modulo === 1.42)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck7'>
                                    1.42 Exporte Turnos Completos Administrativo
                                </label>
                            </div>

                            <div className='form-check mx-3'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(1.43, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='1.43'
                                    id='defaultCheck8'
                                    checked={userPermissions.some(p => p.Id_Modulo === 1.43)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck8'>
                                    1.43 Exporte Turnos Operativos
                                </label>
                            </div>
                            <div className='form-check mx-3'>
                                <input
                                    className='form-check-input9'
                                    onChange={(e) => handleCheckboxChange(1.44, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='1.44'
                                    id='defaultCheck'
                                    checked={userPermissions.some(p => p.Id_Modulo === 1.44)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck9'>
                                    1.44 Exporte Turnos Administrativos
                                </label>
                            </div>

                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(1.5, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='1.5'
                                    id='defaultCheck10'
                                    checked={userPermissions.some(p => p.Id_Modulo === 1.5)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck10'>
                                    1.5 Mis Cambios
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(1.6, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='1.6'
                                    id='defaultCheck11'
                                    checked={userPermissions.some(p => p.Id_Modulo === 1.6)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck11'>
                                    1.6 Importe Administrativo
                                </label>
                            </div>
                        </List>
                    </AccordionDetails>
                </Accordion>

                {/*Novedades*/}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                onChange={(e) => handleCheckboxChange(2.0, e.target.checked) || handleIdModulo(e)}
                                type='checkbox'
                                value='2.0'
                                id='defaultCheck12'
                                checked={userPermissions.some((p) => p.Id_Modulo === 2.0)}
                            />
                            <label className='form-check-label' htmlFor='defaultCheck12'>
                                Novedades
                            </label>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(2.1, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='2.1'
                                    id='defaultCheck13'
                                    checked={userPermissions.some(p => p.Id_Modulo === 2.1)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck13'>
                                    2.1 Mis Novedades
                                </label>
                            </div>

                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(2.11, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='2.11'
                                    id='defaultCheck40'
                                    checked={userPermissions.some(p => p.Id_Modulo === 2.11)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck40'>
                                    2.11 Novedades Mi Equipo Staff
                                </label>
                            </div>

                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(2.12, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='2.12'
                                    id='defaultCheck40'
                                    checked={userPermissions.some(p => p.Id_Modulo === 2.12)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck40'>
                                    2.12 Mis Novedades Staff
                                </label>
                            </div>




                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(2.2, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='2.2'
                                    id='defaultCheck14'
                                    checked={userPermissions.some(p => p.Id_Modulo === 2.2)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck14'>
                                    2.2 Novedades Mi Equipo
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(2.3, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='2.3'
                                    id='defaultCheck15'
                                    checked={userPermissions.some(p => p.Id_Modulo === 2.3)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck15'>
                                    2.3 Novedades WFM
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(2.4, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='2.4'
                                    id='defaultCheck16'
                                    checked={userPermissions.some(p => p.Id_Modulo === 2.4)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck16'>
                                    2.4 Novedades Manager
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(2.5, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='2.5'
                                    id='defaultCheck28'
                                    checked={userPermissions.some(p => p.Id_Modulo === 2.5)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck28'>
                                    2.5 Novedades Nomina
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(2.6, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='2.6'
                                    id='defaultCheck29'
                                    checked={userPermissions.some(p => p.Id_Modulo === 2.6)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck29'>
                                    2.6 Horas Extras
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(2.7, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='2.7'
                                    id='defaultCheck30'
                                    checked={userPermissions.some(p => p.Id_Modulo === 2.7)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck30'>
                                    2.7 Horas Extras GTR
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(2.8, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='2.8'
                                    id='defaultCheck31'
                                    checked={userPermissions.some(p => p.Id_Modulo === 2.8)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck31'>
                                    2.8 Horas Extras Mi Equipo
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(2.9, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='2.9'
                                    id='defaultCheck31'
                                    checked={userPermissions.some(p => p.Id_Modulo === 2.9)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck31'>
                                    2.9 Asignacion Horas Extras
                                </label>
                            </div>
                        </List>
                    </AccordionDetails>
                </Accordion>

                {/*Exportables*/}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                onChange={(e) => handleCheckboxChange(3.0, e.target.checked) || handleIdModulo(e)}
                                type='checkbox'
                                value='3.0'
                                id='defaultCheck17'
                                checked={userPermissions.some((p) => p.Id_Modulo === 3.0)}
                            />
                            <label className='form-check-label' htmlFor='defaultCheck17'>
                                Exportables
                            </label>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(3.1, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='3.1'
                                    id='defaultCheck18'
                                    checked={userPermissions.some(p => p.Id_Modulo === 3.1)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck18'>
                                    3.1 Feeling
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(3.2, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='3.2'
                                    id='defaultCheck19'
                                    checked={userPermissions.some(p => p.Id_Modulo === 3.2)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck19'>
                                    3.2 Exportable Socio Full
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(3.3, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='3.3'
                                    id='defaultCheck20'
                                    checked={userPermissions.some(p => p.Id_Modulo === 3.3)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck20'>
                                    3.3 Exportable Socio Operación
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(3.4, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='3.4'
                                    id='defaultCheck21'
                                    checked={userPermissions.some(p => p.Id_Modulo === 3.4)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck21'>
                                    3.4 Exportable Socio Administrativo
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(3.5, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='3.5'
                                    id='defaultCheck22'
                                    checked={userPermissions.some(p => p.Id_Modulo === 3.5)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck22'>
                                    3.5 Logs
                                </label>
                            </div>
                        </List>
                    </AccordionDetails>
                </Accordion>
                {/*Logs*/}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                onChange={(e) => handleCheckboxChange(4.0, e.target.checked) || handleIdModulo(e)}
                                type='checkbox'
                                value='4.0'
                                id='defaultCheck23'
                                checked={userPermissions.some((p) => p.Id_Modulo === 4.0)}
                            />
                            <label className='form-check-label' htmlFor='defaultCheck23'>
                                Logs
                            </label>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(4.1, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='4.1'
                                    id='defaultCheck24'
                                    checked={userPermissions.some(p => p.Id_Modulo === 4.1)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck24'>
                                    4.1 Logs
                                </label>
                            </div>
                        </List>
                    </AccordionDetails>
                </Accordion>

                {/*NOMINA*/}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                onChange={(e) => handleCheckboxChange(5.0, e.target.checked) || handleIdModulo(e)}
                                type='checkbox'
                                value='5.0'
                                id='defaultCheck27'
                                checked={userPermissions.some((p) => p.Id_Modulo === 5.0)}
                            />
                            <label className='form-check-label' htmlFor='defaultCheck27'>
                                Nómina
                            </label>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(5.1, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='5.1'
                                    id='defaultCheck24'
                                    checked={userPermissions.some(p => p.Id_Modulo === 5.1)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck24'>
                                    5.1 Mi Nómina
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(5.2, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='5.2'
                                    id='defaultCheck32'
                                    checked={userPermissions.some(p => p.Id_Modulo === 5.2)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck32'>
                                    5.2 Reportes Ausencia / Impuntualidades
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(5.3, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='5.3'
                                    id='defaultCheck32'
                                    checked={userPermissions.some(p => p.Id_Modulo === 5.3)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck32'>
                                    5.3 Reportes mi Equipo
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(5.4, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='5.4'
                                    id='defaultCheck33'
                                    checked={userPermissions.some(p => p.Id_Modulo === 5.4)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck33'>
                                    5.4 Reportes Formación
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(5.5, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='5.5'
                                    id='defaultCheck34'
                                    checked={userPermissions.some(p => p.Id_Modulo === 5.5)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck34'>
                                    5.5 Reportes WFM
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(5.6, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='5.6'
                                    id='defaultCheck35'
                                    checked={userPermissions.some(p => p.Id_Modulo === 5.6)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck35'>
                                    5.6 Reportes GTR
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(5.7, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='5.7'
                                    id='defaultCheck36'
                                    checked={userPermissions.some(p => p.Id_Modulo === 5.7)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck36'>
                                    5.7 Reportes Nómina
                                </label>
                            </div>

                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(5.8, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='5.8'
                                    id='defaultCheck39'
                                    checked={userPermissions.some(p => p.Id_Modulo === 5.8)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck39'>
                                    5.8 Reportes mi Equipo Staff
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(5.9, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='5.9'
                                    id='defaultCheck40'
                                    checked={userPermissions.some(p => p.Id_Modulo === 5.9)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck40'>
                                    5.9 Reportes Staff
                                </label>
                            </div>
                        </List>
                    </AccordionDetails>
                </Accordion>

                {/*CAMPAÑA*/}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                onChange={(e) => handleCheckboxChange(6.0, e.target.checked) || handleIdModulo(e)}
                                type='checkbox'
                                value='6.0'
                                id='defaultCheck44'
                                checked={userPermissions.some((p) => p.Id_Modulo === 6.0)}
                            />
                            <label className='form-check-label' htmlFor='defaultCheck44'>
                                Campaña
                            </label>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails expandIcon={<ExpandMoreIcon />}>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                onChange={(e) => handleCheckboxChange(6.1, e.target.checked) || handleIdModulo(e)}
                                type='checkbox'
                                value='6.1'
                                id='defaultCheck45'
                                checked={userPermissions.some((p) => p.Id_Modulo === 6.1)}
                            />
                            <label className='form-check-label' htmlFor='defaultCheck44'>
                                Ubicaciones
                            </label>
                        </div>
                    </AccordionDetails>
                    <AccordionDetails>
                        <List>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(6.11, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='6.11'
                                    id='defaultCheck46'
                                    checked={userPermissions.some(p => p.Id_Modulo === 6.11)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck24'>
                                    6.11 Paises
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(6.12, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='6.12'
                                    id='defaultCheck47'
                                    checked={userPermissions.some(p => p.Id_Modulo === 6.12)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck24'>
                                    6.12 Departamentos
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(6.13, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='6.13'
                                    id='defaultCheck48'
                                    checked={userPermissions.some(p => p.Id_Modulo === 6.13)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck24'>
                                    6.13 Ciudades
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(6.14, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='6.14'
                                    id='defaultCheck49'
                                    checked={userPermissions.some(p => p.Id_Modulo === 6.14)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck24'>
                                    6.14 Sedes
                                </label>
                            </div>
                        </List>
                    </AccordionDetails>

                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                onChange={(e) => handleCheckboxChange(6.2, e.target.checked) || handleIdModulo(e)}
                                type='checkbox'
                                value='6.2'
                                id='defaultCheck50'
                                checked={userPermissions.some((p) => p.Id_Modulo === 6.2)}
                            />
                            <label className='form-check-label' htmlFor='defaultCheck27'>
                                Parametros
                            </label>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(6.21, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='6.21'
                                    id='defaultCheck51'
                                    checked={userPermissions.some(p => p.Id_Modulo === 6.21)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck27'>
                                    6.21 Sistemas De Gestión
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(6.22, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='6.22'
                                    id='defaultCheck52'
                                    checked={userPermissions.some(p => p.Id_Modulo === 6.22)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck27'>
                                    6.22 Tipo De Servicios
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(6.23, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='6.23'
                                    id='defaultCheck53'
                                    checked={userPermissions.some(p => p.Id_Modulo === 6.23)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck27'>
                                    6.23 Canal De Atención
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(6.24, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='6.24'
                                    id='defaultCheck54'
                                    checked={userPermissions.some(p => p.Id_Modulo === 6.24)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck27'>
                                    6.24 Sectores Cliente
                                </label>
                            </div>

                        </List>
                    </AccordionDetails>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                onChange={(e) => handleCheckboxChange(6.4, e.target.checked) || handleIdModulo(e)}
                                type='checkbox'
                                value='6.4'
                                id='defaultCheck55'
                                checked={userPermissions.some((p) => p.Id_Modulo === 6.4)}
                            />
                            <label className='form-check-label' htmlFor='defaultCheck44'>
                                Jerarquías
                            </label>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(6.41, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='6.41'
                                    id='defaultCheck56'
                                    checked={userPermissions.some(p => p.Id_Modulo === 6.41)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck52'>
                                    6.41 Home Jerarquías
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(6.42, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='6.42'
                                    id='defaultCheck57'
                                    checked={userPermissions.some(p => p.Id_Modulo === 6.42)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck52'>
                                    6.42 Crear Jerarquía
                                </label>
                            </div>
                        </List>
                    </AccordionDetails>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                onChange={(e) => handleCheckboxChange(6.3, e.target.checked) || handleIdModulo(e)}
                                type='checkbox'
                                value='6.3'
                                id='defaultCheck55'
                                checked={userPermissions.some((p) => p.Id_Modulo === 6.3)}
                            />
                            <label className='form-check-label' htmlFor='defaultCheck44'>
                                Operaciónes
                            </label>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(6.31, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='6.31'
                                    id='defaultCheck56'
                                    checked={userPermissions.some(p => p.Id_Modulo === 6.31)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck52'>
                                    6.31 Home Operaciones
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(6.32, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='6.32'
                                    id='defaultCheck57'
                                    checked={userPermissions.some(p => p.Id_Modulo === 6.32)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck52'>
                                    6.32 Crear Operación
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(6.33, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='6.33'
                                    id='defaultCheck58'
                                    checked={userPermissions.some(p => p.Id_Modulo === 6.33)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck52'>
                                    6.33 Operaciones Por Cliente
                                </label>
                            </div>
                        </List>
                    </AccordionDetails>

                </Accordion>

                {/*CAPACIDAD*/}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                onChange={(e) => handleCheckboxChange(7.0, e.target.checked) || handleIdModulo(e)}
                                type='checkbox'
                                value='7.0'
                                id='defaultCheck27'
                                checked={userPermissions.some((p) => p.Id_Modulo === 7.0)}
                            />
                            <label className='form-check-label' htmlFor='defaultCheck27'>
                                Capacidad
                            </label>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(7.1, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='7.1'
                                    id='defaultCheck24'
                                    checked={userPermissions.some(p => p.Id_Modulo === 7.1)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck24'>
                                    7.1 Plan De Capacidad
                                </label>
                            </div>
                        </List>
                    </AccordionDetails>
                </Accordion>

                {/* KPI */}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                onChange={(e) => handleCheckboxChange(10.0, e.target.checked) || handleIdModulo(e)}
                                type='checkbox'
                                value='10.0'
                                id='defaultCheck99'
                                checked={userPermissions.some((p) => p.Id_Modulo === 10.0)}
                            />
                            <label className='form-check-label' htmlFor='defaultCheck99'>
                                KPI
                            </label>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(10.1, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='10.1'
                                    id='defaultCheck99'
                                    checked={userPermissions.some(p => p.Id_Modulo === 10.1)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck99'>
                                    10.1 Indicadores de gestion
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(10.2, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='10.2'
                                    id='defaultCheck93'
                                    checked={userPermissions.some(p => p.Id_Modulo === 10.2)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck93'>
                                    10.2 Visualización de KPIs
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(10.3, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='10.3'
                                    id='defaultCheck59'
                                    checked={userPermissions.some(p => p.Id_Modulo === 10.3)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck52'>
                                    10.3 Asignación de KPIs
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(10.4, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='10.4'
                                    id='defaultCheck59'
                                    checked={userPermissions.some(p => p.Id_Modulo === 10.4)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck52'>
                                    10.4 Gestión de Metas
                                </label>
                            </div>

                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(10.5, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='10.5'
                                    id='defaultCheck59'
                                    checked={userPermissions.some(p => p.Id_Modulo === 10.5)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck52'>
                                    10.5 Gestión de Resultados
                                </label>
                            </div>
                            <div className='form-check mx-3'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(10.51, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='10.51'
                                    id='defaultCheck1051'
                                    checked={userPermissions.some(p => p.Id_Modulo === 10.51)}
                                />
                                <label className='form-check-label'
                                    htmlFor='defaultCheck1051'>
                                    10.51 Resultados Operativos
                                </label>
                            </div>
                            <div className='form-check mx-3'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(10.52, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='10.52'
                                    id='defaultCheck1052'
                                    checked={userPermissions.some(p => p.Id_Modulo === 10.52)}
                                />
                                <label className='form-check-label'
                                    htmlFor='defaultCheck1052'>
                                    10.52 Resultados Administrativos
                                </label>
                            </div>
                            <div className='form-check mx-3'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(10.53, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='10.53'
                                    id='defaultCheck1053'
                                    checked={userPermissions.some(p => p.Id_Modulo === 10.53)}
                                />
                                <label className='form-check-label'
                                    htmlFor='defaultCheck1053'>
                                    10.53 Resultados Individuales
                                </label>
                            </div>

                        </List>
                    </AccordionDetails>
                </Accordion>

                {/* Admin */}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                onChange={(e) => handleCheckboxChange(0.0, e.target.checked) || handleIdModulo(e)}
                                type='checkbox'
                                value='0.0'
                                id='defaultCheck25'
                                checked={userPermissions.some((p) => p.Id_Modulo === 0.0)}
                            />
                            <label className='form-check-label' htmlFor='defaultCheck25'>
                                Admin
                            </label>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    onChange={(e) => handleCheckboxChange(0.1, e.target.checked) || handleIdModulo(e)}
                                    type='checkbox'
                                    value='0.1'
                                    id='defaultCheck26'
                                    checked={userPermissions.some(p => p.Id_Modulo === 0.1)}
                                />
                                <label className='form-check-label' htmlFor='defaultCheck26'>
                                    0.1 Administración
                                </label>
                            </div>
                        </List>
                    </AccordionDetails>
                </Accordion>
            </List>
        </div>
    )
}

export default ListPermissions