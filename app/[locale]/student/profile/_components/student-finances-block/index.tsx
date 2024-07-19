'use client';

import Loading from '@/app/[locale]/loading';
import { useGetStudentFinancesStudentQuery } from '@/utils/api';

import { StudentFinanceInfo } from './student-finance-info';

export const StudentFinancesBlock = () => {
  const getStudentFinancesStudent = useGetStudentFinancesStudentQuery();

  if (getStudentFinancesStudent.isLoading)
    return (
      <div className="mt-8">
        <Loading />
      </div>
    );

  if (!getStudentFinancesStudent.isSuccess)
    return (
      <div className="mt-8 text-center text-red-500">
        Student Finance Not Found
      </div>
    );

  return (
    <>
      <h2 className="mb-2 text-xl font-bold tracking-tight">
        Student Finances
      </h2>

      <StudentFinanceInfo
        studentFinance={getStudentFinancesStudent.data.data}
      />

      {/* <div className="mt-8 space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">
          Monthly Payments
        </h2>
        <MonthlyPaymentsCards id={getStudentFinancesStudent.data.data.id} />
      </div>
      <div className="mt-8 space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">
          Payment History
        </h2>
        <StudentFianceHistoryTable
          id={getStudentFinancesStudent.data.data.id}
        />
      </div> */}
    </>
  );
};
