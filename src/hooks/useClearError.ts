import React, { useEffect } from 'react';
import { clearError } from 'store/actions/userActions';
import { useDispatch } from 'react-redux';

const useClearError = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearError());
  }, []);
};

export default useClearError;
