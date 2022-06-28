const dev = {
  BASE_URL: "https://store.darkube.app",

  // PARAMS:
  COOKIE_EXPIRES: 1,
  WEB_SOCKET_BASE_URL: "ws://https://store.darkube.app/ws",
};

const test = {
  BASE_URL: "https://store.darkube.app",

  // PARAMS:
  COOKIE_EXPIRES: 1,
  WEB_SOCKET_BASE_URL: "ws://https://store.darkube.app/ws",
};

const prod = {
  BASE_URL: "https://store.darkube.app",

  // PARAMS:
  COOKIE_EXPIRES: 1,
  WEB_SOCKET_BASE_URL: "ws://https://store.darkube.app/ws",
};

let config = dev;

if (process.env.REACT_APP_STAGE === "production") {
  config = prod;
} else if (process.env.REACT_APP_STAGE === "test") {
  config = test;
}

Object.assign(module.exports, config);
