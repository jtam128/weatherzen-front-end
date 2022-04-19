import ObservationForm from "./ObservationForm";

function ObservationEdit() {
  return (
    <main>
      <h1 className="mb-3">Edit Observation</h1>
      <ObservationForm mode="edit" />
    </main>
  );
}

export default ObservationEdit;