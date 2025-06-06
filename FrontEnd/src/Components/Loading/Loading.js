import React from 'react';
import './LoadStyle.css';
import Logotipo from '../../Assets/LogotipoA.png';

const Loading = () => {
  return (
    <>
      <div className='container-Loader'>
        <div className='loader-1'>
          <div className='loader-2'></div>
          <div className='loader-3'></div>
          <div className='loader-4'></div>
        </div>
        <div className='none-animation'>
          <div>
            <img className='logotipo-Antares' src={Logotipo} alt='Logotipo' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
