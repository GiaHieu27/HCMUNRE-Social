import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Login from '../../pages/admin/login';

function LoggedInRoutes() {
  const admin = useSelector((user) => user.admin);
  return admin ? <Outlet /> : <Login />;
}

export default LoggedInRoutes;
