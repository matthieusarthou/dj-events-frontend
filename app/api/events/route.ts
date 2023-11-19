export async function getEvents(getFirstThreeOnly: boolean = false) {
  const apiRequest = getFirstThreeOnly ? `${process.env.NEXT_PUBLIC_API_URL}/api/events?populate=*&sort=date:asc&pagination[limit]=3` : `${process.env.NEXT_PUBLIC_API_URL}/api/events?populate=*&sort=date:asc`;
  const response = await fetch(apiRequest);
  return await response.json();
}

export async function getEvent(eventId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}?populate=*`);
  return await response.json();
}
