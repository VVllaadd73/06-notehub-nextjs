// src/Modal/Modal

import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface ModalProps {
   children: React.ReactNode;
   onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
   useEffect(() => {
      const scrollbarWidth =
         window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      const onEsc = (e: KeyboardEvent) => {
         if (e.key === 'Escape') onClose();
      };

      window.addEventListener('keydown', onEsc);

      return () => {
         window.removeEventListener('keydown', onEsc);
         document.body.style.overflow = '';
         document.body.style.paddingRight = '';
      };
   }, [onClose]);

   const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
   };

   return createPortal(
      <div
         className={css.backdrop}
         onClick={handleBackdropClick}
         role="dialog"
         aria-modal="true"
      >
         <div className={css.modal}>{children}</div>
      </div>,
      document.body
   );
}
