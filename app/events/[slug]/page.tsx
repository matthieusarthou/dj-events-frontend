export default function EventPage({ params }: { params: { slug: string } }) {
    return (
        <div>
            <h1>My event {params.slug}</h1>
        </div>
    )
}
