export default function UnderlineTitle({ label, desc }: { label: string; desc?: string }): JSX.Element {
  return (
    <div className="flex items-center justify-between border-b-3 border-black pb-2">
      <h2 className="font-bold text-2xl">{label}</h2>
      {typeof desc === "string" && <p>{desc}</p>}
    </div>
  );
}
