import jwt_decode from "jwt-decode";

interface IDecodedToken {
  id: string;
  role: string;
}

export const getUserRole = (): string | null => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return null;
  }

  try {
    const decodedToken: IDecodedToken = jwt_decode(token);
    return decodedToken.role;
  } catch (error) {
    return null;
  }
};
