import { MdOutlineCheckCircle } from "react-icons/md";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="bg-green-200 p-3 flex items-center gap-x-2 text-sm text-green-600">
      <MdOutlineCheckCircle className="h-5 w-5" />
      {message}
    </div>
  );
};
