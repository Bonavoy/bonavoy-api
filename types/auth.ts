export interface AuthContext {
  _id: string | null;
  username: string | null;
  token: string | null;
  refresh: string | null;
}

export interface TokenPayload {
  _id: string | null;
  username: string | null;
}

export interface TokenDecoded {
  _id: string | null;
  username: string | null;
  iat: number | null;
  exp: number | null;
}
