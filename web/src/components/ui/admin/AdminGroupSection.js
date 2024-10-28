import { useState, useEffect } from "react";
import { usePrevious } from "@synergy-project-t/utils";

const StatusIcon = ({status}) => <div class={`
    h-[0.75em] 
    w-[0.75em] 
    ${status === "GREEN" ? "bg-green-400" : (status === "RED" ? "bg-red-400" : "bg-yellow-400")} 
    mr-[0.5em] 
    rounded-2xl
`}/>

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

const OverviewSection = ({groupDetails = {}, setViewId = ()=>{}}) => {
    const {
        name,
        status,
        severity,
        members = []
    } = groupDetails;

    return (
        <div class={members.length > 0 ? "pb-6" : ""}>
            <div class="
                py-6
                px-8
            ">
                <div class="
                    flex
                    font-semibold
                    text-lg
                    items-center
                ">
                    <StatusIcon status={status}/>
                    {name}
                </div>
                <div>
                    Alert Level: {severity} | Areas: {members.length || 0}
                </div>
            </div>
            {
            members.map(e => (
                <details>
                    <summary class={`
                        border-t
                        border-dashed
                        py-2
                        px-12
                        hover:cursor-pointer
                        hover:bg-[rgb(244,247,247)]
                        list-none
                        `}
                    >
                        <div class="
                            flex
                            font-semibold
                            items-center
                        ">
                            <StatusIcon status={e.status}/>
                            {e.name}
                        </div>
                        <div class="text-sm">
                            Alert Level: {e.severity} | Areas: {e.members?.length || '-'}
                        </div>
                    </summary>
                    {
                    e.members?.length > 0 &&
                    <div>
                        {
                        e.members.map(e => (
                            <div class="
                                flex
                                items-center
                                border-t
                                border-dashed
                                py-2
                                px-16
                                hover:cursor-pointer
                                hover:bg-[rgb(244,247,247)]
                                text-sm
                                "
                            >
                                <div>
                                    <div class="
                                        flex
                                        font-semibold
                                        items-center
                                    ">
                                        <StatusIcon status={e.status}/>
                                        {e.name}
                                    </div>
                                    <div class="text-xs">
                                        Alert Level: {e.severity} | Population: {e.population || '0'}
                                    </div>
                                </div>
                                <div class="ml-auto hover:underline text-[#ea3b2d] font-semibold">VIEW</div>
                            </div>
                        ))
                        }
                    </div>
                    }
                </details>
            ))
            }
        </div>
    )
};

const AdminGroupSection = ({ groupDetails = {}, setViewId = ()=> {} }) => {
    const [renderedComp, setRenderedComp] = useState(guideSection);

    const { key: viewId } = groupDetails;

    const prevViewId = usePrevious(viewId);

    useEffect(() => {
        if (viewId) {
            setRenderedComp(<OverviewSection groupDetails={groupDetails} setViewId={setViewId}/>);
        }
        else {
            setRenderedComp(guideSection);
        }
    }, [
        viewId
    ]);

    return (
        <div className="flex flex-col w-[600px] border rounded-[0.22rem] min-h-[40%]">
            <div className="w-[100%] bg-[rgb(244,247,247)] px-7 py-4">DASHBOARD</div>
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