import { useEffect, useState } from "react";

export function getGenres(token){
    const [genres,setGenres]= useState([]);

    useEffect(()=>{
        async function getGenres(){
            let responce = await fetch("https://localhost:7000/api/Genre/getAllGenres",{
                method:'GET'
            });
            let data = await responce.json();
            setGenres(data.genres);
        }
        getGenres();
    },[])
    return genres;
}