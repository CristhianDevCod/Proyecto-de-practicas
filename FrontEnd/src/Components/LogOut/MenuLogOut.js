import React from 'react'

const MenuLogOut = ({ MenuItem, Avatar, ProfileLogOut, fullName, Divider, handleEditProfile, ListItemIcon, BorderColorRoundedIcon, handleUpdate, Settings, logOut, Logout }) => {
    return (
        <>
            <div className='p-2 d-flex'>
                <div className='p-2'>
                    <Avatar src={Array.isArray(ProfileLogOut) ? ProfileLogOut[0] : ProfileLogOut} alt='avatar' sizes='small' variant='rounded'/>
                </div>
                <div className='p-2 flex-grow-1'>
                    {fullName &&
                        fullName.map((data) => {
                            return (
                                <div key={data.Documento}>
                                    <div className='name-menu-logout'>
                                        {data.Nombres}
                                    </div>
                                    <div className='cargo-menu-logout'>
                                        {data.Cargo}
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
            <Divider />
            <MenuItem onClick={handleEditProfile} className='menu-logout-text'>
                <ListItemIcon>
                    <BorderColorRoundedIcon fontSize='small' className='color-icons' />
                </ListItemIcon>
                Editar perfil
            </MenuItem>
            <MenuItem onClick={handleUpdate} className='menu-logout-text'>
                <ListItemIcon>
                    <Settings fontSize='small' className='color-icons' />
                </ListItemIcon>
                Actualizar mis datos
            </MenuItem>
            <MenuItem onClick={logOut} className='menu-logout-text'>
                <ListItemIcon>
                    <Logout fontSize='small' color='error' />
                </ListItemIcon>
                Cerrar sesión
            </MenuItem>
        </>
    )
}

export default MenuLogOut