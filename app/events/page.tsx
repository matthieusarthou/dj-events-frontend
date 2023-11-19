import { getEvents } from '../api/events/route';
import EventItem from '../eventItem/page';

export default async function Page() {
  const evts = await getEvents();
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
    </div>
  );
}
