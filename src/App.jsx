import Main from "@/components/Main";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="h-full bg-background text-foreground font-sans antialiased">
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
      <Analytics />
    </div>
  );
}

export default App;
