export interface AuthContext {
  _id: string | null;
  username: string | null;
  iat: number | null;
  exp: number | null;
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
export interface RefreshDecoded {
  _id: string | null;
  iat: number | null;
  exp: number | null;
}
