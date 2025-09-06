import { BreadcrumbExample } from "./components/atoms/breadcrumb/example/breadcrumb.example";
import { ToastContainer } from "./components/atoms/toast/ToastContainer";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        <BreadcrumbExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
