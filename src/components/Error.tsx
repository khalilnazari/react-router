import Container from "./Container";

const Error = ({ children }: any) => {
  return (
    <main>
      <Container>
        <div className="h-[60vh] flex items-center justify-center">
          <p className="text-3xl font-medium">{children}</p>
        </div>
      </Container>
    </main>
  );
};

export default Error;
