import { useParams } from 'react-router-dom';

export default function Dashboard() {
  const { username } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard for: {username}</h1>
    </div>
  );
}