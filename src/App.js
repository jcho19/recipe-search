import React, {useState, useRef, useEffect } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import ShowRecipes from './ShowRecipes';
function App() {

  const [kw, setKw] = useState(''); // keyword inputted in search bar
  const [clicked, setClicked] = useState(false); // whether search button is clicked
  const [recipes, setRecipes] = useState([]); // list of recipes matched with kw
  const mounted = useRef(false); // whether app component has mounted
  const appId = '0b73eaee'; // id to include in GET request (Edemam Recipe Search API call)
  const appKey = '5cead79d1772930a23c30e5d6535346f'; // key to include in GET request (Edemam Recipe Search API call)

  // set kw to keyword inputted into the search bar
  const handleKw = e => {
    setKw(e.target.value);

  }
  // search button is clicked
  const handleCl = e => {
    setClicked(!clicked);
  }


  // sends GET request (Edemam Recipe Search API call)
  // runs whenever search button is clicked (doesn't run after first render)
  useEffect(()=>{
    
    const sendGetRequest = async() => {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${kw}&app_id=${appId}&app_key=${appKey}`);
    if(response.ok) {
      const data = await response.json();
      //if no recipes were matched with kw
      if (data.count === 0){
        setRecipes([])
        alert("Please enter a valid ingredient/dish");

      }
      else{
        console.log(data);
        setRecipes(data.hits);
      }
    }
    else {
      throw Error(response.status);
    }

  }

    // don't send GET request after first render
      if(!mounted.current){
        mounted.current = true;
      }
      else{
        
        sendGetRequest();

      }
  
  },[clicked]);

  return (
      <div id="app">
      <h1 id="title">Find Recipes!</h1>
      <SearchBar updateKw={handleKw} updClick={handleCl} searchVal={kw} />
      <ShowRecipes recipeList={recipes} />

      </div>
  
  );
}


export default App;
