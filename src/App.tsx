import { CheckboxExample } from "./components/atoms/checkbox/example/checkbox.example";
import { ToastContainer } from "./components/atoms/toast/ToastContainer";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
      <CheckboxExample />
     </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
