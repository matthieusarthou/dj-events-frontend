export default function EventPage({ params }: { params: { eventId: string } }) {
  return (
    <div>
      <h1>My event {params.eventId}</h1>
    </div>
  );
}
