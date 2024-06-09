'use client';
import { Plus } from 'lucide-react';
import type { FC } from 'react';
import React from 'react';

import Loading from '@/app/[locale]/loading';
import { ScheduleCalendar } from '@/components/schedule-calendar';
import { Button } from '@/components/ui/button';
import { useGetCurrentSemesterByGroupId } from '@/hooks/use-semester';
import { portionMap } from '@/lib/constants/portionMap';
import { DefaultError } from '@/lib/exceptions/default-exception';
import { cn } from '@/lib/utils';

import { AssignSemesterToGroupForm } from './assign-semester-to-group-form';

interface SemesterPageProps {
  groupId: number;
}

export const GroupScheduleCalendar: FC<SemesterPageProps> = ({ groupId }) => {
  const currentSemester = useGetCurrentSemesterByGroupId(groupId);
  const [showForm, setShowForm] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [limit, setLimit] = React.useState(40);

  console.log(startDate, limit);

  if (currentSemester.isLoading) return <Loading />;

  if (!currentSemester.data) {
    return (
      <>
        <div
          className={cn('flex flex-col items-center justify-center space-y-4', {
            hidden: showForm,
          })}
        >
          <h2 className="text-xl">
            This group has&apos;t yet been assigned to a semester
          </h2>
          <Button variant={'outline'} onClick={() => setShowForm(true)}>
            <Plus className="mr-1" size={20} />
            Assign to semester
          </Button>
        </div>
        <div className={cn({ hidden: !showForm })}>
          <AssignSemesterToGroupForm
            groupId={groupId}
            setShowForm={setShowForm}
          />
        </div>
      </>
    );
  }

  if (!currentSemester.isSuccess) throw new DefaultError();

  return (
    <>
      <div className="flex items-center gap-2">
        <h2 className="text-xl">{portionMap[currentSemester.data.portion]}</h2>
        <div className="text-muted-foreground">
          ({currentSemester.data.startDate} - {currentSemester.data.endDate})
        </div>
      </div>
      <ScheduleCalendar
        dailySchedules={currentSemester.data.dailySchedules}
        editable
        defaultViewMode="month"
        setStartDate={setStartDate}
        setLimit={setLimit}
      />
    </>
  );
};
