import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk";

const INCREMENT = "ACCOUNT/INCREMENT";

const INCREMENTBYAMOUNT = "ACCOUNT/INCREMENTBYAMOUNT";

const INIT = "ACCOUNT/INIT";

const INCREMENTBONUS = "BONUS/INCREMENT";

const store = createStore(
  // reducer,
  combineReducers({
    account: accountReducer,
    bonus: bonusReducer,
  }),

  applyMiddleware(logger.default, thunk.default)
);

const history = [];

//reducer
function accountReducer(state = { amount: 1 }, action) {
  // if (action.type === INCREMENT) {
  //   //immutability
  //   return {
  //     ...state,
  //     amount: state.amount + 1,
  //   };
  // }

  // if (action.type === INCREMENTBYAMOUNT) {
  //   return {
  //     ...state,
  //     amount: state.amount + action.payload,
  //   };
  // }

  switch (action.type) {
    case INIT:
      return { amount: action.payload };
    case INCREMENT:
      return { amount: state.amount + 1 };

    case INCREMENTBYAMOUNT:
      return { amount: state.amount + action.payload };

    default:
      return state;
  }
}

function bonusReducer(state = { points: 0 }, action) {
  switch (action.type) {
    case INCREMENTBONUS:
      return { points: state.points + 1 };
    case INCREMENTBYAMOUNT:
      if (action.payload >= 100) {
        return { points: state.points + 2 };
      }
    default:
      return state;
  }
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
  return { type: INCREMENTBYAMOUNT, payload: value }; //sent by disptach (plane object)
}

function initUser(value) {
  return { type: INIT, payload: value };
}

function incrementBonus() {
  return { type: INCREMENTBONUS };
}

function getUser(id) {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
    // return { type: INIT, payload: data.amount };
    dispatch(initUser(data.amount));
  };
}

{
}

setTimeout(() => {
  //   store.dispatch({ type: "incrementByAmount", payload: 10 });
  // store.dispatch(increment());
  // store.dispatch(incrementByAmount(200));
  // store.dispatch(getUser(4));
  store.dispatch(incrementBonus());
}, 2000);
// console.log(store.getState());

//async api
// async function getUser() {
//   const { data } = await axios.get("http://localhost:3000/accounts/1");
//   console.log(data);
// }

// getUser();
