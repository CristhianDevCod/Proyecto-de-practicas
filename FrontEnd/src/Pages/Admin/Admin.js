import { React, useState, Box, Tab, Tabs, AssignmentIndRoundedIcon, PersonRoundedIcon, GroupRoundedIcon } from '../../Exports-Modules/Exports';

import { CustomTabPanel, a11yProps } from './Styles/Styles';
import UserPermissions from './UserPermissions';
import ChangePositions from './ChangePositions';
import ClientsPermissions from './ClientsPermissions';
import PositionPermissions from './PositionPermissions';
import AddClientPermissionsNomina from './AddClientPermissionsNomina';
import AddClientPermissionsNoveltie from './AddClientPermissionsNoveltie';

const Admin = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#ffffff' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab icon={<AssignmentIndRoundedIcon fontSize='small' />} iconPosition='start' label='Cargos' {...a11yProps(0)} />
                        <Tab label='Usuarios' icon={<PersonRoundedIcon fontSize='small' />} iconPosition='start' {...a11yProps(1)} />
                        <Tab label='Permiso cliente socio' icon={<GroupRoundedIcon fontSize='small' />} iconPosition='start' {...a11yProps(2)} />
                        <Tab label='Cambio de Cargo' icon={<GroupRoundedIcon fontSize='small' />} iconPosition='start' {...a11yProps(3)} />
                        <Tab label='Permiso cliente novedad' icon={<GroupRoundedIcon fontSize='small' />} iconPosition='start' {...a11yProps(4)} />
                        <Tab label='Permiso cliente nomina' icon={<GroupRoundedIcon fontSize='small' />} iconPosition='start' {...a11yProps(5)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <PositionPermissions />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <UserPermissions />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <ClientsPermissions />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <ChangePositions />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    <AddClientPermissionsNoveltie />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={5}>
                    <AddClientPermissionsNomina />
                </CustomTabPanel>
            </Box>
        </>
    )
}

export default Admin;