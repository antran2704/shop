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

            {children}
        </div>
    );
};

export default FilterLayout;
