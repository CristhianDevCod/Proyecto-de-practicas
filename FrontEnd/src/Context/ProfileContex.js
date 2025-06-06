import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Config from '../Auth/Config';
import apiClient from '../Service/Service';

export const UserProfileContext = createContext();
export const UserProfileProvider = ({ children }) => {
  const { fecthFullInformation } = Config();
  const [selectProfile, setselectProfile] = useState(null);
  const [fullName, setFullName] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    setLoadingProfile(true);
    const fetchFullName = async () => {
      try {
        const response = await apiClient.get(fecthFullInformation);
        if (response.data.length === 0) {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('username')
          localStorage.removeItem('_Secure-next-auth.session-token');
          window.location.href = '/'
          setLoadingProfile(false);
        } else {
          setFullName(response.data);
          setLoadingProfile(false);
        }

      } catch (error) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username')
        localStorage.removeItem('_Secure-next-auth.session-token');
        window.location.href = '/'
        setLoadingProfile(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No estas registrado en el socio, porfavor comunicate con tu supervisor',
        })
      }
    };

    fetchFullName();
  }, [fecthFullInformation]);

  const [userProfile, setUserProfile] = useState({ user: localStorage.getItem('username') });


  const handleProfileSelection = (profile) => {
    setUserProfile({
      name: userProfile.name,
      user: userProfile.user,
      rol: userProfile.rol,
      avatar: profile.src,
    });
    setselectProfile(profile.src);
  };
  return (
    <UserProfileContext.Provider
      value={{ userProfile, selectProfile, setUserProfile, handleProfileSelection, fullName, loadingProfile }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
