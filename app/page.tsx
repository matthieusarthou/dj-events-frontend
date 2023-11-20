import { getEvents } from './api/events/route';
import EventItem from './eventItem/page';
import Link from 'next/link';

export default async function Home() {
  const evts = await getEvents(true);
  return (
    <div>
      <h1>Upcoming events</h1>
      {evts.data === 0 && <h3>No events found.</h3>}
      {evts.data.map((evt: any) => (
        <div>
          <EventItem
            key={evt.id}
            evt={evt.attributes}
            evtId={evt.id}
          />
        </div>
      ))}
      {
        <Link
          href="/events"
          className="btn-secondary"
        >
          View All Events
        </Link>
      }
    </div>
  );
}
