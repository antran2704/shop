import { useRouter } from "next/router";
import Pagination from "rc-pagination";
import { memo, useState, useEffect, Fragment } from "react";
import { IPagination } from "~/interfaces";

interface Props {
    pagination: IPagination;
}

const PaginationCus = (props: Props) => {
    const router = useRouter();
    const { pagination } = props;

    return (
        <Pagination
            current={pagination.currentPage}
            className="pagination"
            onChange={(page) =>
                router.replace({ query: { ...router.query, page } })
            }
            total={pagination.totalItems}
            pageSize={pagination.pageSize}
        />
    );
};

export default memo(PaginationCus);
