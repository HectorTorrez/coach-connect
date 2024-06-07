import {auth} from "@clerk/nextjs/server";
import Link from "next/link";
import {Eye} from "lucide-react";

import {getClients} from "@/queries/clients";
import {TableHead, TableRow, TableHeader, TableCell, TableBody, Table} from "@/components/ui/table";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

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
          <TableHead>Image</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>View</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredClients?.map((client) => {
          return (
            <TableRow key={client?.reciever_id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={client.users?.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{client?.users?.username}</TableCell>
              <TableCell>{client?.users?.name}</TableCell>
              <TableCell>{client?.users?.email}</TableCell>

              <TableCell>
                <Link className="block  p-2" href={`/clients/${client.reciever_id}`}>
                  <Eye className="h-5 w-5" />
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
