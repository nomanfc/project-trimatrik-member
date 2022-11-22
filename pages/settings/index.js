import Head from "next/head";
import Image from "next/image";
import ProfileSettings from "../../src/pages/profileSettings/ProfileSettings";

export default function Home() {
  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="Settings" content="Settings" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
        <ProfileSettings />
      </div>
    </>
  );
}
