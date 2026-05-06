import { UIDataTypes, UIMessagePart, UITools } from "ai";
import { FaFilePdf } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as prismaStyles from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
type MarkdownTypes = {
  part: { type: string; text: string };
};
const MarkDown = ({ part }: MarkdownTypes) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="leading-relaxed m-2">{children}</p>,

        h1: ({ children }) => (
          <h1 className="text-2xl font-bold">{children}</h1>
        ),

        h2: ({ children }) => (
          <h2 className="text-xl font-semibold">{children}</h2>
        ),

        h3: ({ children }) => (
          <h3 className="text-lg font-semibold mt-2">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-semibold mt-2">{children}</h4>
        ),

        strong: ({ children }) => (
          <strong className="font-bold ">{children}</strong>
        ),
        // em: ({ children }) => (
        //   <div className="border-l-4 rounded-md px-2 mt-2 bg-textarea">
        //     <em className="italic text-blue-500">
        //       {children}
        //     </em>
        //   </div>
        // ),
        table: ({ children }) => (
          <table border={1} className=" mt-5 mb-5">
            {children}
          </table>
        ),
        th: ({ children }) => (
          <th className=" border-blue-500 px-0 bg-white text-black">
            {children}
          </th>
        ),
        tr: ({ children }) => (
          <tr className=" border-blue-500  px-0 md:p-3">{children}</tr>
        ),
        td: ({ children }) => (
          <td className="  border-blue-500 px-0 md:p-3">{children}</td>
        ),
        br: ({ children }) => <br className="">{children}</br>,
        a: ({ href, children }) => {
          {
            if (part.text.includes("pdf")) {
              return (
                <FaFilePdf
                  // onClick={href}
                  size={40}
                  color="red"
                  className="border p-1 border-gray-900 rounded-sm"
                />
              );
            }
            if (part.text.includes("png") || part.text.includes("jpg")) {
              return (
                <img
                  className="mb-5"
                  alt="image"
                  src={children as string}
                  width={150}
                  height={150}
                ></img>
              );
            }
          }
        },

        ul: ({ children }) => <ul className="list-disc ">{children}</ul>,

        ol: ({ children }) => <ol className="list-decimal">{children}</ol>,

        li: ({ children }) => <li className="ml-5 ">{children}</li>,

        blockquote: ({ children }) => (
          <blockquote className="">{children}</blockquote>
        ),

        hr: () => <hr className="border-gray-600 my-4" />,

        pre: ({ children }) => (
          <pre className="bg-black/80  rounded-lg overflow-x-auto my-3 text-sm">
            {children}
          </pre>
        ),
        code: ({ className, children }) => {
          const isBlock = className?.includes("language-");
          return isBlock ? (
            //@ts-expect-error:ts error fix
            <SyntaxHighlighter
              language="javascript"
              style={prismaStyles.atomDark}
            >
              {children}
            </SyntaxHighlighter>
          ) : (
            <code className="bg-gray-800 rounded custom-scrollbar text-red-400 text-sm">
              {children}
            </code>
          );
        },
      }}
    >
      {part?.text}
    </ReactMarkdown>
  );
};
export default MarkDown;
