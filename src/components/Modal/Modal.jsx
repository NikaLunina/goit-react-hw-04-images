import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ onClose, largeImage }) => {
  //     componentDidMount(){
  // window.addEventListener('keydown',this.hendleKeyDown)
  //     }

  //     componentWillUnmount(){
  // window.removeEventListener('keydown',this.hendleKeyDown )
  //     }
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        console.log('close modal');
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={largeImage} alt="img" />
      </div>
    </div>
  );
};
