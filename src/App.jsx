import Main from "@/components/Main";
import ErrorBoundary from "@/components/ErrorBoundary";

function App() {
  return (
    <div className="h-full bg-background text-foreground font-sans antialiased">
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    </div>
  );
}

export default App;
