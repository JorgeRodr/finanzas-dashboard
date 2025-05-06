export interface User {
  email: string;
  displayName: string;
  password: string;
}

export interface UserFirestoreData extends Omit<User, 'password'> {
  id: string;
  createdAt: string;
}
