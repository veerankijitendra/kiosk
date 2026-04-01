import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

// const variants = {
//   initial: { x: '100%', opacity: 0 },
//   animate: { x: 0, opacity: 1 },
//   exit: { x: '-100%', opacity: 0 },
// };

// const variants = {
//   initial: (dir: number) => ({
//     x: dir > 0 ? '100%' : '-100%',
//   }),
//   animate: { x: 0 },
//   exit: (dir: number) => ({
//     x: dir > 0 ? '-100%' : '100%',
//   }),
// };

const variants = {
  initial: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

interface IProps extends PropsWithChildren {
  direction: 1 | -1;
}

export default function Animation({ children, direction }: IProps) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </motion.div>
  );
}
