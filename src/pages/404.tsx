import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { DefaultPage } from "../components/default-page";
import { Header } from "../components/parts/header";
import { Footer } from "../components/parts/footer";
import { urlPaths } from "../router";

export const NotFoundPage: FC = () => (
    <DefaultPage pageMeta={{ title: "Error page", description: "Error page" }}>
        <Header />
        <h1>Not Found</h1>
        <div>
            <NavLink to={urlPaths.index}>Top Page</NavLink>
        </div>
        <Footer />
    </DefaultPage>
);
