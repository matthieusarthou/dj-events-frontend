'use client';
import styles from '@/app/styles/Search.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/events/search/${searchTerm}`);
    setSearchTerm('');
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Events"
        ></input>
      </form>
    </div>
  );
}
