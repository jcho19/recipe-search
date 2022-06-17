import React from 'react';
import './App.css';
const ShowRecipes = props => {
    if(props.recipeList.length === 0){
        return <div></div>
    }
    else {
        return(
        
        <div id="recipeLay">
        {props.recipeList.map((item, index) => <Item key={index} name={item.recipe.label} pic={item.recipe.image} 
            link={item.recipe.url}/>)}
        </div>
        );
    }
    
}

const Item = (props) => (
    
    <figure>
    <img src={props.pic} alt="Not found"></img>
    <figcaption><a href={props.link}>{props.name}</a></figcaption>
    </figure>
);
export default ShowRecipes