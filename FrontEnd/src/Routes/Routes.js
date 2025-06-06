import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Error404 from '../ERROR/Error404';
import Loading from '../Components/Loading/Loading';
import { AuthContextProvider } from '../Context/AuthContext';


import PrivateRoutes from './PrivateRoutes';
const Login = lazy(() => import('../Pages/Login/Login'));


const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<AuthContextProvider><Login /></AuthContextProvider>} />
        <Route path='/Home/*' element={<Suspense fallback={<Loading />}><PrivateRoutes /></Suspense>} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
