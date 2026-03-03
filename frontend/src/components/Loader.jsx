const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Analyzing retinal image...
      </p>
    </div>
  );
};

export default Loader;