export default function UserProfilePage(props) {
  // Now we do need to have the cookies enables to fetch user data
  // But then server side rendering will help process the data and render accordingly
  return <h1>{props.username}</h1>;
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  console.log("server side code");

  return {
    props: {
      username: "max",
    },
  };
}
