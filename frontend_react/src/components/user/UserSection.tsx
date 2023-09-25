import { useState, ChangeEvent } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import UserList from './UserList';
import Input from '../shared/Input';
import UserFormModal from './UserFormModal';

const UserSection = () => {
  const [searchText, setSearchText] = useState<string>('');

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const [columns, setColumns] = useState<string[]>([]);
  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  return (
    <section className='border border-black p-3 rounded-lg flex-1'>
      <h2 className='text-3xl text-center mt-5 mb-8'>User</h2>
      <div className='mb-4 flex gap-2'>
        <Input
          value={searchText}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
          placeholder= 'Search user records'
        />
        <div
          onClick={() => setIsFormOpen(true)}
          className='bg-green-300 rounded-full w-11 h-10 flex justify-center items-center cursor-pointer'
        >
          <AiOutlinePlus className='text-black font-bold text-center text-2xl' />
        </div>
      </div>

      <UserFormModal isOpen={isFormOpen} handleClose={handleFormClose} columns={columns}/>

      <UserList searchText={searchText} setSearchText={setSearchText} columns={columns} setColumns={setColumns}/>
    </section>
  );
};

export default UserSection;
