import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import { TypographyExample } from "./components/atoms/typography/typography.example";

function App() {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
        <TypographyExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
