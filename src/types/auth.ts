export interface TokenPayload {
  sub: string | null;
  username: string | null;
}

export interface TokenDecoded extends TokenPayload {
  iat: number | null;
  exp: number | null;
}

export interface AuthContext extends TokenDecoded {
  refresh: {
    sub: string | null;
    iat: number | null;
    exp: number | null;
  };
}

export interface RefreshPayload {
  sub: string | null;
}
export interface RefreshDecoded extends RefreshPayload {
  iat: number | null;
  exp: number | null;
}
