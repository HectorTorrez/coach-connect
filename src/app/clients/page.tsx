import {AddClients} from "@/components/clients/add-clients";
import {ClientsTable} from "@/components/clients/table";

export const dynamic = "force-dynamic";

export default function ClientsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  return (
    <div className="mt-8 flex flex-col gap-8">
      <section className="flex justify-between">
        <h3 className="font-bol text-2xl">Clients</h3>
        <AddClients />
      </section>
      <section>
        <ClientsTable query={query} />
      </section>
    </div>
  );
}
