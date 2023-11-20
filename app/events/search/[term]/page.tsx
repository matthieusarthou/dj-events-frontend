import { getEvents, getSearchResult } from '@/app/api/events/route';
import EventItem from '@/app/eventItem/page';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Search results',
  description: 'The results of your search are displayed here',
  keywords: 'music, dj, EDM, house, search, results',
};

export default async function SearchPage({ params }: { params: { term: string } }) {
  const evts = await getSearchResult(params.term);
  return (
    <div>
      <Link href="/events">Go back</Link>
      <h1>Search results for "{params.term}"</h1>
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
