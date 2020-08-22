export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  knownAs: string;
  dateOfBirth: Date;
  city: string;
  country: string;
  created: Date;
  lastActive: Date;
  photoUrl?: string;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
}
