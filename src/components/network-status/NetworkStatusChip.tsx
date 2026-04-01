// import { useNetworkStore } from '../../store/useNetworkStore';
// import './NetworkStatusChip.css';

// export const NetworkStatusChip = () => {
//   const { status, showOnlineChip } = useNetworkStore();

//   if (status === 'offline') {
//     return <div className='network-status-chip offline'>No Internet</div>;
//   }

//   if (status === 'slow') {
//     return <div className='network-status-chip slow'>Slow Internet</div>;
//   }

//   if (status === 'online' && showOnlineChip) {
//     return <div className='network-status-chip online'>Back Online</div>;
//   }

//   return null;
// };

import { useNetworkStore } from '../../store/useNetworkStore';
import './NetworkStatusChip.css';
import HeartbeatAnimation from '../suspence/Suspence';

export const NetworkStatusChip = () => {
  const { status, showOnlineChip } = useNetworkStore();

  // If offline, show full overlay that blocks interactions
  if (status === 'offline') {
    return (
      <>
        <div className='network-overlay offline-overlay'>
          <HeartbeatAnimation className='offline-heartbeat' />
        </div>
        <div className='network-status-chip offline'> No Internet</div>
      </>
    );
  }

  if (status === 'slow') {
    return <div className='network-status-chip slow'> Slow Internet</div>;
  }

  if (status === 'online' && showOnlineChip) {
    return <div className='network-status-chip online'> Back Online</div>;
  }

  return null;
};
