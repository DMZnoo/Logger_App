require("es6-promise").polyfill();
import { schema, normalize } from "normalizr";
import { camelizeKeys } from "humps";
import "isomorphic-fetch";

const API_ROOT = "/api";

function callApi(endpoint, schema, config = {}) {
  const url =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;

  return fetch(url, config).then((response) =>
    response
      .json()
      .then((json) => ({ json, response }))
      .then(({ json, response }) => {
        if (!response.ok) {
          return Promise.reject(json);
        }

        const camelizedJson = camelizeKeys(json);
        return Object.assign({}, normalize(camelizedJson, schema));
      })
      .then(
        (response) => (
          { response },
          (error) => ({ error: error.message || "ERROR in fetch" })
        )
      )
  );
}
const userProcessStrategy = (value, parent, key) => {
  if (key === "username") {
    return {
      ...value,
      logs: [parent.id],
    };
  }
  return {
    ...value,
    exercises: [parent.id],
  };
};

const userMergeStrategy = (entityA, entityB) => {
  return {
    ...entityA,
    ...entityB,
    exercises: [...(entityA.exercises || []), ...(entityB.exercises || [])],
    logs: [...(entityA.logs || []), ...(entityB.logs || [])],
  };
};

const userSchema = new schema.Entity(
  "users",
  {},
  {
    idAttribute: "_id",
    logs: [logSchema],
    processStrategy: userProcessStrategy,
    mergeStrategy: userMergeStrategy,
    fallbackStrategy: (key, schema) => {
      return {
        [schema.idAttribute]: key,
        username: "N/A",
      };
    },
  }
);
const logSchema = new schema.Entity("logs", {
  idAttribute: "_id",
  username: userSchema,
  exercises: [exerciseSchema],
});

const exerciseSchema = new schema.Entity("exercises", {
  idAttribute: "_id",
  log: logSchema,
});

// export const fetchUser = (_id) => callApi(`users/${_id}`, userSchema);
export const fetchLog = (_id) => callApi(`logs/${_id}`, logSchema);
export const fetchExercise = (_id) =>
  callApi(`exercises/${_id}`, exerciseSchema);
export const fetchUser = (username) =>
  callApi(`users/`, userSchema, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username }),
  });
