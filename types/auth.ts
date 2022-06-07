export interface AuthContext {
  sub: string | null;
  username: string | null;
  iat: number | null;
  exp: number | null;
  refresh: {
    sub: string | null;
    iat: number | null;
    exp: number | null;
  };
}

export interface TokenPayload {
  sub: string | null;
  username: string | null;
}

export interface TokenDecoded {
  sub: string | null;
  username: string | null;
  iat: number | null;
  exp: number | null;
}
export interface RefreshDecoded {
  sub: string | null;
  iat: number | null;
  exp: number | null;
}
