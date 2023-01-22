export default function EventPage({ params }: { params: { eventId: string } }) {
  return <h1>{params.eventId}</h1>;
}
