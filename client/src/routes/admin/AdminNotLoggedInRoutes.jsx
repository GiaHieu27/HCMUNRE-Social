import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function NotLoggedInRoutes() {
  const { admin } = useSelector((user) => ({ ...user }));
  return admin ? <Navigate to="/admin" /> : <Outlet />;
}

export default NotLoggedInRoutes;
