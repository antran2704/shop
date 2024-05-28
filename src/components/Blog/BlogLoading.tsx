const LoadingBlog = () => {
    return (
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <div className="animate-pulse relative pb-[100%] bg-gray-300"></div>

            <div className="flex flex-col p-4 gap-2">
                <p className="animate-pulse h-5 w-full bg-gray-300"></p>
                <p className="animate-pulse h-5 w-2/3 bg-gray-300"></p>
            </div>
        </div>
    );
};

export default LoadingBlog;
