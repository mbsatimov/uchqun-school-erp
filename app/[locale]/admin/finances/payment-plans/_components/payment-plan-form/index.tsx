'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Button, DialogFooter } from '@/components/ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  GET_PAYMENT_PLANS_QUERY_KEY,
  usePostPaymentPlansMutation,
} from '@/utils/api/hooks/payment-plans';

import {
  paymentPlanSchema,
  PaymentPlanSchema,
} from './utils/validation-schema';

type Props = {
  data?: PaymentPlan;
};

export const PaymentPlanForm: FC<Props> = ({ data }) => {
  const form = useForm<PaymentPlanSchema>({
    resolver: zodResolver(paymentPlanSchema),
    defaultValues: data
      ? {
          name: data.name,
          price: String(data.price),
        }
      : {
          name: '',
          price: '',
        },
    mode: 'onTouched',
  });

  const queryClient = useQueryClient();

  const postPaymentPlansMutation = usePostPaymentPlansMutation({
    options: {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({
          queryKey: [GET_PAYMENT_PLANS_QUERY_KEY],
        });
      },
    },
  });

  const onSubmit = (data: PaymentPlanSchema) => {
    postPaymentPlansMutation.mutate({
      data: {
        name: data.name,
        price: Number(data.price),
      },
    });
  };

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
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (som)</FormLabel>
              <FormControl>
                <Input placeholder="Price" type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            type="submit"
            disabled={postPaymentPlansMutation.isPending}
            isLoading={postPaymentPlansMutation.isPending}
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
