import { usePrevious } from "@synergy-project-t/utils";

const StatusIcon = ({status}) => <div class={`
    h-[0.75em] 
    w-[0.75em] 
    ${status === "GREEN" ? "bg-green-400" : (status === "RED" ? "bg-red-400" : "bg-yellow-400")} 
    mr-[0.5em] 
    rounded-2xl
`}/>

const OverviewSection = ({groupDetails = {}, setViewId = ()=>{}}) => {

    const { key: viewId } = groupDetails;

    const prevViewId = usePrevious(viewId);

    const setPrevViewId = () => {
        if (prevViewId && viewId !== prevViewId) {
            setViewId(prevViewId);
        }
    };

    const {
        key = '',
        name,
        status,
        severity,
        members = []
    } = groupDetails;

    return key.startsWith('REGION_') ? (
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
                <div class="flex">
                    Alert Level: <div class={`
                        font-semibold 
                        mx-1
                        ${severity === "GREEN" ? "text-green-400" : (severity === "RED" ? "text-red-400" : "text-orange-400")} 
                    `}>{severity}</div> | Areas: {members.length || 0}
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
                        <div class="flex text-sm">
                            Alert Level: <div class={`
                                font-semibold 
                                mx-1
                                ${e.severity === "GREEN" ? "text-green-400" : (e.severity === "RED" ? "text-red-400" : "text-orange-400")} 
                            `}>{e.severity}</div> | Areas: {e.members?.length || '-'}
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
                                    <div class="flex text-xs">
                                        Alert Level: <div class={`
                                            font-semibold 
                                            mx-1
                                            ${e.severity === "GREEN" ? "text-green-400" : (e.severity === "RED" ? "text-red-400" : "text-orange-400")} 
                                        `}>{e.severity}</div> | Employees: {e.population || '0'}
                                    </div>
                                </div>
                                <div class="ml-auto hover:underline text-[#ea3b2d] font-semibold" onClick={()=>{setViewId(e.key || '')}}>VIEW</div>
                            </div>
                        ))
                        }
                    </div>
                    }
                </details>
            ))
            }
        </div>
    ) : (<>
        <div class={`
            overflow-y-hidden
            flex
            flex-col
            ${members.length > 0 ? "pb-6" : ""}
            `}>
            <div class="
                py-6
                px-8
                flex
            ">
                <div>
                    <div class="
                        flex
                        font-semibold
                        text-lg
                        items-center
                    ">
                        <StatusIcon status={status}/>
                        {name}
                    </div>
                    <div class="flex">
                        Alert Level: <div class={`
                            font-semibold 
                            mx-1
                            ${severity === "GREEN" ? "text-green-400" : (severity === "RED" ? "text-red-400" : "text-orange-400")} 
                        `}>{severity}</div> | Employees: {members.length || 0}
                    </div>
                </div>
                <div class="flex flex-1 justify-end items-center">
                    <div class="hover:underline hover:cursor-pointer text-[#ea3b2d] font-semibold" onClick={()=>{setPrevViewId()}}>
                        {"< Back"}
                    </div>
                </div>
            </div>
            <div class={"overflow-y-auto"}>
                <div class={"flex flex-col space-y-2 p-2 list-none bg-gray-200"}>
                {
                members.map(e => (
                    <details class="
                            rounded-2xl 
                            bg-[#fbfbfb]
                            overflow-hidden
                            ">
                        <summary class="
                            list-none 
                            flex 
                            p-4 
                            hover:cursor-pointer
                            hover:bg-yellow-50
                            ">
                            <div class="rounded-full overflow-hidden w-[20%] h-fit bg-red-100">
                                <img class="object-cover w-[100%] h-[100%]" src={e.imgUrl || ''} alt={`photo of ${e.name || '-'}`}/>
                            </div>
                            <div class="ml-4 my-auto">
                                <div class="
                                    flex
                                    font-semibold
                                    items-center
                                ">
                                    <StatusIcon status={e.status}/>
                                    {e.name}
                                </div>
                                <div class="text-sm mt-1">
                                    <div>{"Address: "+(e.location || '-')}</div>
                                    <div>{"Email: "+(e.email || '-')}</div>
                                    <div>{"Contact: "+(e.contactNumber || '-')}</div>
                                </div>
                            </div>
                        </summary>
                        <div class="transition ease-in-out delay-150 flex w-full p-4 items-end justify-center">
                            <div class="
                                w-[40%]
                                text-white 
                                font-bold 
                                text-center 
                                p-2 
                                rounded-2xl 
                                bg-red-500
                                hover:bg-red-600
                                hover:cursor-pointer
                                hover:shadow-lg
                                click:bg-red-400
                            ">{"SEND PING"}</div>
                        </div>
                    </details>
                ))
                }
                </div>
            </div>
        </div>
    </>);
};

export default OverviewSection;