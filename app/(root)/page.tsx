import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query: string }>
}) {
  const query = (await searchParams).query;

  const posts = [{
    _createdAt: new Date(),
    views: 100,
    author: { _id: 1, name: "John Doe" },
    _id: 1,
    title: "Startup 1",
    description: "Description of startup 1",
    image: "https://i.imgur.com/zTtzvAu.png",
    category: "Category 1"
  },{
    _createdAt: new Date(),
    views: 100,
    author: { _id: 1, name: "John Doe" },
    _id: 1,
    title: "Startup 1",
    description: "Description of startup 1",
    image: "https://i.imgur.com/zTtzvAu.png",
    category: "Category 1"
  },{
    _createdAt: new Date(),
    views: 100,
    author: { _id: 1, name: "John Doe" },
    _id: 1,
    title: "Startup 1",
    description: "Description of startup 1",
    image: "https://i.imgur.com/zTtzvAu.png",
    category: "Category 1"
  },{
    _createdAt: new Date(),
    views: 100,
    author: { _id: 1, name: "John Doe" },
    _id: 1,
    title: "Startup 1",
    description: "Description of startup 1",
    image: "https://i.imgur.com/zTtzvAu.png",
    category: "Category 1"
  },{
    _createdAt: new Date(),
    views: 100,
    author: { _id: 1, name: "John Doe" },
    _id: 1,
    title: "Startup 1",
    description: "Description of startup 1",
    image: "https://i.imgur.com/zTtzvAu.png",
    category: "Category 1"
  }]

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br />Connect with Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches and Get Notifced in Virtual Competitions</p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) :
            (
              <p className="no-result">No startups found</p>
            )}
        </ul>
      </section>
    </>
  );
}
