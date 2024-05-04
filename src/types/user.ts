export type User = {
  expiredAt: number;
  accessToken: string;
  refreshToken: string;
  id: string;
  roles: string[];
  status: number;
};
