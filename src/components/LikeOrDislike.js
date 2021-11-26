import React, { useReducer } from "react";
import ReactDOM from "react-dom";

const HANDLE_LIKE = Symbol("HANDLE_LIKE");
const HANDLE_DISLIKE = Symbol("HANDLE_DISLIKE");
const initialState = {
  likes: 0,
  dislikes: 0,
  active: null,
};

const reducer = (state, action) => {
  const { likes, dislikes, active } = state;

  switch (action.type) {
    case HANDLE_LIKE:
      return {
        ...state,
        likes: state.likes + 1,
        dislikes: active === "dislike" ? dislikes - 1 : dislikes,
        active: "like",
      };
    case HANDLE_DISLIKE:
      return {
        ...state,
        likes: active === "like" ? likes - 1 : likes,
        active: "dislike",
        dislikes: dislikes + 1,
      };
    default:
      return state;
  }
};

const LikeOrDislike = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { likes, dislikes, active } = state;
  return (
    <div style={{ display: "flex" }}>
      <button
        style={{
          color: active === "like" ? "green" : "black",
          marginRight: "20px",
          width: "40px",
          height: "40px",
          fontSize: "30px",
        }}
        onClick={() =>
          active !== "like" ? dispatch({ type: HANDLE_LIKE }) : null
        }
      >
        <strong>✔︎</strong>
        {/* &nbsp;|&nbsp;
        {likes} */}
      </button>
      <button
        style={{
          color: active === "dislike" ? "red" : "black",
          width: "40px",
          heigth: "40px",
          fontSize: "30px",
        }}
        onClick={() =>
          active !== "dislike" ? dispatch({ type: HANDLE_DISLIKE }) : null
        }
      >
        <strong>✖︎</strong>
        {/* &nbsp;|&nbsp;
        {dislikes} */}
      </button>
    </div>
  );
};

export default LikeOrDislike;
