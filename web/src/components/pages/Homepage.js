import { useUserAuthStore } from "@synergy-project-t/utils/stores";
import { useEffect, useState } from "react";
import { AdminView } from "@synergy-project-t/ui-components";

const LoadingComp = <div>Loading...</div>;

const Homepage = () => {

    const userAuthState = useUserAuthStore((state) => state.userAuth);
    const [componentToRender, setComponentToRender] = useState(LoadingComp);

    useEffect(() => {
        if (userAuthState?.roles?.includes("ADMIN")) {
            setComponentToRender(<AdminView />);
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