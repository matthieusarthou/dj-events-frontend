import Image from 'next/image';
import styles from '@/app/page.module.css';
import { getEvents } from './api/events/route';

export default async function Home() {
  const evts = await getEvents();
  console.log(evts);
  return (
    <div>
      <h1>Upcoming events</h1>
      {evts.props.res === 0 && <h3>No events found.</h3>}
      {evts.props.res.map((evt: any) => (
        <h3 key={evt.id}>{evt.name}</h3>
      ))}
    </div>
  );
}
