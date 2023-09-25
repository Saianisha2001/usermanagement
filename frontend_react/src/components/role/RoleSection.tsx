import { useState, ChangeEvent, useContext } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import RoleList from './RoleList';
import Input from '../shared/Input';
import { useCreateRoleMutation } from '../../hooks/roleHooks';
import { toast } from 'react-hot-toast';
import { useTokenContext } from '../../context/TokenContext';

const RoleSection = () => {
  const [name, setName] = useState('');
  const tokenContext = useTokenContext();
  const { mutateAsync: createRole } = useCreateRoleMutation(tokenContext.token);

  const handleCreateRole = async () => {
    await createRole({ name });
    setName('');
    toast.success('Role Created');
  };

  return (
    <section className='border border-black p-3 rounded-lg w-[300px]'>
      <h2 className='text-3xl text-center mt-5 mb-8'>Role</h2>
      <div className='mb-4 flex gap-2'>
        <Input
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          placeholder='Add New Role'
        />

        <div
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleCreateRole}
          className='bg-green-300 rounded-full w-12 h-10 flex justify-center items-center cursor-pointer'
        >
          <AiOutlinePlus className='text-black-700 font-bold text-center text-2xl' />
        </div>
      </div>

      <RoleList />
    </section>
  );
};

export default RoleSection;
