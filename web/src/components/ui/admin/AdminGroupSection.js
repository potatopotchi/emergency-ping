import { useState, useEffect } from "react";
import OverviewSection from "./OverviewSection";

const guideSection = (
    <div class="
        my-auto
        self-center
        mx-auto
        text-xl
        font-bold
        text-gray-400
    ">
        Click on one of the area icons on the map
    </div>
);

const AdminGroupSection = ({ groupDetails = {} }) => {
    const [renderedComp, setRenderedComp] = useState(guideSection);

    const { key } = groupDetails;

    useEffect(() => {
        if (key) {
            setRenderedComp(<OverviewSection groupDetails={groupDetails}/>);
        }
        else {
            setRenderedComp(guideSection);
        }
    }, [
        key
    ]);

    return (
        <div className="flex flex-col w-[100%] border rounded-[0.22rem] min-h-[40%]">
            <div className="w-[100%] bg-[rgb(244,247,247)] px-7 py-4 font-medium">DASHBOARD</div>
            <div class="
                flex
                flex-1
                flex-col
                w-full
                overflow-y-auto
            ">
                {renderedComp}
            </div>
        </div>
    );
};

export default AdminGroupSection;