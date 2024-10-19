import { useState, useEffect } from "react";

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

const ActionsSection = ({groupDetails = {}}) => {
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

const MapGroupSection = ({ viewId = "GUIDE" }) => {
    const [renderedComp, setRenderedComp] = useState(guideSection);

    //TODO Implement SWR call here*

    const groupDetails = viewId === "GROUP7" ? {
        key: "REGION_NCR",
        name: "Metro Manila (NCR)",
        status: "RED",
        severity: "ORANGE",
        members: [
            {
                key: "PROVINCE_DISTRICT1",
                name: "Capital District",
                status: "GREEN",
                severity: "GREEN",
                members: [
                    {
                        key: "NCR_DISTRICT1_MANILA",
                        name: "Manila",
                        status: "GREEN",
                        severity: "GREEN",
                        population: 12
                    }
                ]
            },
            {
                key: "PROVINCE_DISTRICT2",
                name: "Eastern Manila District",
                status: "GREEN",
                severity: "ORANGE",
                members: [
                    {
                        key: "NCR_DISTRICT2_MANDALUYONG",
                        name: "Mandaluyong",
                        status: "GREEN",
                        severity: "GREEN",
                        population: 1
                    },
                    {
                        key: "NCR_DISTRICT2_MARIKINA",
                        name: "Marikina",
                        status: "GREEN",
                        severity: "GREEN",
                        population: 0
                    },
                    {
                        key: "NCR_DISTRICT2_PASIG",
                        name: "Pasig",
                        status: "GREEN",
                        severity: "ORANGE",
                        population: 5
                    },
                    {
                        key: "NCR_DISTRICT2_QUEZONCITY",
                        name: "Quezon City",
                        status: "GREEN",
                        severity: "ORANGE",
                        population: 0
                    },
                    {
                        key: "NCR_DISTRICT2_SANJUAN",
                        name: "San Juan",
                        status: "GREEN",
                        severity: "GREEN",
                        population: 2
                    }
                ]
            },
            {
                key: "PROVINCE_DISTRICT3",
                name: "Northern Manila District (Camanava)",
                status: "RED",
                severity: "ORANGE",
                members: [
                    {
                        key: "NCR_DISTRICT3_CALOOCAN",
                        name: "Caloocan",
                        status: "RED",
                        severity: "ORANGE",
                        population: 2
                    },
                    {
                        key: "NCR_DISTRICT3_MALABON",
                        name: "Malabon",
                        status: "ORANGE",
                        severity: "ORANGE",
                        population: 1
                    },
                    {
                        key: "NCR_DISTRICT3_NAVOTAS",
                        name: "Navotas",
                        status: "GREEN",
                        severity: "ORANGE",
                        population: 0
                    },
                    {
                        key: "NCR_DISTRICT3_VALENZUELA",
                        name: "Valenzuela",
                        status: "GREEN",
                        severity: "GREEN",
                        population: 3
                    }
                ]
            },
            {
                key: "PROVINCE_DISTRICT4",
                name: "Southern Manila District",
                status: "GREEN",
                severity: "GREEN",
                members: [
                    {
                        key: "NCR_DISTRICT4_LASPINAS",
                        name: "Las Piñas",
                        status: "GREEN",
                        severity: "GREEN",
                        population: 2
                    },
                    {
                        key: "NCR_DISTRICT4_MAKATI",
                        name: "Makati",
                        status: "GREEN",
                        severity: "GREEN",
                        population: 8
                    },
                    {
                        key: "NCR_DISTRICT4_MUNTINLUPA",
                        name: "Muntinlupa",
                        status: "GREEN",
                        severity: "GREEN",
                        population: 0
                    },
                    {
                        key: "NCR_DISTRICT4_PARANAQUE",
                        name: "Parañaque",
                        status: "GREEN",
                        severity: "GREEN",
                        population: 5
                    },
                    {
                        key: "NCR_DISTRICT4_PASAY",
                        name: "Pasay",
                        status: "GREEN",
                        severity: "GREEN",
                        population: 1
                    },
                    {
                        key: "NCR_DISTRICT4_PATEROS",
                        name: "Pateros",
                        status: "GREEN",
                        severity: "GREEN",
                        population: 0
                    },
                    {
                        key: "NCR_DISTRICT4_TAGUIG",
                        name: "Taguig",
                        status: "GREEN",
                        severity: "GREEN",
                        population: 2
                    },
                ]
            }
        ]
    } : {};

    useEffect(() => {
        if (viewId === "GUIDE") {
            setRenderedComp(guideSection);
        }
        else {
            setRenderedComp(<ActionsSection groupDetails={groupDetails}/>);
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

export default MapGroupSection;