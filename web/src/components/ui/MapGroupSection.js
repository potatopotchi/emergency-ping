import { useState, useEffect } from "react";

const guideSection = (<>
    Click on one of the area icons on the map
</>);

const ActionsSection = ({viewId}) => {
    return (
        <>
            View id is: {viewId}
        </>
    )
};

const MapGroupSection = ({ viewId = "GUIDE" }) => {
    const [renderedComp, setRenderedComp] = useState(guideSection);

    useEffect(() => {
        if (viewId === "GUIDE") {
            setRenderedComp(guideSection);
        }
        else {
            setRenderedComp(<ActionsSection viewId={viewId}/>);
        }
    }, [
        viewId
    ]);

    return (
        <div className="w-[600px] border rounded-[0.22rem]">
            <div className="w-[100%] bg-[rgb(244,247,247)] px-7 py-4">DASHBOARD</div>
            <div class="
                flex
                w-full 
                min-h-[40%]
                items-center
                justify-center
                text-xl
                font-bold
                text-gray-400
            ">
                {renderedComp}
            </div>
        </div>
    );
};

export default MapGroupSection;