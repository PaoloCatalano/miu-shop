import { SWRConfig } from "swr";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { DataProvider } from "../store/GlobalState";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        // fetcher: async (url) => {
        //   const res = await fetch(url);
        //   return await res.json();
        // },
        fetcher: (url) => fetch(url).then((r) => r.json()),
        refreshInterval: 5000,
        dedupingInterval: 4000,
      }}
    >
      <DataProvider>
        <Layout>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </SWRConfig>
  );
}

export default MyApp;
