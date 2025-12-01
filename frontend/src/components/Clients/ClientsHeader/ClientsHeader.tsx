import AddClientButton from "./AddClientButton";

function ClientsHeader() {
  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="font-open text-fluid-2xl text-center md:text-start pt-4 mb-5">
          Clients
        </h1>

        <AddClientButton />
      </header>
    </>
  );
}

export default ClientsHeader;
