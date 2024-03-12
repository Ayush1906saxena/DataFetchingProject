import { Fragment } from "react";
import path from "path";
import fs from "fs/promises";

export default function ProductDetail(props) {
  const { loadedProduct } = props;

  // checking if its there yet.
  if (!loadedProduct) {
    return <p>Loading.....</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy_backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  // Above process is very different from router.query,
  // getStaticProps runs before the component is rendered,
  // so it supports pre rendering and so the search engines can read your data.

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// Dynamic pages dont just need data, you may also need to know which [id] values will be available.
// We cannot pre-generate all the possible pages
export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    // fallback is important when we have a lot of keys that need to be pregenerated
    fallback: true,
    // we can set fallback to true and then even the paths not listed can be valid
    // basically can help us pregenerate highly visited pages and postpone generation of less-frequent ones
  };
}
