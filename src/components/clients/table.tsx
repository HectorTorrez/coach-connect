import {auth} from "@clerk/nextjs/server";
import Link from "next/link";
import {Eye} from "lucide-react";

import {DeleteClient} from "./delete-client";

import {getClients} from "@/queries/clients";
import {TableHead, TableRow, TableHeader, TableCell, TableBody, Table} from "@/components/ui/table";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {capitalizeFirstLetter} from "@/lib/capitalize-first-letter";

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
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
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
              <TableCell> {capitalizeFirstLetter(client?.status)}</TableCell>

              <TableCell className="flex items-center gap-3">
                {client?.status == "accepted" ? (
                  <Link
                    className="block  h-[36px] w-[36px] p-2"
                    href={`/clients/${client.reciever_id}`}
                  >
                    <Eye className="h-5 w-5" />
                  </Link>
                ) : (
                  <section className="block  h-[40px] w-[40px] p-2" />
                )}

                <DeleteClient coachId={id ?? ""} reciever_id={client.reciever_id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
