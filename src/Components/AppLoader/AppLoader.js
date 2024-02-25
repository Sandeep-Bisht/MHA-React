import React from "react";
import { Oval } from "react-loader-spinner";
import "../../css/Common.css";

const AppLoader = (props) => {
  const { height, left, width, radius, color, ariaLabel } = props;

  const wrapperStyle = {
    textAlign: "center", // Example style property
  };

  return (
    <section className="app-loader-section">
      <div className="container app-loader">
        <Oval
          height={height}
          left={left}
          width={width}
          radius={radius}
          color={color}
          ariaLabel={ariaLabel}
          wrapperStyle={wrapperStyle}
        />
      </div>
    </section>
  );
};

export default AppLoader;