// import React from 'react'

// function RecipeBody() {
//   return (
//     <div>RecipeBody</div>
//   )
// }

// export default RecipeBody


import React, { Component } from "react";
import Axios from "axios";
import "../Styling/RecipeBody.css";

class RecipeBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: [],
    };
  }

  componentDidMount() {
    console.log(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
        this.props.foodItem
    );
    if (this.props.foodItem === "") alert("Enter a Dish!!");
    else {
      Axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
          this.props.foodItem
      ).then((resolve) => {
        console.log(resolve.data.meals);
        this.setState({
          meal: resolve.data.meals,
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.foodItem !== prevProps.foodItem) {
      if (this.props.foodItem === "") alert("Enter a Dish!!");
      else {
        Axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
            this.props.foodItem
        ).then((resolve) => {
          console.log(resolve.data.meals);
          this.setState({
            meal: resolve.data.meals,
          });
        });
      }
    }
  }

  render() {
    const { meal } = this.state;
    if (meal !== null && meal.length > 0) {
      var list = [];
      let i = 1;

      while (meal[0]["strIngredient" + i] !== "") {
        list.push(
          <li key={i}>
            {meal[0]["strIngredient" + i] + "----" + meal[0]["strMeasure" + i]}
          </li>
        );
        i++;
      }
      console.log(list);
    }

    const id =
      meal !== null && meal.length > 0 ? (
        <div className="recipeContainer">
          <h1 className="title">{meal[0].strMeal}</h1>
          <img className="img" src={meal[0].strMealThumb} alt={"Your meal for " + meal[0].strMeal}/>
          <div className="category">
            <p>
              <em>Category of Meal :</em> {meal[0].strCategory}{" "}
            </p>
            <p>
              <em>Area of the Meal :</em> {meal[0].strArea}{" "}
            </p>
            </div>
            <a href={meal[0].strYoutube} target="_blank" rel="noreferrer"><button className="button">Recipe Video</button></a>
            <h3 className="recipes-header">Recipes</h3>
            <div className="recipe">{list}{<br/>}{<br/>}{meal[0].strInstructions}</div>
        </div>
    ) : (
      <div className="noData">No Data has been recieved</div>
    );
    return <div>{id}</div>;
  }
}

export default RecipeBody;
