export type UserRole = 'poster' | 'hero' | 'admin';

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  countryCode?: string;
  role: UserRole;
  createdAt: Date;
};
