// {
//     type: 'ADD_MOVIES',
//     movies: [m1, m2, m3, m4]
// }
// {
//     type: 'DECREASE_COUNT'
// }

//action types
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_TO_FAVOURITE = "ADD_TO_FAVOURITE";
export const REMOVE_FROM_FAVOURITE = "REMOVE_FROM_FAVOURITE";
export const SET_SHOW_FAVOURITE = "SET_SHOW_FAVOURITE";
export const ADD_MOVIES_TO_LIST = "ADD_MOVIES_TO_LIST";
export const ADD_SEARCH_RESULT = "ADD_SEARCH_RESULT";


//action creators
export function addMovies(movies) {
  return {
    type: ADD_MOVIES,
    movies,
  };
}

export function addFavourite(movie) {
  return {
    type: ADD_TO_FAVOURITE,
    movie,
  };
}

export function removeFromFavourite(movie) {
  return {
    type: REMOVE_FROM_FAVOURITE,
    movie,
  };
}

export function setShowFavourite(val) {
  return {
    type: SET_SHOW_FAVOURITE,
    val,
  };
}

export function addMoviesToList(movie) {
  return {
    type: ADD_MOVIES_TO_LIST,
    movie,
  };
}

export function handleMovieSearch(searchText) {    // this fxn returns a fxn  so we use thunks middleware
 
  return function (dispatch) { 
    const url = `https://www.omdbapi.com/?i=tt3896198&apikey=1a2f3dd3&t=${searchText}`;     
    fetch(url)
      .then((response) => response.json())
      .then((movie) => {
        console.log("movie", movie);
        // dispatch an action to save the results in store
        dispatch(addMovieSearchResult(movie));
      });
  };
}


export function addMovieSearchResult (movie) {
  return {
    type: ADD_SEARCH_RESULT,
    movie,
  }
}