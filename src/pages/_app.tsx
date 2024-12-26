import App, { AppProps, AppContext } from "next/app";
import { Montserrat } from "next/font/google";
import { ModalProvider } from "@/src/components/modal/modalContext";
import "@/src/globals.scss"; // Global styles
import styles from "@/src/layout/layout.module.scss";
import Header from "@/src/layout/header";
import Footer from "@/src/layout/footer";
import { GraphQLClient } from "graphql-request";
import { GlobalData, SocialLink, CopyrightData } from "@/src/types/global";
import client from "@/src/apollo-client";
import {ApolloProvider} from "@apollo/client";

// Configure the font
const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat",
});

// Fetch global SSG data (socialLinks + copyright)
const fetchGlobalData = async (locale: string): Promise<GlobalData> => {
    const endpoint = process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql";
    const client = new GraphQLClient(endpoint);

    const query = `
        query GlobalData($locale: I18NLocaleCode) {
            socialLinks(locale: $locale) {
                url
                title
                documentId
                icon {
                  url
                }
            }
            copyright(locale: $locale) {
                copyrights
            }
        }
    `;

    try {
        const response = await client.request<{ socialLinks: SocialLink[]; copyright: CopyrightData }>(query, {
            locale,
        });

        console.log(response)

        return {
            socialLinks: response.socialLinks || [],
            copyright: response.copyright || { copyrights: "© 2024 Your Company. All rights reserved." },
        };
    } catch (error) {
        console.error("Error fetching global data:", error);
        return {
            socialLinks: [],
            copyright: {
                copyrights: "© 2024 Your Company. All rights reserved.",
            },
        };
    }
};

interface MyAppProps extends AppProps {
    globalData: GlobalData;
}

function MyApp({ Component, pageProps, globalData }: MyAppProps) {
    const { socialLinks, copyright } = globalData;

    return (
        <ApolloProvider client={client}>
            <div className={`${styles.body} ${montserrat.variable}`}>
                <Header />
                <main className={styles.main}>
                    <ModalProvider>
                        <Component {...pageProps} />
                    </ModalProvider>
                </main>
                <Footer socialLinks={socialLinks} copyright={copyright?.copyrights || ""} />
            </div>
        </ApolloProvider>
    );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const locale = appContext.ctx.locale || "en"; // Get the current locale or fallback to "en"
    const globalData = await fetchGlobalData(locale);

    const appProps = await App.getInitialProps(appContext);

    return {
        ...appProps,
        globalData,
    };
};

export default MyApp;