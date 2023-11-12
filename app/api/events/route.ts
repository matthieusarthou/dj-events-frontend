const { events } = require('@/app/api/events/data.json');

// export async function GET(request: Request) {
//   const { searchParams: requestParams } = new URL(request.url);
//   const evtId = requestParams.get('eventId');
//   const evt = events.filter((e) => e.id === evtId);

//   return NextResponse.json(evt);
// }

export async function getEvents() {
  const res = await events;
  return {
    props: {
      res,
    },
  };
}

export async function getEvent(eventId: string) {
  const res = await events.filter((evt: { id: any }) => evt.id == eventId)[0];
  console.log(res);
  return {
    props: {
      res,
    },
  };
}
