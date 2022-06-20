import {AiOutlineSearch} from "react-icons/ai"
import React from 'react';
import './App.css'

// displays search bar with button
const SearchBar = props => {
    const {updateKw, updClick, searchVal} = props;
    return (
    <div id="search">
    <input type="text" placeholder="Enter an ingredient/dish" value={searchVal} onChange={updateKw}></input>
    <button onClick={updClick}><AiOutlineSearch/></button>
    </div>
    );
  };
  export default SearchBar
