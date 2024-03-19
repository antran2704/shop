import LayoutClose from "../Layout/LayoutClose";

const NewFeed = () => {
  return (
    <div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-20 bg-white rounded-md p-5 z-50">
        <h3 className="capitalize text-2xl text-center font-medium">New feeds</h3>
      </div>
      <LayoutClose handleClose={() => {}} />
    </div>
  );
};

export default NewFeed;
