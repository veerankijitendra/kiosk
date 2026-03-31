import './KioskWrapper.css';
import { Outlet } from 'react-router-dom';

const KioskWrapper = () => {
  return (
    <div className='kiosk-wrapper'>
      <div className='kiosk-container'>
        <div className='kiosk-inner'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default KioskWrapper;
