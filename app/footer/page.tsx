import Link from 'next/link';
import styles from '@/app/styles/Footer.module.css';

export default function FooterPage() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ Events {2023}</p>
      <Link href="/about">About</Link>
    </footer>
  );
}
