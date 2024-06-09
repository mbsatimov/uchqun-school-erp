import { $api } from '@/utils/api/interceptor';
type GetSemestersGroupsIdParams = {
  id: string;
  params: {
    startDate: string;
    limit: number;
  };
};

type GetSemestersGroupsIdRequest = ApiRequest<GetSemestersGroupsIdParams>;

export const getSemestersGroupsId = ({
  id,
  config,
}: GetSemestersGroupsIdRequest) => $api.get(`/semesters/groups/${id}`, config);
