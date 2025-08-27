
import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import { SeparatorExample } from "./components/atoms/separator/separator.example";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
      <SeparatorExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
