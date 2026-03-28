import { LandingPage } from "./page.client";
import { connection } from "next/server";
import client from "~/__generated__/client";
import { getNotionDatabaseRowCount } from "~/lib/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [waitlistPeople, navRes] = await Promise.all([
    await getNotionDatabaseRowCount(process.env.NOTION_DB_ID as string),
    client.queries.nav({ relativePath: "nav.json" }),
    // forces the page to be dyamically rendered
    await connection(),
  ]);

  const footer = navRes.data.nav.footer;

  return <LandingPage waitlistPeople={waitlistPeople} footerData={footer} />;
}
