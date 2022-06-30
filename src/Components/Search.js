import { Button, Tab, Tabs, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from '@material-ui/icons/Search'
import CustomPagination from "./CustomPagination";
import axios from "axios";

function Search(){

    const API_KEY = "c4028c9a78ac705657966a3ce761f76c"
    const img_300 = "https://image.tmdb.org/t/p/w300";
    const not_available = '/img/post.jpg'


    const [type, setType] = useState(0)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")
    const [content, setContent] = useState([])
    const [numOfPages, setNumOfPages] = useState()


    const fetchSearch = async ()=>{
       const {data} = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );

        setContent(data.results);
        setNumOfPages(data.total_pages)
    }


    useEffect(()=>{
        window.scroll(0,0)
        fetchSearch()
    },[type, page])


    return(
        <>
            <h1>Search</h1>
            <div style={{display: "flex", margin: "15px 0" }}>
            <TextField 
                style={{flex: 1}}
                className="searchBox"
                label="search"
                variant="filled"
                onChange={(e)=> setSearchText(e.target.value)}
            />
            <Button variant="contained" 
            style={{marginLeft: 10}}
            onClick={fetchSearch}
            > 
            <SearchIcon /> 
            </Button>
            </div>

            <Tabs 
            value={type} 
            indicatorColor="primary" 
            textColor="primary"
            onChange={(event, newValue)=>{
                setType(newValue)
                setPage(1)
            }}
            style={{ paddingBottom: 5}}
            >

                <Tab style={{width: "50%"}}label="Search Movies"  />
                <Tab style={{width: "50%"}}label="Search TV Series"  />

            </Tabs>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            {content && content.map((item)=>(
                                <div className="col-md-3 mb-3" key={item.id}>
                                    <img src= {item.poster_path ? 
                                    `${img_300 + item.poster_path}` 
                                    : not_available} 
                                    className="trendImg" alt={item.title}/>

                                    <div className="card-body">
                                        <p>{item.title || item.name}</p>
                                        <p>{item.release_date || item.first_air_date}</p>
                                        <p>{item.media_type ? "tv" : "movie"}</p>
                                        <p>{item.vote_average}</p>
                                    </div>
                                </div>
                            ))}

                            {searchText && 
                            !content && (type ? <h2> No Series Found </h2> : 
                            <h2>No Movies Found</h2>)}
                        </div>
                        {numOfPages > 1 && (
                        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search