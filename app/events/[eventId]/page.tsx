import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { getEvent } from '@/app/api/events/route';
import Image from 'next/image';
import styles from '@/app/styles/Event.module.css';
import Link from 'next/link';

export default async function EventPage({ params }: { params: { eventId: string } }) {
  const evt = (await getEvent(params.eventId)).data.attributes;
  return (
    <div className={styles.event}>
      <div className={styles.controls}>
        <Link href={`/events/edit/${params.eventId}`}>
          <FaPencilAlt />
          Edit Event
        </Link>
        <a
          href="#"
          className={styles.delete}
        >
          <FaTimes />
          Delete Event
        </a>
      </div>
      <span>
        {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
      </span>
      <h1>{evt.name}</h1>
      <div className={styles.image}>
        <Image
          src={evt.image.data.attributes.formats.large.url || '/images/event-default.png'}
          alt={evt.name}
          width="960"
          height="640"
        />
      </div>
      <h2>Performers</h2>
      <p>{evt.performers}</p>
      <h2>Description</h2>
      <p>{evt.description[0].children[0].text}</p>
      <h2>Venue: {evt.venue}</h2>
      <p>{evt.address}</p>
      <Link
        href="/events"
        className={styles.back}
      >
        {'<'} Go back
      </Link>
    </div>
  );
}
