export async function getEvents(getFirstThreeOnly: boolean = false) {
  const apiRequest = getFirstThreeOnly ? `${process.env.NEXT_PUBLIC_API_URL}/api/events?populate=*&sort=date:asc&pagination[limit]=3` : `${process.env.NEXT_PUBLIC_API_URL}/api/events?populate=*&sort=date:asc`;
  const response = await fetch(apiRequest);
  return await response.json();
}

export async function getEvent(eventId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}?populate=*`);
  return await response.json();
}

export async function getSearchResult(searchTerm: string) {
  const query = `populate=*&filters[$or][0][name][$contains]=${searchTerm}&filters[$or][1][venue][$contains]=${searchTerm}&filters[$or][2][address][$contains]=${searchTerm}&filters[$or][3][performers][$contains]=${searchTerm}`;
  console.log(query);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events?${query}`);
  return await response.json();
}
