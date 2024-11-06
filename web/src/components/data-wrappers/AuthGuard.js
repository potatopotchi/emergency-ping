import {StoreUtil} from "@synergy-project-t/utils";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const publicRoutes = ['/login'];

// This wrapper handles auth-related redirection to ensure private pages are only accessible with the appropriate authorization
const AuthGuard = ({children}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { id: userAuthId, roles: userAuthRoles = [] } = StoreUtil.useUserAuthStore((state) => state.userAuth);

  useEffect(() => {

    const isNonAuthAccessingPrivate = !publicRoutes.includes(pathname) && (!userAuthId || userAuthRoles.length == 0);
    const isNonAdminAccessingAdminView = userAuthRoles.length > 0 && !userAuthRoles.includes('ADMIN') && pathname == '/';

    if (isNonAuthAccessingPrivate || isNonAdminAccessingAdminView) {
      navigate('/login');
    }
    else if (pathname == '/login' && userAuthId) {
      if (userAuthRoles.includes('ADMIN')) {
        navigate('/');
      }
      else {
        navigate('/profile');
      }
    }
  },[
    userAuthId,
    userAuthRoles,
    pathname
  ]);

  return (<>
    {children}
  </>);
};

export default AuthGuard;