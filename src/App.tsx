import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import { DataTableDemo } from "./components/molecules/dataTable/example/demo";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        <DataTableDemo />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
