import { User } from 'firebase/auth';

export interface UserContextType {
  user: User | null;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}
