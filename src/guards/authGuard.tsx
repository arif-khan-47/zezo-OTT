import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from '../Redux/store';

const AuthGuard = () => {
    const {isAuthenticated} = useSelector((state:RootState) => state.auth);
  console.log('auth',isAuthenticated)
    return(
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )
}

export default AuthGuard;