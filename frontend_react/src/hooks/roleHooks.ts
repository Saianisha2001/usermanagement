/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from '../main';

export const useGetAllRolesQuery = ( accessToken: string) =>
  useQuery({
    queryKey: ['all-roles'],
    queryFn: async () => {
      const headers = {
        Authorization: `${accessToken}`,
      };
    return (await axios.get('/api/roles', { headers })).data;
    },
  });

export const useCreateRoleMutation = ( accessToken: string ) =>
  useMutation({
    mutationFn: async (roleData: { name: string }) =>{
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    return (await axios.post('/api/roles/', roleData, { headers })).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-roles']);
    },
  });

export const useEditRoleMutation = (accessToken: string) =>
  useMutation({
    mutationFn: async ({ id, name, status }: { id: number; name: string; status: boolean }) => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      return (await axios.put(`/api/roles/${id}`, { name, status }, { headers })).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-roles']);
    },
  });

  export const useDeleteRoleMutation = (accessToken: string) =>
  useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      return (await axios.delete(`/api/roles/${id}`, { headers })).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-roles']);
    },
  });
