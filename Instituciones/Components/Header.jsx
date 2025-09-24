export default function SectionHeader({ title, subtitle }) {
  return (
    <>
      <h2 className="text-center fw-bold">{title}</h2>
      {subtitle && <p className="text-center text-muted mb-4">{subtitle}</p>}
    </>
  );
}
