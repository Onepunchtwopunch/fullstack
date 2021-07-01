import React, { useContext, useState } from "react";
import { commentContext } from "../../../contexts/CommentContext";
import classes from "../../Comments/comments.module.css";

const CommentForm = () => {
  const [body, setBody] = useState("");
  // const [user, setUser] = useState("");
  const { createComment } = useContext(commentContext);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const data = {
      // user,
      body,
    };
    createComment(data);
    setBody("");
  };

  return (
    <div>
      <h3>Оставить отзыв:</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          className={classes.InpSend}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Title"
          name="body"
          type="text"
          value={body}
        />
        <button className={classes.BtnSend}>Отправить</button>
      </form>
    </div>
  );
};

export default CommentForm;
