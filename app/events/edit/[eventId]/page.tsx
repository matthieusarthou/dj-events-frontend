'use client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSave } from 'react-icons/fa';
import { getEvent } from '@/app/api/events/route';
import styles from '@/app/styles/Form.module.css';
import Link from 'next/link';
import { FaImage } from 'react-icons/fa';
import Image from 'next/image';
import { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface FormValues {
  name: string;
  performers: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  description: any;
}

export default function EditEventPage({ params }: { params: { eventId: string } }) {
  const router = useRouter();
  const [description, setDescription] = useState();
  const [values, setValues] = useState<FormValues>({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  });
  const [imagePreview, setImagePreview] = useState();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const evt = (await getEvent(params.eventId)).data.attributes;
        if (isMounted) {
          setValues({ ...evt, date: evt.date.substring(0, 10) });
          setDescription(evt.description[0].children[0].text);
          console.log();
          setImagePreview(evt.image ? evt.image.data.attributes.formats.thumbnail.url : null);
        }
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm('Do you want to save your changes?')) {
      return;
    }
    const hasMissingInfo = Object.values(values).some((v) => v === '') || description === '';
    if (hasMissingInfo) {
      toast.error('Missing information!');
      return;
    }

    values.description = [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: description,
          },
        ],
      },
    ];
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { ...values } }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const evt = await response.json();
        router.push(`/events/${evt.data.id}`);
      }
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setValues({ ...values, [name]: value });
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setDescription(value);
  };

  return (
    <div>
      <Link href="/events">Events</Link>
      <h1>Edit an event</h1>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <div className={styles.grid}>
          <div>
            {' '}
            <label
              htmlFor="name"
              className={styles.label}
            >
              Event name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="performers"
              className={styles.label}
            >
              Performers
            </label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="venue"
              className={styles.label}
            >
              Venue
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>{' '}
          <div>
            <label
              htmlFor="address"
              className={styles.label}
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className={styles.label}
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className={styles.label}
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>{' '}
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleTextareaChange}
          />
        </div>
        <input
          type="submit"
          value="Update Event"
          className="btn"
        />
      </form>
      <h2>Event image</h2>
      {imagePreview ? (
        <div className={styles.img}>
          <Image
            src={imagePreview}
            alt={values.name}
            width={170}
            height={100}
          />
        </div>
      ) : (
        <div>
          <p>No Image uploaded.</p>
        </div>
      )}
      <div>
        <button className="btn-secondary">
          <FaImage /> Change image
        </button>
      </div>
    </div>
  );
}
