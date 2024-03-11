import path from "path";
import fs from "fs/promises";
function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

// Since this code will only run on the server side, we can easily use filesystem here without any vulnerabilities
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy_backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    // Added incremental static generation at 10 seconds
    revalidate: 10,
  };
}

export default HomePage;
