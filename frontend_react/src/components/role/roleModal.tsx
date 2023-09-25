import { toast } from 'react-hot-toast';
import { useContext } from "react";
import Modal from '../shared/Modal';
import { useDeleteRoleMutation, useEditRoleMutation } from '../../hooks/roleHooks';
import { Role } from '../../types/role';
import { useTokenContext } from '../../context/TokenContext';

interface DeleteRoleModalProps {
  role: Role;
  isOpen: boolean;
  handleClose: () => void;
}

const DeleteRoleModal: React.FC<DeleteRoleModalProps> = ({
  role,
  isOpen,
  handleClose,
}) => {
  const tokenContext = useTokenContext();
  const { mutateAsync: deleteRole, error } = useEditRoleMutation(tokenContext.token);

  const handleDeleteRole = async () => {
    await deleteRole({ id: role.id, name: role.name, status: false });

    toast.success('Role Deleted');
    handleClose();
    window.location.reload();
  };

  if (error) {
    toast.error('Something went wrong');
  }

  return (
    <Modal
      title='Confirm Delete Role'
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className='mt-6 w-full'>
        <p>
          Are you sure you want to delete role <u>{role.name}</u>{' '}
          and deactivate its related user?
        </p>
      </div>

      <div className='bg-slate-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-3'>
        <button
          type='button'
          className='inline-flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-red-300 sm:ml-3 sm:w-auto'
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleDeleteRole}
        >
          Yes, delete it
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

export default DeleteRoleModal;
