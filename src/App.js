import React, {useState, useRef, useEffect } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import ShowRecipes from './ShowRecipes';
function App() {

  const [kw, setKw] = useState(''); //keyword inputted in search bar
  const [call, setCall] = useState(false); //used as dependency for useEffect (when search button is clicked)
  const [recipes, setRecipes] = useState([]); //list of recipes matched with the keyword
  const mounted = useRef(false); // whether app component has mounted
  const appId = '0b73eaee'; //id to include in get request to edemam
  const appKey = '5cead79d1772930a23c30e5d6535346f'; //key to include in get request to edemam

  //if a keyword is inputted into the search bar
  const handleKw = e => {
    setKw(e.target.value);

  }
  // if the search button is clicked
  const handleCl = e => {
    setCall(!call);
  }


  //Skip sending get request on intialization. Runs when search button is clicked and 
  // keyword has changed from previous search
  useEffect(()=>{
    const sendGetRequest = async() => {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${kw}&app_id=${appId}&app_key=${appKey}`);
    if(response.ok) {
      const data = await response.json();
      if (data.count === 0){
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
      if(!mounted.current){
        mounted.current = true;
      }
      else{
        
        sendGetRequest();

      }
  
  },[call]);

  return (
      <div id="app">
      <h1 id="title">Find Recipes!</h1>
      <SearchBar updateKw={handleKw} updClick={handleCl} searchVal={kw} />
      <ShowRecipes recipeList={recipes} />

      </div>
  
  );
}


export default App;
