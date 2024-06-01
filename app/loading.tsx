import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex h-full items-center justify-between">
      <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
    </div>
  );
};

export default Loading;
