import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import { environments } from "../../../env";
import { urlPaths } from "../../../router";
import css from "./style.module.scss";

export const Main: FC = memo(() => {
    return (
        <main className={css.container}>
            <ul>
                <li>
                    <NavLink to={urlPaths.signIn}>Sign in</NavLink>
                </li>
                <li>
                    <NavLink to={urlPaths.signUp}>Sign up</NavLink>
                </li>
                <li>
                    <a href={`${environments.cdnEndpoint}/api`}>
                        call API Gateway
                    </a>
                </li>
            </ul>
        </main>
    );
});
