import React, { useRef } from "react";

export const Loading = () => {
  const dynamicDataRef = useRef([]);
  const searchBoxInputRef = useRef(null);

  const startLoadingState = () => {
    if (searchBoxInputRef.current) {
      searchBoxInputRef.current.blur();
    }

    dynamicDataRef.current.forEach((element) => {
      element.classList.add("loading");
    });
  };

  const endLoadingState = () => {
    dynamicDataRef.current.forEach((element) => {
      element.classList.remove("loading");
    });
  };

  return (
    <div>
      <input
        className="search-box-input"
        ref={searchBoxInputRef}
        placeholder="Search"
      />
      <div
        className="dynamic-data"
        ref={(el) => dynamicDataRef.current.push(el)}
      ></div>
      <div
        className="dynamic-data"
        ref={(el) => dynamicDataRef.current.push(el)}
      ></div>
      {/* Add more dynamic data elements as needed */}
      <button onClick={startLoadingState}>Start Loading</button>
      <button onClick={endLoadingState}>End Loading</button>
    </div>
  );
};
