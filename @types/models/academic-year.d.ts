interface AcademicYear {
  id: number;
  name: string;
  statDate: string;
  endDate: string;
  createdAt: string;
  code: string;
}

type AcademicYearsRequest = {
  name: string;
  startDate: string;
  endDate: string;
  code: string;
};
type AcademicYearsResponse = Array<AcademicYear>;
