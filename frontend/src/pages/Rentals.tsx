import RentalsHeader from "@/components/Rentals/RentalsHeader/RentalsHeader";
import { useState } from "react";

function Rentals() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <section className="min-h-screen px-5 md:px-8 py-2 max-w-md sm:max-w-xl md:max-w-7xl  mx-auto">
      <RentalsHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </section>
  );
}

export default Rentals;
