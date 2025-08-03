import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <h3>Welcome Home!</h3>
      <Link to="/videos/download">Download</Link>
    </div>
  );
}
