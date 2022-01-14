import { Button } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { InventoryTable } from "../components/InventoryTable";
import Layout from "../components/Layout";

const InventoryPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Shopify Backend Challenge Demo - Omar Abu Samra</title>
        <meta name="description" content="The Shopify Backend challenge attempted by me, Omar Abu Samra"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Button
          colorScheme={'blue'}
          mr={4}
          onClick={() => {
            router.push("/create");
          }}
        >
          Create Inventory Item
        </Button>
        <Button
          colorScheme={'blue'}
          onClick={() => {
            router.push("/export");
          }}
        >
          Export CSV
        </Button>
        <InventoryTable/>
      </Layout>
    </>
  );
}

export default InventoryPage;