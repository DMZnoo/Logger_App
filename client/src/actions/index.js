export const signIn = (userId) => {
  return {
    type: "SIGN_IN",
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

const CREATE = "CREATE";
const READ = "READ";
const UPDATE = "UPDATE";
const DELETE = "DELETE";

const REQUEST = "REQUEST";
const RESPONSE = "RESPONSE";
const ERROR = "ERROR";

const crud = [CREATE, READ, UPDATE, DELETE];
const messages = [REQUEST, RESPONSE, ERROR];

function createRequestTypes(base, types) {
  return types.reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}
export const USER = createRequestTypes("USER", messages);
let logCrudList = createRequestTypes("LOG", crud);
export const LOG = createRequestTypes(logCrudList, messages);
let exerciseCrudList = createRequestTypes("EXERCISE", crud);
export const EXERCISE = createRequestTypes(exerciseCrudList, messages);

function action(type, payload = {}) {
  return { type, ...payload };
}
export const user = {
  request: (_id) => action(USER[REQUEST], { _id }),
  success: (_id, res) => action(USER[RESPONSE], { _id, res }),
  failure: (_id, err) => action(USER[ERROR], { _id, err }),
};

export const log = {
  request: (_id) => action(LOG[REQUEST], { _id }),
  success: (_id, res) => action(LOG[RESPONSE], { _id, res }),
  failure: (_id, err) => action(LOG[ERROR], { _id, err }),
};

export const exercise = {
  request: (_id) => action(EXERCISE[REQUEST], { _id }),
  success: (_id, res) => action(EXERCISE[RESPONSE], { _id, res }),
  failure: (_id, err) => action(EXERCISE[ERROR], { _id, err }),
};

export const LOAD_USER = "LOAD_USER";
export const LOAD_LOG = "LOAD_LOG";
export const LOAD_EXERCISE = "LOAD_EXERCISE";

export const loadUser = (username) => action(LOAD_USER, { username });
export const loadLog = (_id) => action(LOAD_LOG, { _id });
export const loadExercise = (_id) => action(LOAD_EXERCISE, { _id });

// export const createLog = (data) => {
//   return {
//     type: "CREATE_LOG",
//     payload: data,
//   };
// };
// export const readLog = () => {
//   return {
//     type: "READ_LOG",
//   };
// };
//
// export const updateLog = (data) => {
//   return {
//     type: "UPDATE_LOG",
//     payload: data,
//   };
// };
//
// export const deleteLog = (id) => {
//   return {
//     type: "DELETE_LOG",
//     payload: id,
//   };
// };
//
// export const createExercise = (data) => {
//   return {
//     type: "CREATE_EXERCISE",
//     payload: data,
//   };
// };
//
// export const readExercise = () => {
//   return {
//     type: "READ_EXERCISE",
//   };
// };
//
// export const updateExercise = (data) => {
//   return {
//     type: "UPDATE_EXERCISE",
//     payload: data,
//   };
// };
//
// export const deleteExercise = (id) => {
//   return {
//     type: "DELETE_EXERCISE",
//     payload: id,
//   };
// };
