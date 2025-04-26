import { Skeleton } from "@/components/ui/skeleton";

function ScoreSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="mb-2 h-7 w-2xs"></Skeleton>
      <div className="space-y-2 ">
        <Skeleton className=" h-12 w-12"></Skeleton>
      </div>
    </div>
  );
}

export default ScoreSkeleton