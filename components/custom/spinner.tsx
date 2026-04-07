import React from "react";
import { VscLoading } from "react-icons/vsc";

const Spinner = React.memo(({ text }: { text: string }) => {
  return (
    <div className="flex gap-2 items-center text-white">
      <VscLoading className="animate-spin" />
      <p>{text ?? "Loading..."}</p>
    </div>
  );
});

Spinner.displayName = "Spinner";

export default Spinner;
