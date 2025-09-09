import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import { DataTableExample } from "./components/molecules/dataTable/dataTable.example";

function App() {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
        <DataTableExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
