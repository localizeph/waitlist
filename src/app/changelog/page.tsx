import client from '~/__generated__/client';
import { Changelog } from '~/components/changelog';

export default async function ChangelogPage() {
  const res = await client.queries.changelogConnection();

  const entries = (res.data.changelogConnection.edges ?? [])
    .filter((edge) => edge?.node)
    .map((edge) => {
      const node = edge?.node!;
      return {
        version: node.version,
        date: node.date,
        title: node.title,
        description: node.description ?? '',
        items: (node.items?.filter(Boolean) as string[]) ?? [],
        image: node.image ?? undefined,
        button: node.button
          ? { url: node.button.url ?? '', text: node.button.text ?? '' }
          : undefined,
      };
    });

  return <Changelog entries={entries} />;
}
