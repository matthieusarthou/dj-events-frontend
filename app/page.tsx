import Image from 'next/image';
import styles from '@/app/page.module.css';
import { getEvents } from './api/events/route';
import EventItem from './eventItem/page';
import Link from 'next/link';

export default async function Home() {
  const evts = await getEvents();
  return (
    <div>
      <h1>Upcoming events</h1>
      {evts.props.res === 0 && <h3>No events found.</h3>}
      {evts.props.res.slice(0, 3).map((evt: any) => (
        <div>
          <EventItem
            key={evt.id}
            evt={evt}
          />
        </div>
      ))}
      {evts.props.res.length > 3 && (
        <Link
          href="/events"
          className="btn-secondary"
        >
          View All Events
        </Link>
      )}
    </div>
  );
}
