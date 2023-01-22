import { UsersContext } from '@/context/UsersProvider';
import { useContext } from 'react';

function useUsers() {
  return useContext(UsersContext);
}

export default useUsers;
