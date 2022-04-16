import type { FC, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { IndexPage } from "./pages/index";
import { NotFoundPage } from "./pages/404";
import { SignInPage } from "./pages/sign-in";
import { SignUpPage } from "./pages/sign-up";
import "./components/polyfill";

const OutletWith: FC<{ children: ReactNode }> = ({ children }) => (
    <>
        {children}
        <Outlet />
    </>
);

export const urlPaths = {
    index: "/",
    signIn: "/sign-in",
    signUp: "/sign-up",
} as const;

export const RouterConfig: FC = () => (
    <BrowserRouter>
        <Routes>
            <Route
                index
                element={
                    <OutletWith>
                        <IndexPage />
                    </OutletWith>
                }
            />
            <Route
                path={urlPaths.signIn}
                element={<SignInPage />}
                caseSensitive={true}
            />
            <Route
                path={urlPaths.signUp}
                element={<SignUpPage />}
                caseSensitive={true}
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
);
