'use client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { getEvent } from '@/app/api/events/route';
import Image from 'next/image';
import styles from '@/app/styles/Event.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default async function EventPage({ params }: { params: { eventId: string } }) {
  const router = useRouter();
  const evt = (await getEvent(params.eventId)).data.attributes;

  const deleteEvent = async (e: any) => {
    if (!confirm('Are you sure you wish to delete this event?')) {
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          toast.error(`Error! Status: ${response.status}`);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Resource deleted successfully');
        router.push('/events');
      })
      .catch((error) => {
        console.error('Error deleting resource:', error.message);
        toast.error('Error deleting resource:', error.message);
      });
  };

  return (
    <div className={styles.event}>
      <ToastContainer />
      <div className={styles.controls}>
        <Link href={`/events/edit/${params.eventId}`}>
          <FaPencilAlt />
          Edit Event
        </Link>
        <a
          href="#"
          onClick={deleteEvent}
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
          src={evt.image.data?.attributes.formats.large.url || '/images/event-default.png'}
          alt={evt.name}
          width="960"
          height="640"
        />
      </div>
      <h2>Performers</h2>
      <p>{evt.performers}</p>
      <h2>Description</h2>
      <pre>{evt.description ? evt.description[0].children[0].text : 'N/A'}</pre>
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
