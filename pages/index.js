import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import DashBoard from "../src/pages/Dashboard/DashBoard";
import MemberPayable from "../src/pages/memberPayable/MemberPayable";

import { useUserContext } from "../src/contexts/UserContext";

export default function Home() {
  const { user } = useUserContext();
  return (
    <>
      <Head>
        <title>Member Panel</title>
        <meta name="Member Panel" content="Generated by create next app" />
        <link rel="icon" href="/MainLogo.png" />
      </Head>

      <div style={{ padding: 0 }}>
        {user?.is_approved === 1 ? <DashBoard /> : <MemberPayable />}
      </div>
    </>
  );
}