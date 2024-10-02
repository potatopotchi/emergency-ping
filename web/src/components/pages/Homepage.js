import { useUserAuthStore } from "@synergy-project-t/utils/stores";
import { useEffect, useState } from "react";

const LoadingComp = <div>Loading...</div>;

const Homepage = () => {

    const userAuthState = useUserAuthStore((state) => state.userAuth);
    const [componentToRender, setComponentToRender] = useState(LoadingComp);

    useEffect(() => {
        if (userAuthState?.roles?.includes("ADMIN")) {
            setComponentToRender(<div>
                ADMIN VIEW
            </div>)
        }
        else if (userAuthState?.roles?.includes("EMPLOYEE")) {
            setComponentToRender(<div>
                EMPLOYEE VIEW
            </div>)
        }
        else {
            if (componentToRender !== LoadingComp) {
                setComponentToRender(LoadingComp);
            }
        }
    }, [
        userAuthState
    ]);

    return (
        componentToRender
    );
};
  
export default Homepage;