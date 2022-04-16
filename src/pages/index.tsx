import type { FC } from "react";
import { DefaultPage } from "../components/default-page";
import { Header } from "../components/parts/header";
import { Footer } from "../components/parts/footer";
import { Main } from "../components/templates/main";

export const IndexPage: FC = () => (
    <DefaultPage pageMeta={{ title: "Top page", description: "Top page" }}>
        <Header />
        <Main />
        <Footer />
    </DefaultPage>
);
