import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [componentToRender, setComponentToRender] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname!=='/login') {
      setComponentToRender(HeaderComp);
    }
    else {
      setComponentToRender(null);
    }
  }, [
    pathname
  ]);

  const HeaderComp = (<nav className="bg-white p-4 border border-b-[rgba(229, 231, 235)]">
    <div className="container ml-10 flex justify-between items-center">
      <div className="text-lg font-semibold">CODEV EMERGENCY PREPAREDNESS APP</div>
    </div>
  </nav>);

  return (
    componentToRender
  );
};

export default Navbar;