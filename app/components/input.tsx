import React from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  input: string;
  children: React.ReactNode;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}
const InputArea = ({ input, setInput, children, ...props }: InputProps) => {
  return (
    <div className="relative w-full">
      <input
        className="flex w-full  dark:bg-zinc-900 pl-8 p-2  border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
        value={input}
        {...props}
        placeholder="Say something..."
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      {children}
    </div>
  );
};

export default InputArea;
