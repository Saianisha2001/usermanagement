/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from '../main';

export const useGetAllUsersQuery = (accessToken: string) =>
  useQuery({
    queryKey: ['all-users'],
    queryFn: async () => 
    {
      console.log('This works')
      const response = await axios.get('/api/users',
      { headers: {
        Authorization: `Bearer ${accessToken}`
      },}
      );
      console.log(response.data)
      return response.data
    },
  });

  export const useCreateUserMutation = (accessToken: string) =>
  useMutation({
    mutationFn: async (userData: {
      name: string;
      email: string;
      location: string;
      role: number;
    }) => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      return (await axios.post('/api/users/', userData, { headers })).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-users']);
    },
  });

  export const useEditUserMutation = (accessToken: string) =>
  useMutation({
    mutationFn: async ({ id, name, email, location, role, status }: {
      id: number;
      name: string;
      email: string;
      location: string;
      role: number;
      status: boolean;
    }) => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      return (
        await axios.put(`/api/users/${id}`, { name, email, location, role, status }, { headers })
      ).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-users']);
    },
  });

  export const useDeleteUserMutation = (accessToken: string) =>
  useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      return (await axios.delete(`/api/users/${id}`, { headers })).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-users']);
    },
  });
