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
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
