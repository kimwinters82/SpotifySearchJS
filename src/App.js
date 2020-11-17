import React, { Component } from "react";
import image from "../Images/cs385spotify.png";
import { spotifyArray } from "./SpotifyArray.js";
const Spotify = spotifyArray;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { search: " ", length: 0, songsArray: Spotify };
    this.searchForm = this.searchForm.bind(this);
  } // end constructor

  searchForm(event) {
    this.setState({ search: event.target.value });
    let userEntered = event.target.value;
    let numChars = userEntered.length;

    this.setState({ length: numChars });
  }

  render() {
    return (
      <div className="App">
        <h1>CS385 Spotify Search App</h1>
        <img scr={image} />
        The search term is [{this.state.search}]<br />
        The length of the search is [{this.state.length}]
        <ComponentA search={this.state.search} onChange={this.searchForm} />
        <ComponentB
          songsArray={this.state.songsArray}
          search={this.state.search}
        />
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

//**************************************************//

class ComponentA extends Component {
  render() {
    const searchPassed = this.props.search; // passed from comA in app(parent-child)
    const onChangePassed = this.props.onChange; // passed from comA in app(parent-child)

    return (
      <div className="ComponentA">
        <hr />
        Search Component
        <form>
          <b>Type search here</b>
          <input type="text" value={searchPassed} onChange={onChangePassed} />
        </form>
        <br />
      </div>
    );
  }
} // close the ComponentA component
//**************************************************//

class ComponentB extends Component {
  getResults(a) {
    return function (obj) {
      let title1 = obj.title;
      let artist1 = obj.artist;
      let genre1 = obj.topgenre;

      return (
        a !== "" &&
        (title1.includes(a) || artist1.includes(a) || genre1.includes(a))
      );
    };
  }

  render() {
    const searchpassed = this.props.search; // passed from comB in app(parent-child)
    const songsArray = this.props.songsArray; // passed from comB in app(parent-child)
    const nResults = songsArray.filter(this.getResults(searchpassed)).length;

    return (
      <div className="ComponentB">
        <hr />
        <h1>Search results...</h1>
        <h4>Number of results {nResults}</h4>
        {songsArray.filter(this.getResults(searchpassed)).map((s) => (
          <div key={s.ID}>
            {s.ID}: {s.title}, {s.artist}, {s.topgenre}
          </div>
        ))}
      </div>
    );
  }
} // close the ComponentB component

export default App;
