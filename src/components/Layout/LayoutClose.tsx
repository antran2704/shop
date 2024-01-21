import { memo } from "react";

interface Props {
  handleClose: () => void;
}

const LayoutClose = (props: Props) => {
  const { handleClose } = props;
  
  return (
    <div
      className={`xl:hidden block fixed top-0 bottom-0 left-0 right-0 z-30`}
      style={{ backgroundColor: "rgba(1,1,1, 0.6)" }}
      onClick={handleClose}
    ></div>
  );
};

export default memo(LayoutClose);
