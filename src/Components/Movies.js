import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "./CustomPagination";
import Genres from "./Genres";
import UseGenre from "./UseGenre";



function Movies(){

    const API_KEY = "c4028c9a78ac705657966a3ce761f76c"
    const img_300 = "https://image.tmdb.org/t/p/w300";
    const not_available = '/img/post.jpg'


    const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [numOfPages, setNumOfPages] = useState()
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genres, setGenres] = useState([])
    const genreforURL = UseGenre(selectedGenres)




    const fetchMovies = async () =>{
        const { data } = await axios.get(`
https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)

    //console.log(data)
    setContent(data.results)
    setNumOfPages(data.total_pages)
}


    useEffect(()=>{
        fetchMovies()
    },[page, genreforURL])

    return(
        <>
            <h1>Movies</h1>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                    <Genres 
                        type="movie"
                        selectedGenres={selectedGenres}
                        setSelectedGenres={setSelectedGenres}
                        genres={genres}
                        setGenres={setGenres}
                        setPage={setPage}
                    />

                        <div className="row">
                            {content.length && content.map((item)=>(
                                <div className="col-md-3 mb-3" key={item.id}>
                                    <img src= {item.poster_path ? 
                                    `${img_300 + item.poster_path}` 
                                    : not_available} 
                                    className="trendImg" alt={item.title}/>

                                    <div className="card-body">
                                        <p>{item.title || item.name}</p>
                                        <p>{item.release_date || item.first_air_date}</p>
                                        {/* <p>{item.media_type === "tv" ? "TV Series" : "Movie"}</p> */}
                                        <p>Movies{item.media_type}</p>
                                        <p>{item.vote_average}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {numOfPages > 1 && (
                        <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Movies