/* eslint-disable @typescript-eslint/no-unused-vars */
import { FixedSizeList as List } from "react-window";

const MyList = () => {
  const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

  return (
    <List
      height={400} // height of the container
      itemCount={items.length}
      itemSize={35} // height of each item
      width={300}
    >
      {({ index: any, style: any }) => <div style={style}>{items[index]}</div>}
    </List>
  );
};

export default MyList;
