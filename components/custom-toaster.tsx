import { Toaster } from 'sonner';

export const CustomToaster = () => {
  return (
    <Toaster
      closeButton
      position="top-right"
      visibleToasts={3}
      toastOptions={{
        duration: 5000,
        unstyled: true,
        classNames: {
          title: 'text-sm font-medium',
          description: 'text-sm opacity-60',
          toast:
            'bg-popover/50 backdrop-blur-md flex items-center gap-2 w-full p-4 border border-border rounded-lg shadow-md',
          error: 'text-red-600',
          success: 'text-green-600',
          warning: 'text-yellow-600',
          info: 'text-blue-600',
        },
      }}
    />
  );
};
