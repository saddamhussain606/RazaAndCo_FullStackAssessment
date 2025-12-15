import * as jwt from 'jwt-decode';

export const parseJwtUser = (token) => {
  const decoded = jwt.jwtDecode(token);
  return {
    id: decoded[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ],
    username:
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    role:
      decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ],
  };
};
