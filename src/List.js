import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ noteItems, removeNote, editNote }) => {
  return (
    <div className="note-list">
      {noteItems.map((item) => {
        const { id, title } = item;
        return (
          <article className="note-item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editNote(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeNote(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
