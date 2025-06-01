import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast.custom((t) => (
    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Info className="h-6 w-6 text-blue-400" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  )),
};

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          icon: <CheckCircle className="h-5 w-5 text-success-500" />,
          className: '!bg-white !text-gray-900',
          duration: 3000,
        },
        error: {
          icon: <XCircle className="h-5 w-5 text-error-500" />,
          className: '!bg-white !text-gray-900',
          duration: 4000,
        },
      }}
    />
  );
};

export default Toast;