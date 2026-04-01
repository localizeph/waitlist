import { Logo } from '~/components/svgs';
import { cn } from '~/lib/utils';

interface MenuItem {
  title: string;
  links: { text: string; url: string }[];
}

interface FooterProps {
  className?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: { text: string; url: string }[];
}

const Footer = ({
  className,
  tagline,
  menuItems = [],
  copyright,
  bottomLinks = [],
}: FooterProps) => {
  return (
    <section className={cn('py-32', className)}>
      <div className="w-full max-w-6xl mx-auto px-4">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <Logo logoOnly />
              {tagline && <p className="mt-4 font-bold">{tagline}</p>}
            </div>
            {menuItems.map((section, i) => (
              <div key={i}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, j) => (
                    <li key={j} className="font-medium hover:text-primary">
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            {copyright && <p>{copyright}</p>}
            <ul className="flex gap-4">
              {bottomLinks.map((link, i) => (
                <li key={i} className="underline hover:text-primary">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };