import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

const INCREMENT = "INCREMENT";
const INCREMENTBYAMOUNT = "INCREMENTBYAMOUNT";
const store = createStore(reducer, applyMiddleware(logger.default));

const history = [];

//reducer
function reducer(state = { amount: 1 }, action) {
  if (action.type === INCREMENT) {
    //immutability
    return {
      ...state,
      amount: state.amount + 1,
    };
  }

  if (action.type === INCREMENTBYAMOUNT) {
    return {
      ...state,
      amount: state.amount + action.payload,
    };
  }
  return state;
}

//global state
// console.log(store.getState());

//it runs when there is change in state
store.subscribe(() => {
  history.push(store.getState());
  console.log(history);
});

//event driven
// store.dispatch({ type: "INCREMENT" }); // disptach send the type to the listener which is reducer.

//action creator
function increment() {
  return { type: INCREMENT };
}

function incrementByAmount(value) {
  return { type: INCREMENTBYAMOUNT, payload: value };
}

setInterval(() => {
  //   store.dispatch({ type: "incrementByAmount", payload: 10 });
  //   store.dispatch(increment());
  store.dispatch(incrementByAmount(10));
}, 7000);
// console.log(store.getState());
