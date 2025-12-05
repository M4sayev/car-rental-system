import { TriangleAlert } from "lucide-react";

function ConnectionError() {
  return (
    <div className="flex flex-col items-center gap-4">
      <TriangleAlert aria-hidden="true" className="w-10 h-10" />
      <span className=" text-lg text-center  md:max-w-1/2">
        We couldn't connect to the server. Please check your connection and try
        again.
      </span>
    </div>
  );
}

export default ConnectionError;
