import React from 'react';
import './StatusChip.css';

interface StatusChipProps {
  isOnline: boolean;
}

const StatusChip: React.FC<StatusChipProps> = ({ isOnline }) => {
  return (
    <div className={`status-chip ${isOnline ? 'is-online' : 'is-offline'}`}>
      <span className='status-dot'></span>
      <span className='status-text'>{isOnline ? 'System Online' : 'System Offline'}</span>
    </div>
  );
};

export default StatusChip;
