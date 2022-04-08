import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

// export async function getServerSideProps(context) {
//   return {};
// }

LandingPage.getInitialProps = async (appContext, client, currentUser) => {
  console.log(currentUser);
  return {};
};

export default LandingPage;
