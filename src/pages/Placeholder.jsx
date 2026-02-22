
export default function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-500">Coming Soon</p>
    </div>
  );
}
