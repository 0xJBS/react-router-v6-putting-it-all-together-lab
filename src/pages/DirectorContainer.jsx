import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const DirectorContainer = () => {
    const [directors, setDirectors] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/directors")
        .then(r => {
            if (!r.ok) { throw new Error("failed to fetch directors") }
            return r.json()
        })
        .then(setDirectors)
        .catch(console.log)
    }, [])

    const handleAddDirector = (newDirector) => {
        setDirectors((prev) => [...prev, newDirector])
    }

    const handleUpdateDirector = (updatedDirector) => {
        setDirectors((prev) =>
            prev.map((d) => (d.id.toString() === updatedDirector.id.toString() ? updatedDirector : d))
        )
    }

    return (
        <>
            <NavBar />
            <main>
                <h1>Welcome to the Director's Directory!</h1>
                <Outlet context={{ directors, onAddDirector: handleAddDirector, onUpdateDirector: handleUpdateDirector }} />
            </main>
        </>
    )
}

export default DirectorContainer