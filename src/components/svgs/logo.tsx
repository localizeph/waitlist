import { MapPin } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <MapPin className="size-4" />
      </div>
      <span className="text-lg font-semibold">Localize</span>
    </div>
  );
}
