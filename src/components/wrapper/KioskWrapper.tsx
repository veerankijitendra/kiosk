import type { PropsWithChildren } from 'react';
import './KioskWrapper.css';

const KioskWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className='kiosk-wrapper'>
      <div className='kiosk-container'>
        <div className='kiosk-inner'>
          {/* <Outlet /> */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default KioskWrapper;
