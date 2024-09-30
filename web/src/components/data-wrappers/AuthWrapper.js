import useSWR from "swr";
import {StoreUtil, AuthUtil} from "@synergy-project-t/utils";
import { useEffect } from "react";

// This wrapper ensures that auth revalidation is consistently running throughout the app
const AuthWrapper = ({children}) => {

  const { userAuth, setUserAuth, removeUserAuth } = StoreUtil.useUserAuthStore((state) => state);
  const { token: authToken } = userAuth;

  // TODO Update auth revalidation approach
  const { data: authData, error: authError, isLoading: authIsLoading } = useSWR(
    [
      "http://localhost:5000", //baseUrl (fetcher function param 1)
      authToken, //token (fetcher function param 2)
      "AUTH_WRAPPER_GET_USER_AUTH" //string to serve as unique key for this SWR call (ignored by the fetcher function)
    ],
    AuthUtil.getUserAuth
  );

  useEffect(() => {
    if (!authIsLoading) {
      if (authData?.status === 200) {
        setUserAuth(authData);
      }
      else {
        removeUserAuth();
      }
    }
  }, [
    JSON.stringify(authData), //authData,
    authError,
    authIsLoading
  ]);

  return (<>
    {children}
  </>);
};

export default AuthWrapper;