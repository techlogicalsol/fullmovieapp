import React from "react";

function Header(){
    return(
        <>
        <span onClick={()=> window.scroll(0, 0)} className="header">
            <h1 className="text-center">Header</h1>
        </span>
        </>
    )
}

export default Header