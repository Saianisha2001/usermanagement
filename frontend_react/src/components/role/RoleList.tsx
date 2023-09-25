/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect, useContext } from "react";
import { toast } from 'react-hot-toast';
import { useGetAllRolesQuery } from '../../hooks/roleHooks';
import { Role } from '../../types/role';
import RoleItem from './RoleItem';
import Loading from '../shared/Loading';
import { AiOutlineEdit } from "react-icons/ai";
import { TbTrashX } from "react-icons/tb";

import EditRoleModal from "./EditRole";
import DeleteRoleModal from "./roleModal";
import { useTokenContext } from '../../context/TokenContext';

const RoleList = () => {
  const tokenContext = useTokenContext();
  const { data, isLoading, error, refetch } = useGetAllRolesQuery(tokenContext.token);

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<Role>();

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
  };

  const reloadRoleData = () => {
    refetch();
  };

  useEffect(() => {
    reloadRoleData();
    console.log('selected role', selectedRole);
  }, [selectedRole]);

  console.log('role data', data);
  console.log('loading', isLoading);
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error('Something went wrong');
  }

  return (
    <div className='mt-8 w-full'>
      <table className="w-full table-auto border-collapse border border-black">
        <thead>
          <tr>
            <th className="border border-black p-3 bg-green-500">Role Name</th>
            <th className="border border-black p-3 bg-green-500">Created by</th>
            <th className="border border-black p-3 bg-green-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.filter((role: Role) => (role.status === true
      ))
      .map((role: Role, index) => (
         <tr key={role.id || index}>
            <td className="border border-slate-700 p-6">{role.name}</td>
            <td className="border border-slate-700 p-5">{role.createdBy}</td>
            <td className="border border-slate-700 p-1">
              <div className="flex justify-center gap-2">
                <div
                  onClick={() => {
                    console.log('edit role onclick')
                    setSelectedRole(role)
                    setIsEditOpen(true)}}
                  className="bg-green-300 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
                >
                  <AiOutlineEdit className="text-black-700 font-bold text-center text-xl" />
                </div>
                <div
                  onClick={() => {
                    setSelectedRole(role)
                    setIsDeleteOpen(true)}}
                  className="bg-red-700 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
                >
                  <TbTrashX className="text-black-700 font-bold text-center text-xl" />
                </div>
              </div>
            </td>
          </tr>
       
      ))}
         
        </tbody>
      </table>

      <EditRoleModal
        role={selectedRole ? selectedRole : ''}
        isOpen={isEditOpen}
        handleClose={handleEditClose}
      />
      <DeleteRoleModal
        role={selectedRole ? selectedRole : ''}
        isOpen={isDeleteOpen}
        handleClose={handleDeleteClose}
      />


    </div>
  );
};

export default RoleList;
