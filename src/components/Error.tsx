import { useRouteError } from "react-router-dom";
import Container from "./Container";

const Error = () => {
  const error = useRouteError();

  return (
    <main>
      <Container>
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <div>
            <p className="text-3xl font-medium mb-2">Error: {error.message}</p>
            <pre>
              {error.statuText} - {error.status}
            </pre>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Error;
