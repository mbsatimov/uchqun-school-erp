import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

function ExamsPage() {
  return (
    <>
      <Button variant="outline">
        <Plus className="mr-1" size={20} />
        Create new exam
      </Button>
    </>
  );
}

export default ExamsPage;
