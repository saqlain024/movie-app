import React from "react";
import { connect } from "react-redux";
import { data as moviesList } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourite } from "../actions";
// import { StoreContext } from "../index";

//whenever dispatch is happend then suscribe is called and executed

class App extends React.Component {
  // componentDidMount() {
  // const { store } = this.props;
  // store.subscribe(() => {
  //   console.log("UPDATED");
  //   this.forceUpdate(); // rerender whole app component forcefully
  // });

  //   //make api call
  //   // dispatch action
  //   store.dispatch(addMovies(data));

  //   console.log("STATE", this.props);
  // }
  componentDidMount() {
    this.props.dispatch(addMovies(moviesList));
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);

    if (index !== -1) {
      //found the movie
      return true;
    }

    return false;
  };

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourite(val));
  };

  render() {
    const { movies, search } = this.props; // {movies: {}, search :{} }
    const { list, favourites, showFavourite } = movies;

    const displayMovies = showFavourite ? favourites : list;

    return (
      <div className="App">
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourite ? "" : "active-tabs"}`}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourite ? "active-tabs" : ""}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movies-${index}`}
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length == 0 ? (
            <div className="no-movies"> no movies to display!</div>
          ) : null}
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component{
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }

// }

function callback(state) {
  return {
    movies: state.movies,
    search: state.search,
  };
}

const connectedAppComponent = connect(callback)(App);
export default connectedAppComponent;
