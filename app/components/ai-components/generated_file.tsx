import { BiDownload } from "react-icons/bi";
import { FaFileLines } from "react-icons/fa6";
import { MdOpenInNew } from "react-icons/md";
type GenFileType = {
  name?: string;
  content?: string;
  extension?: string;
};
const GenFile = ({ name = "Ozone", extension = "txt" }: GenFileType) => {
  const link = `/files/${name}.${extension}`;
  return (
    <div className="p-5 bg-black border border-gray-900 w-full flex rounded-xl mb-5 justify-between">
      <div className="flex items-center gap-2">
        <FaFileLines size={25} />
        <p className="text-sm">{`${name}.${extension}`}</p>
      </div>
      {/*  rel="noopener noreferrer" */}
      {/*  Safe from tab hijacking 
       Doesn’t leak referrer info */}
      <div className="flex gap-5">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-[#303030] p-1 rounded-md transition-all hover:scale-110"
        >
          <MdOpenInNew size={20} />
        </a>
        <a
          href={link}
          download
          className="hover:bg-[#303030] p-1 rounded-md transition-all hover:scale-110"
        >
          <BiDownload size={20} />
        </a>
      </div>

      {/* <button onClick={() => window.open(link, "_blank")}>Open File</button> */}
    </div>
  );
};

export default GenFile;
