import Head from "next/head";
import Image from "next/image";

import MemberPayable from "../../src/pages/memberPayable/MemberPayable";

export default function Home() {
  return (
    <>
      <Head>
        <title>Member Payable</title>
        <meta name="Member Payable" content="Member Payable" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
        <MemberPayable />
      </div>
    </>
  );
}
