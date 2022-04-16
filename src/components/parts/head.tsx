import { FC, memo } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { PageProps } from "../contexts/types";

export const Head: FC<PageProps> = memo(({ pageMeta }) => (
    <HelmetProvider>
        <Helmet>
            <title key="title">{pageMeta.title}</title>
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1"
            ></meta>
            <meta
                key="description"
                name="description"
                content={pageMeta.description}
            />
            <meta
                name="format-detection"
                content="telephone=no,email=no,address=no"
            />
            {/* pre fetch */}
            {/* <link rel="dns-prefetch" href={`${environments.cdnEndpoint}/`} />
            <link rel="preconnect" href={`${environments.cdnEndpoint}`} />
            <link rel="prefetch" href={`${environments.cdnEndpoint}`} />
            <link
                rel="prerender"
                href={`${environments.cdnEndpoint}/next-page.html`}
            /> */}
            {/* WebApp */}
            <meta name="application-name" content={pageMeta.title} />
            <meta name="theme-color" content={"white"} />
            <meta name="msapplication-config" content="/browserconfig.xml" />
            <meta name="msapplication-TitleColor" content={"white"} />
            <meta name="apple-mobile-web-app-title" content={pageMeta.title} />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content={"white"}
            />
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
            <link
                rel="icon"
                type="image/x-icon"
                sizes="64x64"
                href="/favicon.ico"
            />
            <link
                rel="search"
                type="application/opensearchdescription+xml"
                title="Next.js_template"
                href="/opensearch.xml"
            />
            {/*OGP */}
            <meta property="og:site_name" content={pageMeta.title} />
            <meta property="og:locale" content="en" />
            <meta key="og:type" property="og:type" content="website" />
            <meta key="og:title" property="og:title" content={pageMeta.title} />
            <meta
                key="og:description"
                property="og:description"
                content={pageMeta.description}
            />
        </Helmet>
    </HelmetProvider>
));
