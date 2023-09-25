import { toast } from 'react-hot-toast';
import { useContext } from 'react';

import Modal from '../shared/Modal';
import { User } from '../../types/user';
import { useDeleteUserMutation, useEditUserMutation } from '../../hooks/userHooks';
import { Role } from '../../types/role';
import { useGetAllRolesQuery } from '../../hooks/roleHooks';
import { useTokenContext } from '../../context/TokenContext';

interface DeleteUserModalProps {
  user: User;
  isOpen: boolean;
  handleClose: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  user,
  isOpen,
  handleClose,
}) => {
  const tokenContext = useTokenContext();
  const { mutateAsync: deleteUser, error } = useDeleteUserMutation(tokenContext.token);

  const { mutateAsync: editUser, error: editError } =
    useEditUserMutation(tokenContext.token);

  const { data } = useGetAllRolesQuery(tokenContext.token);

  const handleDeleteUser = async () => {
    const roleItem = data.filter( role => role.name.includes(user.roleName))
    console.log('deactivate user');
    console.log(user)
    await editUser({ 
      id: user.id,
      name: user.name,
      email: user.email,
      location: user.location,
      role: roleItem[0].id,
      status: false, });

    toast.success('User Deleted');
    handleClose();
  };

  if (error) {
    toast.error('Something went wrong');
  }

  return (
    <Modal
      title='Confirm Deactivate User'
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className='mt-6 w-full'>
        <p>
          Are you sure you want to deactivate user <u>{user?.name}</u> ?
        </p>
      </div>

      <div className='bg-slate-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-3'>
        <button
          type='button'
          className='inline-flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-red-300 sm:ml-3 sm:w-auto'
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleDeleteUser}
        >
          Yes, deactivate user
        </button>
        <button
          type='button'
          className='mt-3 inline-flex w-full justify-center rounded-md bg-slate-300 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
