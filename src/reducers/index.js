//this is how reducers looks a like
export default function movies(state = [], action) {
  if (action.type === "ADD_MOVIES") {
    return action.movies;
  }

  return state;
}
