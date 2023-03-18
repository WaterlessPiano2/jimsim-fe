import Head from "next/head";
import { Inter } from "@next/font/google";
import Table from "@/components/Table";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const DynamicHeader = dynamic(() => import("../components/Header"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

interface Props {
  defiPoolMetrics: any;
  weekGraphData: any;
}

export default function Home({ defiPoolMetrics, weekGraphData }: Props) {
  const [url, setUrl] = useState("https://jimsim-fe.vercel.app/");

  useEffect(() => {
    setUrl(window.location.href);
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content={url} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        {/* <!-- COMMON TAGS --> */}
        <meta charSet="utf-8" />
        <title>JimSim</title>
        {/* <!-- Search Engine --/> */}
        <meta name="description" content="DeFi Analytics" />
        <meta name="image" content={`${url}/github_logo.png`} />
        {/* <!-- Schema.org for Google --/> */}
        <meta itemProp="name" content="JimSim" />
        <meta itemProp="description" content="DeFi Analytics" />
        <meta itemProp="image" content={`${url}/github_logo.png`} />
        {/* <!-- Twitter --/> */}
        <meta name="twitter:card" content="Solana" />
        <meta name="twitter:title" content="JimSim" />
        <meta name="twitter:description" content="DeFi Analytics" />
        <meta name="twitter:site" content="@JimSimData" />
        <meta name="twitter:creator" content="@JimSimData" />
        <meta name="twitter:image:src" content={`${url}/github_logo.png`} />
        {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --/> */}
        <meta name="og:title" content="JimSim" />
        <meta name="og:description" content="DeFi Analytics" />
        <meta name="og:image" content={`${url}/github_logo.png`} />
        <meta name="og:url" content={`${url}`} />
        <meta name="og:site_name" content="JimSim" />
        <meta name="og:type" content="website"></meta>
      </Head>
      <DynamicHeader />
      <main className={inter.className}>
        <Table
          defiPoolMetrics={defiPoolMetrics}
          weekGraphData={weekGraphData}
        />
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const baseURL = context.req.headers.host;
  let defiPoolMetrics;
  let weekGraphData;
  let dayGraphData;
  const URL = `http://${baseURL}/api/defi-pool-metrics`;
  const weekGraphURL = `http://${baseURL}/api/defi-pool-metrics?&graphtimeframe=7d`;
  const dayGraphURL = `http://${baseURL}/api/defi-pool-metrics?&graphtimeframe=24h`;

  try {
    const res = await fetch(URL);
    defiPoolMetrics = await res.json();

    if (!defiPoolMetrics) {
      throw new Error("Unable to fetch any metrics.");
    }
  } catch (e: any) {
    console.log("error all data");
  }

  try {
    const weekGraphRes = await fetch(weekGraphURL);
    weekGraphData = await weekGraphRes.json();

    if (!weekGraphData) {
      throw new Error("Unable to fetch 7 day graphs.");
    }
  } catch (e: any) {
    console.log("error week graph");
  }

  try {
    const dayGraphRes = await fetch(dayGraphURL);
    dayGraphData = await dayGraphRes.json();

    if (!dayGraphData) {
      throw new Error("Unable to fetch 1 day graphs.");
    }
  } catch (e: any) {
    console.log("error day graph");
  }

  return {
    props: { defiPoolMetrics: defiPoolMetrics, weekGraphData: weekGraphData },
  };
}
