import React, { useEffect, useRef, useState } from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  input: string;
  children: React.ReactNode;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}
const InputArea = ({
  input,
  setInput,

  children,
  ...props
}: InputProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState<number>(50);
  useEffect(() => {
    const domeNode = textAreaRef.current;
    if (!domeNode) return;

    const setDyanmicHeight = () => {
      if (input.length > 50) {
        setHeight(500);
      } else {
        setHeight(50);
      }
    };
    setDyanmicHeight();
  }, [input]);
  return (
    <div className="relative w-full">
      <input
        // ref={textAreaRef}
        className="flex w-full pr-10  justify-end row-span-10 items-end dark:bg-zinc-900 pl-8 p-2  border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
        value={input}
        style={{ height: `${height}px` }}
        {...props}
        placeholder="Say something..."
        onChange={(e) => setInput(e.target.value)}
      />
      {children}
    </div>
  );
};

export default InputArea;
