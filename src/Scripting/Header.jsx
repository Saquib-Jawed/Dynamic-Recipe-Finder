// import React from 'react'

// function Header() {
//   return (
//     <div>Header</div>
//   )
// }

// export default Header


import React, { Component } from "react";
import "../Styling/Header.css";
import RecipeBody from "./RecipeBody";
import logo from "../logo.png";

class HeaderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: false,
      foodItem: "",
    };
  }

  getRecipe = (e) => {
    e.preventDefault();

    var item = document.getElementById("text").value;

    this.setState({
      searched: true,
      foodItem: item,
    });
  };

  render() {
    return (
      <div>
        <div className="header-container">
          <h1 className="logo"><img src={logo} alt="logo"></img>Recipe Finder</h1>
          <form className="input-form">
            <input
              type="text"
              placeholder="Enter the name of the dish"
              id="text"
            />
            <input
              type="submit"
              value="Get Recipes"
              onClick={this.getRecipe}
            />
          </form>
        </div>
        {this.state.searched ? (
          <RecipeBody foodItem={this.state.foodItem} />
        ) : (
          <div className="center">
            <h2>
              Type a Dish Name to search for its ingredients
            </h2>
          </div>
        )}
      </div>
    );
  }
}
export default HeaderForm;