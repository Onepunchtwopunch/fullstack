import React, { useContext } from "react";
import { commentContext } from "../../../contexts/CommentContext";
import cancelImg from "../../../assets/icons/cancel.png";
import editImg from "../../../assets/icons/pencil.svg";

import classes from "../../Comments/comments.module.css";

const CommentItem = (props) => {
  const { body, user, id } = props.data;
  const { changeEditId, deleteComment } = useContext(commentContext)

  const handleDelete = () => {
    deleteComment(id);
  };

  const handleEdit = () => {
    changeEditId(id);
  };
  return (
    <div>
      <li>

        <div className={classes.CommBlock}> {body}
          <div>

            <img
              onClick={() => handleEdit(id)}
              className={classes.editIcon}
              src={editImg}
              alt="edit-img"
            />
            <img
              onClick={handleDelete}
              className={classes.cancelIcon}
              src={cancelImg}
              alt="cancel-img"
            />
          </div>

        </div>
        <div className={classes.UserBlock}>{user}</div>
      </li>
    </div>
  );
};

export default CommentItem;
