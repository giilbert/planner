import Link from 'next/link';

function IndexPage() {
  return (
    <div>
      <h2>/ index page!!!</h2>
      <p>Ill maybe do this later</p>

      <Link href="/app">Go to the app!</Link>
    </div>
  );
}

export default IndexPage;
