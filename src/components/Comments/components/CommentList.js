import React, { useEffect } from "react";
import { useContext } from "react";
import CommentItem from "./CommentItem";
import CommentEdit from "./CommentEdit";
import { commentContext } from "../../../contexts/CommentContext";

const CommentList = () => {
  const { commentList, fetchComments, editId } = useContext(commentContext);

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <ul>
      {commentList.map((body) =>
        body.id === editId ? (
          <CommentEdit data={body} key={body.id} />
        ) : (
          <CommentItem data={body} key={body} />
        )
      )}
    </ul>
  );
};

export default CommentList;
