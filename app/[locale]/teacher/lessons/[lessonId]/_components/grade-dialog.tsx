import { Star } from 'lucide-react';
import { useState } from 'react';
import { HiOutlineStar, HiStar } from 'react-icons/hi2';

import {
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui';

export const GradeDialog = () => {
  const [grade, setGrade] = useState<number>(2);

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger>
        <Button variant={'outline'} size={'icon-sm'}>
          <Star className="size-5" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <div className="flex items-center justify-center gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              {grade > i && (
                <HiStar
                  className="size-8 text-primary"
                  onClick={() => setGrade(i + 1)}
                />
              )}
              {grade <= i && (
                <HiOutlineStar
                  className="size-8 text-primary"
                  onClick={() => setGrade(i + 1)}
                />
              )}
            </div>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
