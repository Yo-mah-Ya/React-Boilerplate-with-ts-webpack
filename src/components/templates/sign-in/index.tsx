import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import { urlPaths } from "../../../router";
import css from "./style.module.scss";

export const SignIn: FC = memo(() => {
    return (
        <>
            <h1>Sign In</h1>
            <div className={css.container}>
                <NavLink to={urlPaths.index}>index</NavLink>
            </div>
            <div className={css.container}>
                <NavLink to={urlPaths.signUp}>Sign up</NavLink>
            </div>
        </>
    );
});
