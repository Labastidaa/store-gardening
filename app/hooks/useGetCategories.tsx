import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Category } from '@prisma/client';

export const useGetCategories = (id: string) => {
	return useQuery({
		queryKey: ['user', id],
		queryFn: async () => {
			const { data } = await axios.get(`api/categories/fetch/${id}`);

			return data as Category;
		},
	});
};
