import Head from "next/head";
import { Inter } from "@next/font/google";
import Table from "@/components/Table";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const DynamicHeader = dynamic(() => import("../components/Header"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

interface Props {
  defiPoolMetrics: any;
}

export default function Home({ defiPoolMetrics }: Props) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* <!-- COMMON TAGS --> */}
        <meta charSet="utf-8" />
        <title>JimSim</title>
        {/* <!-- Search Engine --/> */}
        <meta name="description" content="DeFi Analytics" />
        <meta name="image" content="https://jimsim.io/dummy.png" />
        {/* <!-- Schema.org for Google --/> */}
        <meta itemProp="name" content="JimSim" />
        <meta itemProp="description" content="DeFi Analytics" />
        <meta itemProp="image" content="https://jimsim.io/dummy.png" />
        {/* <!-- Twitter --/> */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="JimSim" />
        <meta name="twitter:description" content="DeFi Analytics" />
        <meta name="twitter:site" content="@JimSimData" />
        <meta name="twitter:creator" content="@JimSimData" />
        <meta name="twitter:image:src" content="https://jimsim.io/dummy.png" />
        {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --/> */}
        <meta name="og:title" content="JimSim" />
        <meta name="og:description" content="DeFi Analytics" />
        <meta name="og:image" content="https://jimsim.io/dummy.png" />
        <meta name="og:url" content="https://jimsim.io" />
        <meta name="og:site_name" content="JimSim" />
        <meta name="og:type" content="website"></meta>
      </Head>
      <DynamicHeader />
      <main className={inter.className}>
        <Table defiPoolMetrics={defiPoolMetrics} />
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  console.log(context.params);
  console.log(context.resolvedUrl);
  console.log(context.req.headers.host);
  const baseURL = context.req.headers.host;
  const URL = `http://${baseURL}/api/defi-pool-metrics`;
  const res = await fetch(URL);
  const defiPoolMetrics = await res.json();

  if (!defiPoolMetrics) {
    return {
      notFound: true,
    };
  }

  return {
    props: { defiPoolMetrics: defiPoolMetrics },
  };
}
