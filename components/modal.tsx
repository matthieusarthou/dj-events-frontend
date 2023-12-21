import styles from '@/app/styles/Modal.module.css';
import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';

export default function Modal({ show, title, onClose, children }: { show: any; title: string; onClose: any; children: any }) {
  const [isBrowserReady, setIsBrowserReady] = useState(false);
  const handleCloseClick = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  useEffect(() => setIsBrowserReady(true));

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a
            href="#"
            onClick={handleCloseClick}
          >
            <FaTimes />
          </a>
        </div>
        {title ?? <h1>{title}</h1>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  return isBrowserReady ? ReactDOM.createPortal(modalContent, document.getElementById('modal-root')!) : null;
}
