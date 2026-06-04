import { useParams, useOutletContext, Link, Outlet } from "react-router-dom"

function DirectorCard() {
    const { id } = useParams()
    const { directors, onUpdateDirector } = useOutletContext()

    // Defensive lookup logic handling mixed number/string variations safely
    const director = directors.find(d => d.id.toString() === id?.toString())

    if (!director) {
        return <h2>Director not found.</h2>
    }

    return (
        <div>
            <h2>{director.name}</h2>
            <p>{director.bio}</p>
            <h3>Movies:</h3>
            <ul>
                {director.movies.map((movie) => (
                <li key={movie.id}>
                    <Link to={`movies/${movie.id}`}>{movie.title}</Link>
                </li>
                ))}
            </ul>
            <Link to={`movies/new`}>Add New Movie</Link>
            
            {/* Essential layout hub for downstream MovieForm and MovieCard routing paths */}
            <Outlet context={{ director, onUpdateDirector }} />
        </div>
    )
}

export default DirectorCard