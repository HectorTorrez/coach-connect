import {Button} from "../ui/button";

import {TableHead, TableRow, TableHeader, TableCell, TableBody, Table} from "@/components/ui/table";

export function ClientsTable({query}: {query: string}) {
  console.log(query);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Routines</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>3</TableCell>
          <TableCell>{/* <Progress value={75} /> */}</TableCell>
          <TableCell>
            <Button size="sm" variant="outline">
              View
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>2</TableCell>
          <TableCell>{/* <Progress value={50} /> */}</TableCell>
          <TableCell>
            <Button size="sm" variant="outline">
              View
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Michael Johnson</TableCell>
          <TableCell>michael@example.com</TableCell>
          <TableCell>4</TableCell>
          <TableCell>{/* <Progress value={90} /> */}</TableCell>
          <TableCell>
            <Button size="sm" variant="outline">
              View
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Emily Davis</TableCell>
          <TableCell>emily@example.com</TableCell>
          <TableCell>1</TableCell>
          <TableCell>{/* <Progress value={30} /> */}</TableCell>
          <TableCell>
            <Button size="sm" variant="outline">
              View
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
