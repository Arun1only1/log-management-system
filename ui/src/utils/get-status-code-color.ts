export const getStatusCodeColor = (statusCode: number) => {
  if (statusCode >= 200 && statusCode < 300)
    return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  if (statusCode >= 300 && statusCode < 400)
    return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
  if (statusCode >= 400 && statusCode < 500)
    return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
  if (statusCode >= 500)
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
  return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
};
