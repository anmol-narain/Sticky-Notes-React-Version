import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
// for preseving the notes
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    // If the user tries to submit empty values
    if (!name) {
      // display the alert
      // we have to remove this alert also after some time so :---
      // setAlert({ show: true, msg: "enter something ", type: "danger" });
      showAlert(true, "danger", "Please Enter a Note");
    }
    // for edit checking the value
    else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "Note Is Edited");
    }
    // adding items to the list here
    else {
      // first show some alert message
      // not in a mood to use external libraray for Id
      // each sticky note will have just the id and title
      showAlert(true, "success", "Note added to the list Successfully");
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
    }
  };

  // This function solves everything and contains default values.
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  // delete the whole list -function
  const deleteList = () => {
    showAlert(true, "danger", "All Notes Deleted");
    setList([]);
  };
  // removing individual items...
  const removeNote = (id) => {
    showAlert(true, "danger", "Note was deleted");
    // passing those items whoose id does not match
    setList(list.filter((item) => item.id !== id));
  };
  // I took help for this piece of code from my senior
  const editNote = (id) => {
    const selectedNote = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(selectedNote.title);
  };
  // Inorder to preserve the notes on refreshing.
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="note-form" onSubmit={handleSubmit}>
        {/* passing all the props in the alert  */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>Sticky Notes</h3>
        <div className="form-control">
          <input
            type="text"
            className="note"
            placeholder="Sticky Note..."
            // not setting my controlled inputs:-
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="note-container">
          {/* notesItems props = list statevalue */}
          <List noteItems={list} removeNote={removeNote} editNote={editNote} />
          <button className="clear-btn" onClick={deleteList}>
            Delete All
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
