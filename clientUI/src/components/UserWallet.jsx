import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';

const UserWallet = () => {
  const { user } = useContext(AuthContext); 
  const { data, loading, error } = useFetch(`/users/${user._id}`);
  return (
    <div>
      wallet amount = Rs. {data?.wallet} /- 
    </div>
  )
}

export default UserWallet
