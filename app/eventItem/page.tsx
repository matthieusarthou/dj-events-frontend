import Link from 'next/link';
import Image from 'next/image';
import styles from '@/app/styles/EventItem.module.css';

export default function EventItem({ evt, evtId }: { evt: any; evtId: any }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={evt.image.data?.attributes.formats.thumbnail.url || '/images/event-default.png'}
          alt={evt.name}
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>{`${new Date(evt.date).toLocaleDateString('en-US')} - ${evt.time}`}</span>
        <h3>{evt.name}</h3>
      </div>
      <div>
        <Link
          href={`/events/${evtId}`}
          className="btn btn-primary"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
