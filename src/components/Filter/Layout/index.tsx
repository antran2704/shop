import ShowMore from "~/components/ShowMore";

interface Props {
  title: string;
  children: JSX.Element;
}

const FilterLayout = (props: Props) => {
  const { title, children } = props;


  return (
    <div className="w-full pb-4 mb-8 border-b border-borderColor">
      <h4 className="flex items-center justify-between md:text-base text-sm font-medium capitalize">
        {title}
      </h4>

      <ShowMore maxHeight={120} className="w-full">{children}</ShowMore>
    </div>
  );
};

export default FilterLayout;
