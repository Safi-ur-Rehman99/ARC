import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
    return (
        <div className="p-3 border-b flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0 z-50 pointer-events-none">
            <button onClick={handleVideoCall} className="btn btn-success btn-sm text-white pointer-events-auto mr-16 mt-2">
                <VideoIcon className="size-6" />
            </button>
        </div>
    );
}

export default CallButton;