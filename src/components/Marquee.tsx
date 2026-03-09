const iconModules = import.meta.glob('../icons/*.{svg,png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

type IconEntry = { name: string; src: string };

const icons: IconEntry[] = Object.entries(iconModules).map(([path, src]) => {
  const file = path.split('/').pop() || '';
  const name = file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
  return { name, src: src as string };
});

export default function Marquee() {
  const doubled = [...icons, ...icons];

  return (
    <div className="w-full overflow-hidden border-t border-b border-border py-4">
      <div className="flex animate-marquee-left whitespace-nowrap">
        {doubled.map((icon, i) => (
          <span
            key={`${icon.name}-${i}`}
            className="inline-flex items-center mx-8 text-sm tracking-widest uppercase text-muted-foreground font-medium"
          >
            <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-cyan/40 bg-background shadow-sm overflow-hidden">
              <img
                src={icon.src}
                alt={icon.name}
                className="h-6 w-6 object-contain"
                loading="lazy"
              />
            </span>
            {icon.name}
          </span>
        ))}
      </div>
    </div>
  );
}
