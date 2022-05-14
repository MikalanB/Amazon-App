import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import "../css/Header.css";

const Search = (props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [ products, setProducts ] = useState([])

    useEffect (() => {
        axios.get("http://localhost:8000/api/products/all")
            .then(res=> {
                console.log(res.data)
                setProducts(res.data)
            })   
    }, [])


    return(
        <div className="header__search">
            <input className="header__searchInput" type="text" onChange={(e)=>setSearchTerm(e.target.value)} name="search-form" value={searchTerm} />
            <div className="search__resultsbox">
            { searchTerm?.length === 0 ? null : 
                products.filter((prod)=>{
                    return prod.title.toLowerCase().includes(searchTerm.toLowerCase())
                }).map((prod, i)=>{
                    return <div key={i} className="search__results">
                        <Link to={`/view/${prod._id}`} className="result__link">
                            <span className="result__text"><strong>{prod.title}</strong></span>
                            </Link>
                        </div>
                })}
            </div>
        </div>
    )
}

export default Search;