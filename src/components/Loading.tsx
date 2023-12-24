import Container from "./Container";

const Loading = () => {
  return (
    <main>
      <Container>
        <div className="h-[60vh] flex items-center justify-center">
          <p className="text-3xl font-medium">Loading...</p>
        </div>
      </Container>
    </main>
  );
};

export default Loading;
