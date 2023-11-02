import styles from '@/app/styles/Error.module.css';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Page not foung',
};

export default function NotFound() {
  return (
    <div className={styles.error}>
      <h1>
        <FaExclamationTriangle /> 404
      </h1>
      <h4>It seems you got lost.</h4>
      <Link href="/">Go back home</Link>
    </div>
  );
}
