import React from "react";
import Pagination from '@material-ui/lab/Pagination';
//npm install @material-ui/lab

function CustomPagination({setPage, numOfPages = 10}){

    const handlePageChange = (page)=>{
        setPage(page)
        window.scroll(0,0)
    }


    return(
        <>

        <div
        style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            
        }}
        >

            
            <Pagination 
            count={numOfPages}
            onChange={(e)=> 
            handlePageChange(e.target.textContent)}
            color="primary"
            />
        
        </div>
        </>
    )
}

export default CustomPagination