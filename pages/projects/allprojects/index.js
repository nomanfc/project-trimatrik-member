import Head from "next/head";
import Image from "next/image";

import Projects from "../../../src/pages/projetcs/Projects";

export default function Home() {
  return (
    <>
      <Head>
        <title>Projects</title>
        <meta name="Projects" content="Projects" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
        <Projects />
      </div>
    </>
  );
}
