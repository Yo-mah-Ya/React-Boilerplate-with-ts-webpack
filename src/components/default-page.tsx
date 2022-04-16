import type { FC } from "react";
import { Head } from "./parts/head";
import { ApplicationProvider } from "./contexts/application-context";
import { PageProps } from "./contexts/types";

export const DefaultPage: FC<PageProps> = ({ pageMeta, children }) => (
    <>
        <Head pageMeta={pageMeta} />
        <ApplicationProvider>{children}</ApplicationProvider>
    </>
);
