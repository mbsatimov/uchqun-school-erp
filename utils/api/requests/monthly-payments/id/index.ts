import { $api } from '@/utils/api';

type GetMonthlyPaymentsIdParams = ApiRequest & {
  id: number | string;
};

export type GetMonthlyPaymentsIdRequest = GetMonthlyPaymentsIdParams;

export const getMonthlyPaymentsId = ({
  id,
  config,
}: GetMonthlyPaymentsIdRequest) =>
  $api.get<MonthlyPaymentsResponse>(
    `monthly-payments/student-finance/${id}`,
    config
  );
