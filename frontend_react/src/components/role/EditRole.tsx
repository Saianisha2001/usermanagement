import { useState, ChangeEvent, useContext } from 'react';
import { toast } from 'react-hot-toast';

import Input from '../shared/Input';
import Modal from '../shared/Modal';
import { useEditRoleMutation } from '../../hooks/roleHooks';
import { Role } from '../../types/role';
import { useTokenContext } from '../../context/TokenContext';

interface EditRoleModalProps {
  role: Role;
  isOpen: boolean;
  handleClose: () => void;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({
  role,
  isOpen,
  handleClose,
}) => {
  const tokenContext = useTokenContext();
  const { mutateAsync: editRole, error } = useEditRoleMutation(tokenContext.token);
  const [name, setName] = useState(role.name);

  const handleEditRole = async () => {
    await editRole({ id: role.id, name, status: true });

    toast.success('Role Edited');
    handleClose();
    window.location.reload();
  };

  if (error) {
    toast.error('Something went wrong');
  }

  return (
    <Modal title='Edit Role' isOpen={isOpen} handleClose={handleClose}>
      <div className='mt-6 w-full'>
        <Input
          value={name ? name : role.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          placeholder='Role Name'
        />
      </div>

      <div className='bg-slate-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-3'>
        <button
          type='button'
          className='inline-flex w-full justify-center rounded-md bg-green-300 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-teal-200 sm:ml-3 sm:w-auto'
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleEditRole}
        >
          Edit
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

export default EditRoleModal;
