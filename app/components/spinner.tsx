import React from "react";
import { VscLoading } from "react-icons/vsc";

const Spinner = ({ text }: { text: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <VscLoading className="animate-spin" />
      <p>{text ?? "Loading..."}</p>
    </div>
  );
};

export default Spinner;
