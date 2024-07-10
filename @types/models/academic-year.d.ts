interface AcademicYear {
  id: number;
  name: string;
  statDate: string;
  endDate: string;
  createdAt: string;
  academicYearCode: string;
}

type AcademicYearsRequest = {
  name: string;
  startDate: string;
  endDate: string;
  academicYearCode: string;
};
type AcademicYearsResponse = Array<AcademicYear>;
