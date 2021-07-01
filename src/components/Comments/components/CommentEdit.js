import { ClassNames } from '@emotion/react';
import React, { useContext, useState } from 'react';
import { commentContext } from '../../../contexts/CommentContext';
import classes from "../../Comments/comments.module.css";


const CommentEdit = (props) => {
    const { id, body: prevText } = props.data;
    const [comment, setComment] = useState(prevText);

    const { changeComment } = useContext(commentContext)

    const handleEdit = (e) => {
        e.preventDefault()
        changeComment(id, comment);
    }


    return (
        <li>
            <form onSubmit={handleEdit}>
                <input
                    className={classes.InpEdit}
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    name="title"
                    required
                    value={comment}
                />
                <button className={classes.BtnEdit}>Edit</button>
            </form>
        </li>
    )
};

export default CommentEdit;