import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Stock Seer</h1>
      <Link href="/predict">Go to Prediction</Link>
    </div>
  );
}