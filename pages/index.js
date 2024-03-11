import path from "path";
import fs from "fs/promises";
import Link from "next/link";
function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

// Since this code will only run on the server side, we can easily use filesystem here without any vulnerabilities
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy_backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        // Ofc we need to build this route too.....
        destination: "/no-data",
      },
    };
  }

  // rendering a 404 page because there was no data here.
  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    // Added incremental static generation at 10 seconds
    revalidate: 10,
  };
}

export default HomePage;
