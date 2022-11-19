import Cookie from "js-cookie";

// eslint-disable-next-line no-prototype-builtins
export const isHandlerEnabled = (config = {}) =>
  !(config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled);

export const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    // Modify request here
    // store.dispatch(setLoader(true));
  }
  return request;
};

export const successHandler = (response) => {
  if (isHandlerEnabled(response)) {
    // Handle responses
    // store.dispatch(setLoader(false));
  }
  return response;
};

export const errorHandler = (error) => {
  if (error.response.status === 401) {
    Cookie.remove("jwt");
    if (window.location.pathname !== "/login") window.location.href = "/login";
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({ ...error });
};
