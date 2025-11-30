import Cards from "@/components/DashBoard/Cards/Cards";
import RecentRentals from "@/components/DashBoard/Cards/RecentRentals";

function DashBoard() {
  return (
    <div className="min-h-screen px-5 py-2">
      <h1 className="font-open text-fluid-2xl text-center md:text-start pt-4 mb-5">
        Dashboard overview
      </h1>
      <div className="mb-10">
        <Cards />
      </div>

      <RecentRentals />
    </div>
  );
}

export default DashBoard;
