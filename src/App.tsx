import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import { ProductsDataTableExample } from "./components/molecules/dataTable/example";

function App() {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
        <ProductsDataTableExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
