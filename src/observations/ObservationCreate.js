import React from "react";
import { useHistory } from "react-router-dom";

function ObservationCreate() {
  const history = useHistory();

  function cancelHandler() {
    history.push("/");
  }

  function submitHandler(event) {
    event.preventDefault();
    history.push("/");
  }

  return (
    <main>
      <h1>Create Observation</h1>
      <form onSubmit={submitHandler}>
        <p>Later, input fields will be added here.</p>
        <div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={cancelHandler}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}

export default ObservationCreate;
