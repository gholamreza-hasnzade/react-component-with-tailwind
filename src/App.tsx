import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import { DataTableApiExample } from "./components/molecules/dataTable/dataTableApi.example";

function App() {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
        <DataTableApiExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
