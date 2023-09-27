import MyLayout from 'components/MyLayout';
import { easeInOut, motion } from 'framer-motion';
import { useState } from 'react';

const TestPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const variants = {
    open: { y: '-100%' },
    closed: { y: '0%' },
  };

  return (
    <MyLayout hasFooter={false}>
      <div>
        <h1>Test Page</h1>
        <motion.div
          className="w-12 h-12 border border-mainBlue"
          animate={isOpen ? 'open' : 'closed'}
          variants={variants}
          transition={{
            duration: 0.3,
            ease: easeInOut,
          }}
        >
          MOVE
        </motion.div>
        <button onClick={() => setIsOpen(!isOpen)}>NEXT PAGE</button>
      </div>
    </MyLayout>
  );
};

export default TestPage;
