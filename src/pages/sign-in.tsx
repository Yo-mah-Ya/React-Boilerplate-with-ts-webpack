import type { FC } from "react";
import { DefaultPage } from "../components/default-page";
import { Header } from "../components/parts/header";
import { Footer } from "../components/parts/footer";
import { SignIn } from "../components/templates/sign-in";

export const SignInPage: FC = () => (
    <DefaultPage pageMeta={{ title: "Sign In", description: "Sign In" }}>
        <Header />
        <SignIn />
        <Footer />
    </DefaultPage>
);
