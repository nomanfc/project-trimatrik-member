import Head from "next/head";
import Image from "next/image";

import PayOutRequest from "../../src/pages/payoutrequest/PayoutRequest";

export default function Home() {
  return (
    <>
      <Head>
        <title>Payout Request</title>
        <meta name="Payout Request" content="Payout Request" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
        <PayOutRequest/>
      </div>
    </>
  );
}
