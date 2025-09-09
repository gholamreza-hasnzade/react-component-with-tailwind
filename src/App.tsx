import { ToastContainer } from "./components/atoms/toast/ToastContainer";

function App() {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
