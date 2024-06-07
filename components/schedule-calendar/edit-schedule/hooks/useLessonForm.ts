import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useGetAllCourses } from '@/hooks/use-course';
import { useGetAllTeachers } from '@/hooks/use-teacher';
import { DefaultError } from '@/lib/exceptions/default-exception';
import type { TCreateLessonSchema } from '@/lib/validators/admin/create-lesson-schema';
import { CreateLessonSchema } from '@/lib/validators/admin/create-lesson-schema';
import { usePostLessonsMutation, usePutLessonMutation } from '@/utils/api';
import { SEMESTERS_QUERY_KEY } from '@/lib/constants';

type UseLessonFormProps = {
  dailyScheduleId: number;
  lesson?: LessonPreview;
  setLesson?: React.Dispatch<React.SetStateAction<LessonPreview | undefined>>;
};

export const useLessonForm = ({
  dailyScheduleId,
  lesson,
  setLesson,
}: UseLessonFormProps) => {
  const courses = useGetAllCourses();
  const teachers = useGetAllTeachers();
  const [allWeeks, setAllWeeks] = useState(false);

  const form = useForm<TCreateLessonSchema>({
    resolver: zodResolver(CreateLessonSchema),
    mode: 'onTouched',
    defaultValues: lesson
      ? {
          courseId: '',
          teacherId: '',
          startTime: lesson.startTime.slice(0, 5),
          endTime: lesson.endTime.slice(0, 5),
        }
      : {
          courseId: '',
          teacherId: '',
          startTime: '',
          endTime: '',
        },
  });

  const queryClient = useQueryClient();

  const postLesson = usePostLessonsMutation({
    options: {
      onSuccess: res => {
        form.reset();
        queryClient.invalidateQueries({
          queryKey: ['getLessons', { dailyScheduleId }],
        });
        queryClient.invalidateQueries({ queryKey: [SEMESTERS_QUERY_KEY] });
        toast.success(res.data.message);
      },
      onError: err => {
        toast.error(err.data.message);
      },
    },
  });

  const putLesson = usePutLessonMutation({
    options: {
      onSuccess: res => {
        form.reset();
        setLesson?.(undefined);
        queryClient.invalidateQueries({
          queryKey: ['getLessons', { dailyScheduleId }],
        });
        queryClient.invalidateQueries({ queryKey: [SEMESTERS_QUERY_KEY] });
        toast.success(res.data.message);
      },
      onError: err => {
        toast.error(err.data.message);
      },
    },
  });

  const onSubmit = (data: TCreateLessonSchema) => {
    const convertedData = {
      courseId: Number(data.courseId),
      teacherId: Number(data.teacherId),
      startTime: data.startTime,
      endTime: data.endTime,
    };

    lesson
      ? putLesson.mutateAsync({
          params: { id: lesson.id, data: convertedData },
          config: { params: { isItForSemester: allWeeks } },
        })
      : postLesson.mutateAsync({
          params: { dailyScheduleId, data: convertedData },
          config: { params: { isItForSemester: allWeeks } },
        });
  };

  const onCancelUpdate = () => {
    form.reset();
    setLesson?.(undefined);
  };

  if (courses.isError || teachers.isError) throw new DefaultError();

  return {
    form,
    state: {
      courses: courses,
      teachers: teachers,
      allWeeks,
      createLesson: postLesson,
      updateLesson: putLesson,
    },
    functions: {
      onSubmit,
      onCancelUpdate,
      setAllWeeks,
    },
  };
};
