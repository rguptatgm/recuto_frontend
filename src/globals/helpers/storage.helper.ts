export const saveAccessToken = (token: string): any => {
  return localStorage.setItem("access-token", token);
};

export const getAccessToken = (): any => {
  return localStorage.getItem("access-token");
};

export const saveRefreshToken = (refreshToken: string): any => {
  return localStorage.setItem("refresh-token", refreshToken);
};

export const getRefreshToken = (): any => {
  return localStorage.getItem("refresh-token");
};

export const getResource = (): any => {
  return localStorage.getItem("resource");
};

export const setResource = (studioId: string): any => {
  return localStorage.setItem("resource", studioId);
};

export const deleteAccessAndRefreshToken = (): any => {
  localStorage.removeItem("access-token");
  localStorage.removeItem("refresh-token");
};

export const deleteResource = (): any => {
  localStorage.removeItem("resource");
};
