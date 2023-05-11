import React from "react";
import "./Loading.scss";
import { ThreeDots } from "react-loader-spinner";

const Loading = () => {
    return (
        <div className="Loading">
            <ThreeDots
                height="100"
                width="100"
                radius="9"
                color="gray"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
            />
        </div>
    );
};

export default Loading;