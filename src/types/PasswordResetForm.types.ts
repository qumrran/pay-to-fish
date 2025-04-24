export interface PasswordResetFormProps {
    email: string;
    setEmail: (email: string) => void;
    onReset: () => void;
    onCancel: () => void;
  }