'use client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/styles/Form.module.css';

export default function AddEventPage() {
  const [values, setValues] = useState({
    name: 'name',
    performers: 'performers',
    venue: 'venue',
    address: 'address',
    date: '2001-01-01',
    time: '10:10',
    description: 'description',
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasMissingInfo = Object.values(values).some((v) => v === '');
    console.log(values);
    if (hasMissingInfo) {
      // toast.error('Missing information!');
    }
    console.log(JSON.stringify(values));
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { ...values } }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const evt = await response.json();
        router.push(`/events/${evt.id}`);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setValues({ ...values, [name]: value });
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setValues({ ...values, [name]: value });
  };

  return (
    <div>
      <Link href="/events">Events</Link>
      <h1>Add an event</h1>
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
            value={values.description}
            onChange={handleTextareaChange}
          />
        </div>
        <input
          type="submit"
          value="Add Event"
          className="btn"
        />
      </form>
    </div>
  );
}
