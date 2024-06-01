'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCreateGroup } from '@/hooks/use-group';
import { cn } from '@/lib/utils';
import type { TCreateGroupSchema } from '@/lib/validators/admin/create-group-schema';
import { CreateGroupSchema } from '@/lib/validators/admin/create-group-schema';

export const CreateGroupForm: FC = () => {
  const createGroup = useCreateGroup();

  const form = useForm<TCreateGroupSchema>({
    resolver: zodResolver(CreateGroupSchema),
    defaultValues: {
      name: '',
    },
    mode: 'onTouched',
  });

  function onSubmit(data: TCreateGroupSchema) {
    const establishedDate = format(data.establishedDate, 'yyyy-MM-dd');
    createGroup.mutate({ name: data.name, establishedDate });
  }

  useEffect(() => {
    form.reset();
  }, [createGroup.isSuccess, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="establishedDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Established Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    ISOWeek
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <FormMessage />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            type="submit"
            disabled={createGroup.isPending}
            isLoading={createGroup.isPending}
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
