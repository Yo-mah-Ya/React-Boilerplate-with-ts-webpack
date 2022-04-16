import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { FallbackProps } from "react-error-boundary";
import { DefaultPage } from "../components/default-page";
import { Header } from "../components/parts/header";
import { Footer } from "../components/parts/footer";
import { Logger } from "../utils";
import { urlPaths } from "../router";

export const ErrorFallback: FC<FallbackProps> = ({ error }) => {
    Logger.error({
        message: error.message,
        callSite: { function: ErrorFallback.name },
    });
    return (
        <DefaultPage
            pageMeta={{ title: "Sorry page", description: "Sorry page" }}
        >
            <Header />
            <div>
                <h2>Sorry, Something goes wrong.</h2>
                <NavLink to={urlPaths.index}>Top Page</NavLink>
            </div>
            <Footer />
        </DefaultPage>
    );
};
