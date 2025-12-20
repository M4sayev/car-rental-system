import { type LucideIcon } from "lucide-react";
import ConnectionError from "../ui/custom/API/ConnectionError";
import EmptyResponse from "../ui/custom/API/EmptyResponse";
import ErrorMessage from "../ui/custom/API/ErrorMessage";
import EmptyState from "../ui/custom/EmptyState/EmptyState";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Table, TableBody } from "../ui/table";

import type { UseQueryResult } from "@tanstack/react-query";

interface DataTableCardProps<T, H> {
  queryFn: UseQueryResult<T[], unknown>;
  title: string;
  Header: React.FC<H>;
  Skeleton: React.FC;
  Row: (item: T) => React.ReactNode;
  emptyIcon: LucideIcon;
  emptyLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  headerProps?: H;
}

function DataTableCard<T, H extends object = {}>({
  queryFn,
  title,
  Header,
  Skeleton,
  Row,
  emptyIcon,
  emptyLabel,
  emptyTitle,
  emptyDescription,
  headerProps,
}: DataTableCardProps<T, H>) {
  const { data, isError, isLoading, error } = queryFn;

  if (isError) {
    const err = error instanceof Error ? error : new Error("Unknown error");

    return (
      <ErrorMessage error={err} className="min-h-[70dvh]">
        <ConnectionError />
      </ErrorMessage>
    );
  }

  if (!data && !isLoading)
    return (
      <EmptyResponse label={emptyLabel}>
        <EmptyState
          Icon={emptyIcon}
          title={emptyTitle}
          description={emptyDescription}
          iconTestId="no-data-icon"
        />
      </EmptyResponse>
    );

  return (
    <Card className="max-h-160 overflow-auto mb-20 md:mb-10">
      <CardHeader className="">{title}</CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton />
        ) : (
          <Table>
            <Header {...(headerProps || ({} as H))} />
            <TableBody>{data?.map(Row)}</TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default DataTableCard;
