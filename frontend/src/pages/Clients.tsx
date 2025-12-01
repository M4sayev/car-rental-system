import ClientsHeader from "@/components/Clients/ClientsHeader/ClientsHeader";
import ClientsTable from "@/components/Clients/ClientsTable/ClientsTable";

function Clients() {
  return (
    <div className="min-h-screen px-5 md:px-8 py-2 max-w-md sm:max-w-xl md:max-w-none mx-auto">
      <ClientsHeader />
      <ClientsTable />
    </div>
  );
}

export default Clients;
