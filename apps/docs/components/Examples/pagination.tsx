import {
  PageJumper,
  PageSizeSelect,
  Pagination,
  PaginationButtons,
} from "@rafty/ui";
import { useState } from "react";

function AllPaginationField({
  isDisabled,
  size,
}: {
  isDisabled?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const [pagination, setPagination] = useState({
    current: 1,
    limit: 10,
  });
  const count = 100;
  const pages = count / pagination.limit;

  return (
    <Pagination
      pages={pages}
      pageLimit={pagination.limit}
      currentPage={pagination.current}
      onChange={(page, pageLimit) =>
        setPagination((prev) => {
          if (prev.limit !== pageLimit) return { current: 1, limit: pageLimit };
          return {
            current: page,
            limit: pageLimit,
          };
        })
      }
      isDisabled={isDisabled}
      size={size}
    >
      <div className="flex items-center gap-2">
        <span
          className={isDisabled ? "cursor-not-allowed opacity-60" : undefined}
        >
          Rows per page:
        </span>
        <PageSizeSelect />
      </div>
      <PageJumper />
      <span
        className={isDisabled ? "cursor-not-allowed opacity-60" : undefined}
      >
        Total: {count}
      </span>
      <PaginationButtons />
    </Pagination>
  );
}

function PageSelect() {
  const [pagination, setPagination] = useState({
    current: 1,
    limit: 10,
  });

  return (
    <Pagination
      pages={10}
      pageLimit={pagination.limit}
      currentPage={pagination.current}
      onChange={(page, pageLimit) =>
        setPagination((prev) => {
          if (prev.limit !== pageLimit) return { current: 1, limit: pageLimit };
          return {
            current: page,
            limit: pageLimit,
          };
        })
      }
    >
      <div className="flex items-center gap-2">
        <span>Rows per page:</span>
        <PageSizeSelect />
      </div>
    </Pagination>
  );
}

function PageGoto() {
  const [pagination, setPagination] = useState({
    current: 1,
    limit: 10,
  });

  return (
    <Pagination
      pages={10}
      pageLimit={pagination.limit}
      currentPage={pagination.current}
      onChange={(page, pageLimit) =>
        setPagination((prev) => {
          if (prev.limit !== pageLimit) return { current: 1, limit: pageLimit };
          return {
            current: page,
            limit: pageLimit,
          };
        })
      }
    >
      <PageJumper />
    </Pagination>
  );
}

function PageButtons() {
  const [pagination, setPagination] = useState({
    current: 1,
    limit: 10,
  });

  return (
    <Pagination
      pages={10}
      pageLimit={pagination.limit}
      currentPage={pagination.current}
      onChange={(page, pageLimit) =>
        setPagination((prev) => {
          if (prev.limit !== pageLimit) return { current: 1, limit: pageLimit };
          return {
            current: page,
            limit: pageLimit,
          };
        })
      }
    >
      <span>Page: {pagination.current}</span>
      <PaginationButtons />
    </Pagination>
  );
}

export const pagination_examples = {
  "pagination:usage": <AllPaginationField />,
  "pagination:size": <AllPaginationField size="sm" />,
  "pagination:page_size_select": <PageSelect />,
  "pagination:page_jumper": <PageGoto />,
  "pagination:paginatin_buttons": <PageButtons />,
  "pagination:disabled": <AllPaginationField isDisabled />,
};
