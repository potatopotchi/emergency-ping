import { useState, useEffect } from "react";

const placeholderSection = (
    <div class="
        my-auto
        self-center
        mx-auto
        text-xl
        font-bold
        text-gray-400
    ">
        Nothing to display
    </div>
);

const AdminNewsSection = ({}) => {

    return (
        <div className="flex flex-col border rounded-[0.22rem] min-h-[40%]">
            <div className="w-[100%] bg-[rgb(244,247,247)] px-7 py-4 font-medium">NEWS</div>
            <div class="
                flex
                flex-1
                flex-col
                w-full
                overflow-y-auto
            ">
                {placeholderSection}
            </div>
        </div>
    );
};

export default AdminNewsSection;