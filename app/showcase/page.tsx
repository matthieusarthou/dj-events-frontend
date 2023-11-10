'use client';
import { usePathname } from 'next/navigation';
import styles from '@/app/styles/Showcase.module.css';

export default function Showcase() {
  const pathname = usePathname();
  return pathname === '/' ? (
    <div className={styles.showcase}>
      <h1>Welcome to the party!</h1>
      <h4>Find the hottest DJ events</h4>
    </div>
  ) : null;
}
