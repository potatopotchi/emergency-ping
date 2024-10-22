
const MapGroupIcon = ({ label, viewId='sss', size = 2, status = 'YELLOW', onClick, onHover }) => {

    // Tailwind only accepts full class names; We need to parse the class strings first
    const colorStr = status === 'GREEN' ? 'bg-green-500' : (status === 'YELLOW' ? 'bg-yellow-500' : 'bg-red-500');
    const hoverColorStr = status === 'GREEN' ? 'hover:bg-green-700' : (status === 'YELLOW' ? 'hover:bg-yellow-700' : 'hover:bg-red-700');

    return (
        <div 
            class={`
                flex
                w-[2em] 
                h-[2em] 
                ${colorStr}
                ${hoverColorStr}
                drop-shadow-md
                hover:cursor-pointer 
                text-white 
                font-bold
                border border-[0.3em] border-white rounded-lg
                items-center
                justify-center
            `}
            view-id={viewId}
            onClick={onClick}
            onHover={onHover}
        >
        {label}
        </div>
    );
};


export default MapGroupIcon;