import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center space-x-1 text-error-600 text-sm mt-1">
      <AlertCircle className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
};

export default FormError;