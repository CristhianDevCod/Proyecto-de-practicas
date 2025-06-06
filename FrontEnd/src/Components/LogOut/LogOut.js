import { React, useEffect, useState, useContext, Swal, Modal, Divider, Logout, Settings, BorderColorRoundedIcon, ArrowBackIosRoundedIcon, ArrowForwardIosRoundedIcon, Box, IconButton, ListItemIcon, Avatar, Menu, Tooltip, MenuItem, lazy, CircularProgress, notification } from '../../Exports-Modules/Exports'

import './Styles/StylesLogOut.css';
import MenuLogOut from './MenuLogOut';
import Config from '../../Auth/Config';
import UpdateDates from '../Profile/UpdateDates'
import { UserProfileContext } from '../../Context/ProfileContex';
import { StyledTab, TabPanel, StylesTabs, a11yProps, imagesFile1, imagesFile2, imagesFile3 } from './Styles/Styles';
import apiClient from '../../Service/Service';



const ShowProfiles = lazy(() => import('./ShowProfiles'));


export default function AccountMenu() {
  const { fetchIdAvatar } = Config();
  const [api, contextHolder] = notification.useNotification();
  const { userProfile, setUserProfile, handleProfileSelection, fullName, loadingProfile } = useContext(UserProfileContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const [, setImagenes] = useState([]);

  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollLeft1, setScrollLeft1] = useState(0);
  const [scrollLeft2, setScrollLeft2] = useState(0);

  const [randomImage1, setRandomImage1] = useState('');
  const [randomImage2, setRandomImage2] = useState('');
  const [randomImage3, setRandomImage3] = useState('');

  const [randomImage4, setRandomImage4] = useState('');
  const [randomImage5, setRandomImage5] = useState('');
  const [randomImage6, setRandomImage6] = useState('');

  const [randomImage7, setRandomImage7] = useState('');
  const [randomImage8, setRandomImage8] = useState('');
  const [randomImage9, setRandomImage9] = useState('');




  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    setOpenModal(true);
    handleMenuClose();
  };
  const handleUpdate = () => {
    setOpenModalUpdate(true);
    handleMenuClose();
  };
  const handleUpdateCancel = () => {
    setOpenModalUpdate(false);
  };

  const handleCancelProfile = () => {
    setOpenModal(false);
  };

  const logOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username')
    localStorage.removeItem('_Secure-next-auth.session-token');
    let timerInterval;
    Swal.fire({
      title: 'Cerrando sesion...',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector('b');
        if (b) {
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        }
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    });
    window.location.href = '/';
  };



  //Fashion
  const selectFashion = (index) => {
    const Pines1 = imagesFile1.map((imagen, i) => {
      if (i === index) {
        setPerfil(imagen);
        setUserProfile(imagen);
        const ID_Imagen = imagen;
        apiClient.post(fetchIdAvatar, { ID_Imagen })
          .then((response) => {
            api.success({ message: response.data });
          })
          .catch((error) => {
            console.log('No se pudo guardar el ID de imagen', error);
          });

        return { url: imagen, seleccionado: true };
      } else {
        return { url: imagen, seleccionado: false };
      }
    });

    setImagenes(Pines1);
    handleProfileSelection(Pines1);
  };

  //Beautiful
  const selectBeautiful = (index) => {
    const Pines2 = imagesFile2.map((imagen, i) => {
      if (i === index) {
        setPerfil(imagen);
        const ID_Imagen = imagen;

        apiClient.post(fetchIdAvatar, { ID_Imagen })
          .then((response) => {
            api.success({ message: response.data });
          })
          .catch((error) => {
            console.log('No se pudo guardar el ID de imagen', error);
          });
        return { url: imagen, seleccionado: true };
      } else {
        return { url: imagen, seleccionado: false };
      }
    });
    setImagenes(Pines2);
    handleProfileSelection(Pines2);
  };

  //random
  const selectRandom = (index) => {
    const Pines3 = imagesFile3.map((imagen, i) => {
      if (i === index) {
        setPerfil(imagen);
        const ID_Imagen = imagen;

        apiClient.post(fetchIdAvatar, { ID_Imagen })
          .then((response) => {
            api.success({ message: response.data });
          })
          .catch((error) => {
            console.log('No se pudo guardar el ID de imagen', error);
          });
        return { url: imagen, seleccionado: true };
      } else {
        return { url: imagen, seleccionado: false };
      }
    });

    setImagenes(Pines3);
    handleProfileSelection(Pines3);
  };

  useEffect(() => {
    const localImage = Array.isArray(fullName) && fullName.map((item) => {
      return item.ID_Imagen;
    });
    setPerfil(localImage);
  }, [fullName]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLeftScroll = () => {
    const container = document.querySelector('.container-images-widths');
    const step = 100;
    const newScrollLeft = Math.max(0, scrollLeft - step);
    container.scrollLeft = newScrollLeft;
    setScrollLeft(newScrollLeft);
  };

  const handleRightScroll = () => {
    const container = document.querySelector('.container-images-widths');
    const step = 100;
    const newScrollLeft = Math.min(
      container.scrollWidth - container.clientWidth,
      scrollLeft + step
    );
    container.scrollLeft = newScrollLeft;
    setScrollLeft(newScrollLeft);
  };

  const handleLeftScroll1 = () => {
    const container = document.querySelector('.container-images-widths');
    const step = 100;
    const newScrollLeft = Math.max(0, scrollLeft1 - step);
    container.scrollLeft = newScrollLeft;
    setScrollLeft1(newScrollLeft);
  };

  const handleRightScroll1 = () => {
    const container = document.querySelector('.container-images-widths');
    const step = 100;
    const newScrollLeft = Math.min(
      container.scrollWidth - container.clientWidth,
      scrollLeft1 + step
    );
    container.scrollLeft = newScrollLeft;
    setScrollLeft1(newScrollLeft);
  };

  const handleLeftScroll2 = () => {
    const container = document.querySelector('.container-images-widths');
    const step = 100;
    const newScrollLeft = Math.max(0, scrollLeft2 - step);
    container.scrollLeft = newScrollLeft;
    setScrollLeft2(newScrollLeft);
  };

  const handleRightScroll2 = () => {
    const container = document.querySelector('.container-images-widths');
    const step = 100;
    const newScrollLeft = Math.min(
      container.scrollWidth - container.clientWidth,
      scrollLeft2 + step
    );
    container.scrollLeft = newScrollLeft;
    setScrollLeft2(newScrollLeft);
  };

  //Fashion 1
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imagesFile1.length);
    setRandomImage1(imagesFile1[randomIndex]);
  }, []);
  //Fashion 2
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imagesFile1.length);
    setRandomImage2(imagesFile1[randomIndex]);
  }, []);
  //Fashion 3
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imagesFile1.length);
    setRandomImage3(imagesFile1[randomIndex]);
  }, []);

  //Beautiful 4
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imagesFile2.length);
    setRandomImage4(imagesFile2[randomIndex]);
  }, []);
  //Beautiful 5
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imagesFile2.length);
    setRandomImage5(imagesFile2[randomIndex]);
  }, []);
  //Beautiful 6
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imagesFile2.length);
    setRandomImage6(imagesFile2[randomIndex]);
  }, []);

  //random 7
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imagesFile3.length);
    setRandomImage7(imagesFile3[randomIndex]);
  }, []);
  //random 8
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imagesFile3.length);
    setRandomImage8(imagesFile3[randomIndex]);
  }, []);
  //random 9
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imagesFile3.length);
    setRandomImage9(imagesFile3[randomIndex]);
  }, []);



  const ProfileLogOut = userProfile.avatar = perfil;
  return (
    <React.Fragment>
      {contextHolder}
      <Box sx={{ borderRadius: '10px', backgroundColor: '#a7aeb932' }}>
        <Tooltip title='Perfil'>
          <IconButton
            onClick={handleMenuOpen}
            size='small'
            aria-haspopup='true'
            sx={{ borderRadius: '10px' }}
          >
            {loadingProfile ? (
              <CircularProgress color='primary' variant='indeterminate' />
            ) : (
              Array.isArray(fullName) && fullName.map((data) => {
                return (
                  <div className='d-flex' key={`${data.Documento}_${data.Fecha_Corte}`}>
                    <div className='p-1'>
                      <Avatar variant='rounded' src={Array.isArray(ProfileLogOut) ? ProfileLogOut[0] : ProfileLogOut} alt='' sizes='small' />
                    </div>

                    <div className='p-1' style={{ textAlign: 'start', marginLeft: '2%' }}>
                      <div className='fullname-text-logout'>{data.Nombres}</div>
                      <div className='cargo-text-logout'>{data.Cargo}</div>
                    </div>

                  </div>
                );
              })
            )}

          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={Boolean(anchorEl)}
        keepMounted
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <ShowProfiles
          Box={Box}
          Modal={Modal}
          value={value}
          Avatar={Avatar}
          perfil={perfil}
          TabPanel={TabPanel}
          StyledTab={StyledTab}
          a11yProps={a11yProps}
          openModal={openModal}
          IconButton={IconButton}
          StylesTabs={StylesTabs}
          imagesFile1={imagesFile1}
          imagesFile2={imagesFile2}
          imagesFile3={imagesFile3}
          handleChange={handleChange}
          randomImage1={randomImage1}
          randomImage2={randomImage2}
          randomImage3={randomImage3}
          randomImage4={randomImage4}
          randomImage5={randomImage5}
          randomImage6={randomImage6}
          randomImage7={randomImage7}
          randomImage8={randomImage8}
          randomImage9={randomImage9}
          selectRandom={selectRandom}
          selectFashion={selectFashion}
          selectBeautiful={selectBeautiful}
          handleLeftScroll={handleLeftScroll}
          handleLeftScroll1={handleLeftScroll1}
          handleLeftScroll2={handleLeftScroll2}
          handleRightScroll={handleRightScroll}
          handleRightScroll1={handleRightScroll1}
          handleRightScroll2={handleRightScroll2}
          handleCancelProfile={handleCancelProfile}
          ArrowBackIosRoundedIcon={ArrowBackIosRoundedIcon}
          ArrowForwardIosRoundedIcon={ArrowForwardIosRoundedIcon}

        />

        <Modal
          width='1150px'
          footer={null}
          className='Custom-modal'
          open={openModalUpdate}
        >
          <>
            {/* modal de update */}
            <UpdateDates handleUpdateCancel={handleUpdateCancel} />
          </>
        </Modal>

        <MenuLogOut
          Avatar={Avatar}
          Logout={Logout}
          logOut={logOut}
          Divider={Divider}
          MenuItem={MenuItem}
          Settings={Settings}
          fullName={fullName}
          handleUpdate={handleUpdate}
          ListItemIcon={ListItemIcon}
          ProfileLogOut={ProfileLogOut}
          handleEditProfile={handleEditProfile}
          BorderColorRoundedIcon={BorderColorRoundedIcon}
        />
      </Menu>
    </React.Fragment>
  );
}
