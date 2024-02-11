import { ArrowPathIcon } from "@heroicons/react/24/outline";
export function Loading() {
  return (
    <div className="flex justify-center items-center p-10">
      <ArrowPathIcon className="h-8 w-8 text-primary animate-spin" />
    </div>
  );
}
