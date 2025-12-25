import EmailLink from "@/components/A11y/EmailLink";
import PhoneLink from "@/components/A11y/PhoneLink";
import ShortID from "@/components/ui/custom/ShortID";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { TableCell, TableRow } from "@/components/ui/table";
import type { ClientTemplate } from "@/constants/clientTemplates";

interface ClientSelectionRowProps {
  client: ClientTemplate;
}

function ClientSelectionRow({ client }: ClientSelectionRowProps) {
  const { client_id, email, name, phone } = client;
  return (
    <TableRow className="h-12 cursor-pointer">
      <TableCell className="font-medium">
        <ShortID id={client_id} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <EmailLink email={email} />
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <PhoneLink phone={phone} />
      </TableCell>
      <TableCell className="text-right">
        <RadioGroupItem value={client_id} className="cursor-pointer" />
      </TableCell>
    </TableRow>
  );
}

export default ClientSelectionRow;
