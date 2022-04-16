import type { ReactNode } from "react";

export type PageProps = {
    pageMeta: {
        description: string;
        title: string;
    };
    children?: ReactNode;
};
