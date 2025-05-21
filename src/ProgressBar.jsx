export default function ProgressBar({ current, total }) {
  const width = `${(current / total) * 100}%`;
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width }} />
    </div>
  );
}
