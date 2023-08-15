import React from "react";
import { Provider } from 'react-redux';
import ReactDOM from "react-dom/client";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import "./index.css";
import App from "./components/App";
import rootReducer from "./reducers";

//curried fxn
//function logger(obj, next, action)
//logger(obj)(next)(action)     this is how we call
// const logger = function ({dispatch, getState}) {
//   return function(next) {
//     return function(action) {
//       //middleware code
//       console.log('ACTION_TYPE = ' , action.type);
//       next(action);
//     }
//   }
// }

//we can write above commented middleware in below too
// const logger =
//   ({ dispatch, getState }) =>
//   (next) =>
//   (action) => {
//     //logger code
//     if (typeof action !== "function") {
//       console.log("ACTION_TYPE = ", action.type);
//     }

//     next(action);
//   };

// const thunk = ({dispatch, getState}) => (next) => (action) => {
//   //logger code
//   if(typeof action === 'function') {
//     action(dispatch);
//     return;
//   }
//   next(action);
// }
const logger = ({ dispatch, getState }) => (next) => (action) => {
  // my middlware
  console.log('ACTION', action);
  next(action);
};


const store = createStore(rootReducer, applyMiddleware(logger, thunk));
// console.log("store", store);

// export const StoreContext = createContext();

// console.log("StoreContext", StoreContext);

// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     );
//   }
// }

// // console.log(' BEFORE STATE', store.getState());
// const connectedComponent = connect(callback)(App);

// export function connect(callback) {
//   return function (Component) {
//     class ConnectedComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => {
//           this.forceUpdate();
//         });
//       }

//       componentWillUnmount() {
//         this.unsubscribe();
//       }
//       render() {
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBeSentAsProps = callback(state);

//         return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => {
//               return <ConnectedComponent store={store} />;
//             }}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   };
// }
// update store by dispatching actions
// // store.dispatch({
// //   type: 'ADD_MOVIES',
// //   movies: [{name: 'Superman'}]
// // });

// // console.log(' AFTER STATE', store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
