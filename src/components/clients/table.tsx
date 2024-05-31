import {auth} from "@clerk/nextjs/server";

import {Button} from "../ui/button";

import {getClients} from "@/queries/clients";
import {TableHead, TableRow, TableHeader, TableCell, TableBody, Table} from "@/components/ui/table";

export async function ClientsTable({query}: {query: string}) {
  const {userId: id} = auth();
  const userId = id ?? "";
  const {clients} = await getClients(userId);

  const filteredClients = clients?.filter((client) => {
    return client?.users?.username.toLowerCase().includes(query.toLowerCase());
  });

  if (filteredClients.length === 0) {
    return <p>No clients found</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Routines</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredClients?.map((client) => {
          return (
            <TableRow key={client?.reciever_id}>
              <TableCell className="font-medium">{client?.users?.username}</TableCell>
              <TableCell>{client?.users?.name}</TableCell>
              <TableCell>{client?.users?.email}</TableCell>
              {/* <TableCell>{client?.routines}</TableCell> */}
              <TableCell>{/* <Progress value={client.progress} /> */}</TableCell>
              <TableCell>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
