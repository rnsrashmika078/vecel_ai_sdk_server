/* eslint-disable @next/next/no-img-element */
export function fileFormat(url: string) {
  if (url.includes("png")) {
    return (
      <img
        src={url ?? "./image.png"}
        width={150}
        height={150}
        alt="upload file"
        className="w-[150px] h-[150px] object-contain rounded-2xl mb-2"
      />
    );
  }
  if (url.includes("pdf")) {
    return (
      <img
        src={"./pdf.png"}
        width={150}
        height={150}
        alt="upload file"
        className="w-[100px] h-[100px] object-contain rounded-2xl mb-2"
      />
    );
  }
  return null;
}
//TODO :
// change img tag with Next js Image

export function deltaTime(start: number, end: number) {
  return ((end - start) / 1000).toFixed(2);
}
