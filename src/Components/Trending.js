import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CustomPagination from "./CustomPagination";

function Trending(){
    const API_KEY = "c4028c9a78ac705657966a3ce761f76c"
    const img_300 = "https://image.tmdb.org/t/p/w300";
    const not_available = '/img/post.jpg'

    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)

    const fetchTrending = async() =>{
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`);

        console.log(data)
        setContent(data.results);
    }

    useEffect(()=>{
        fetchTrending()
    },[page])

    

    return(
        <>
            <h1>Trending</h1>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
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
                                        <p>{item.media_type === "tv" ? "TV Series" : "Movie"}</p>
                                        <p>{item.vote_average}</p>
                                        
                                        <button className="btn btn-primary">More Info</button>
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                        <CustomPagination setPage={setPage} />
                    </div>
                </div>
            </div>

            

        </>
    )
}

export default Trending