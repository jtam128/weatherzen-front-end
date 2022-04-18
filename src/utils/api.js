/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options) {
  try
  {
    const response = await fetch(url, options);

    if (response.status === 204)
    {
      return null;
    }

    const payload = await response.json();

    if (payload.error)
    {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error)
  {
    if (error.name !== "AbortError")
    {
      console.error(error.stack);
      return Promise.reject({ message: error.message });
    }
  }
}

// CREATE
export async function createObservation(observation, signal) {
  const url = `${API_BASE_URL}/observations`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: observation }),
    signal,
  };
  return await fetchJson(url, options);
}

// LIST
export async function listObservations(signal) {
  const url = `${API_BASE_URL}/observations`;
  const options = {
    headers,
    signal,
  };
  return await fetchJson(url, options);
}

// READ
export async function readObservation(observationId, signal) {
  const url = `${API_BASE_URL}/observations/${observationId}`;
  return await fetchJson(url, { signal }, {});
}

// UPDATE
export async function updateObservation(updatedObservation, signal) {
  const url = `${API_BASE_URL}/observations/${updatedObservation.observation_id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: updatedObservation }),
    signal,
  };
  return await fetchJson(url, options, updatedObservation);
}

// DELETE
export async function deleteObservation(observationId, signal) {
  const url = `${API_BASE_URL}/observations/${observationId}`;
  const options = { method: "DELETE", signal };
  return await fetchJson(url, options);
} 