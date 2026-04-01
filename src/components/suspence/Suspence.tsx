import { type FC } from 'react';
import './Suspence.css';
import { cn } from '../../lib/utils';

interface HeartbeatAnimationProps {
 color?: string;
 className?: string; // Optional prop to set the line color (defaults to red)
}

const HeartbeatAnimation: FC<HeartbeatAnimationProps> = ({ color = '#3b82f6', className }) => {
 return (
  <div className={cn('loader-wrapper', className)}>
   <div className='heartbeat-container'>
    <svg
     className='heartbeat-svg'
     viewBox='0 0 500 200' // Define the coordinate system
     preserveAspectRatio='xMidYMid meet'
    >
     {/* The heartbeat line path */}
     <path
      className='heartbeat-path'
      d='M 10 100 L 100 100 L 125 125 L 150 100 L 175 110 L 190 90 L 205 115 L 225 100 L 250 10 L 275 100 L 300 190 L 325 100 L 350 115 L 375 100 L 400 120 L 425 100 L 490 100'
      stroke={color}
      strokeWidth='5'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
     />
     {/* Start and end dots */}
     {/* <circle cx='10' cy='100' r='5' fill={color} /> */}
     {/* <circle cx='490' cy='100' r='5' fill={color} /> */}
    </svg>
   </div>
  </div>
 );
};

export default HeartbeatAnimation;
