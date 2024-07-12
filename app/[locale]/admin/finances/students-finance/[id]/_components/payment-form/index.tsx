'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  GET_PAYMENT_HISTORY_QUERY_KEY,
  usePostPaymentHistoryMutation,
} from '@/utils/api';

import { paymentSchema, PaymentSchema } from './utils/payment-schema';

type Props = {
  studentFinanceId: number;
};

export const PaymentForm = ({ studentFinanceId }: Props) => {
  const form = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: '',
      comment: '',
      payedFrom: '',
    },
    mode: 'onTouched',
  });

  const queryClient = useQueryClient();

  const postPaymentHistoryMutation = usePostPaymentHistoryMutation({
    options: {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({
          queryKey: [GET_PAYMENT_HISTORY_QUERY_KEY],
        });
      },
    },
  });

  const onSubmit = (data: PaymentSchema) => {
    postPaymentHistoryMutation.mutate({
      data: {
        studentFinanceId: studentFinanceId,
        amount: Number(data.amount),
        comment: data.comment,
        payedFrom: data.payedFrom,
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Enter amount" {...field} type="number" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payedFrom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payed from</FormLabel>
              <FormControl>
                <Input placeholder="Payed from" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea placeholder="Comment" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            type="submit"
            disabled={postPaymentHistoryMutation.isPending}
            isLoading={postPaymentHistoryMutation.isPending}
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
