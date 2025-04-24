export interface CatchPostFormProps {
    onSubmit: (desc: string, image: File, lake: string) => Promise<void>;
  }