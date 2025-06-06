import React, { useContext } from 'react';

import Home from '../Pages/Home/Home';
// import FlotangAir from '../Pages/Home/FlotangAir';
import { AuthContext, AuthProvider } from '../Auth/Auth';
import { NotificationsContextPrivider } from '../Context/ContextNotification';
import { UserProfileProvider } from '../Context/ProfileContex';
import { AuthContextProvider } from '../Context/AuthContext';
import { LogsContextProvider } from '../Context/LogsContext';
import { NotificationsContextProviderNovelties } from '../Context/ContextNotificationNoveltie';
import { AllNotificationsProvider } from '../Context/AllNotificationsContext';

function PrivateRoutes() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

function Main() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div id='no-overflow'>
      {isAuthenticated ? (
        <div>
          <AuthContextProvider>
            <div>
              <UserProfileProvider>
                <div>
                  <AllNotificationsProvider>
                    <div>
                      <NotificationsContextProviderNovelties>
                        <div>
                          <NotificationsContextPrivider>
                            <div>
                            <LogsContextProvider>
                                <div>
                                  <Home />
                                </div>
                              </LogsContextProvider>
                            </div>
                          </NotificationsContextPrivider>
                        </div>
                      </NotificationsContextProviderNovelties>
                    </div>
                  </AllNotificationsProvider>
                </div>
              </UserProfileProvider>
            </div>
          </AuthContextProvider>
        </div>
      ) : (
        (window.location.href = '/')
      )}
    </div>
  );
}

export default PrivateRoutes;
