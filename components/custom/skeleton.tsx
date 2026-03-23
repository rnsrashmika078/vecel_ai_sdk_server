import React, { ReactNode } from "react";

const Skeleton = ({
    isLoading,
    children,
}: {
    children: ReactNode;
    isLoading: boolean;
}) => {
    return (
        <div>
            {isLoading ? (
                <div className="h-[100px] w-[100px] bg-gray-400 animate-pulse rounded-xl  p-2"></div>
            ) : (
                children
            )}
        </div>
    );
};

export default Skeleton;
