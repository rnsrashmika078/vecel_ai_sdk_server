"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "../ui/input-group";
import TextareaAutosize from "react-textarea-autosize";

const InputArea = () => {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <TextareaAutosize
          minRows={2}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") {
          //     e.preventDefault();
          //     e.currentTarget.form?.requestSubmit();
          //   }
          // }}
          // onChange={(e) => {
          //   setInput(e.currentTarget.value);
          // }}
          maxRows={5}
          data-slot="input-group-control"
          className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
          placeholder="Autoresize textarea..."
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            type="submit"
            className=""
            size="sm"
            variant="default"
          >
            Submit
          </InputGroupButton>
          <InputGroupButton className="ml-auto" size="sm" variant="default">
            Submit
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default InputArea;
