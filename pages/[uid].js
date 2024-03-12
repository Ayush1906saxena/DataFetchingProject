export default function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context) {
  // For server side rendering, we dont need getStaticPaths()
  // we already have all the features we need here.
  // Also this runs on the server only anyways
  const { params } = context;
  const userId = params.uid;
  return {
    props: {
      id: "userid-" + userId,
    },
  };
}
