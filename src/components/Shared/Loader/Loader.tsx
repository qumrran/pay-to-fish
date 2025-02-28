import React from "react";
import { ClipLoader } from "react-spinners";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-32">
      <ClipLoader color="#3498db" size={50} />
    </div>
  );
};

export default Loader;
