import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps }) => {
  return (
    <div>
      <Header currentUser={"Test"} />
      <Component {...pageProps} />
    </div>
  );
};



export async function getServerSideProps(appContext) {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  return {
    props: {
      currentUser: data.currentUser,
    },
  };
}

export default AppComponent;
