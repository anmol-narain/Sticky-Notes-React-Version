import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  // alert for 2sec only
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);
    // always maintaing the cleanup
    return () => clearTimeout(timeout);
  }, [list]);
  // everytime something changes in the list we clear out old timeout and set up new one
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
