import { Chip } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";

function Genres({selectedGenres, setSelectedGenres, genres, setGenres, setPage, type}){

    const handleAdd = (genre) =>{
        setSelectedGenres([...selectedGenres, genre])

        setGenres(genres.filter((g)=> g.id !== genre.id))
        setPage(1)
    }


    const handleRemove = (genre) =>{
        setSelectedGenres(
    selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre])
        setPage(1)
    }


    const fetchGenres = async () =>{
      const {data} =  await axios.get(
`https://api.themoviedb.org/3/genre/${type}/list?api_key=c4028c9a78ac705657966a3ce761f76c&language=en-US`)
    
    setGenres(data.genres)    
}

console.log(genres)


useEffect(()=>{
    fetchGenres()

    return ()=>{
        setGenres({})
    }

},[])


    return(
        <>
            <h5>Genres</h5>

            <div style={{padding: '6px 0'}}>

                {selectedGenres && selectedGenres.map((genre)=>(
                <Chip 
                label={genre.name} 
                color="primary"
                key={genre.id}
                size="small"
                clickable
                onDelete={() => handleRemove(genre)}

                />
                ))}

                {genres && genres.map((genre)=>(
                <Chip 
                label={genre.name} 
                key={genre.id}
                size="small"
                clickable
                onClick={() => handleAdd(genre)}

                />
                ))}
            </div>

        </>
    )
}

export default Genres

