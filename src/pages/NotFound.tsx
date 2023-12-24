import Container from "./../components/Container";
import PageTitle from "../components/PageTitle";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main>
      <Container>
        <div className="my-5 h-[60vh] flex flex-col gap-4 justify-center items-center">
          <PageTitle>Opps! this page doesn't exist.</PageTitle>
          <Link
            to="."
            className="flex justify-center items-center w-60 h-16 px-6 py-2 bg-slate-800 text-slate-200 rounded text-xl hover:text-slate-50"
          >
            Return home
          </Link>
        </div>
      </Container>
    </main>
  );
};

export default NotFound;
