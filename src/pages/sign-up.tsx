import type { FC } from "react";
import { DefaultPage } from "../components/default-page";
import { Header } from "../components/parts/header";
import { Footer } from "../components/parts/footer";
import { SignUp } from "../components/templates/sign-up";

export const SignUpPage: FC = () => (
    <DefaultPage pageMeta={{ title: "Sign Up", description: "Sign Up" }}>
        <Header />
        <SignUp />
        <Footer />
    </DefaultPage>
);
