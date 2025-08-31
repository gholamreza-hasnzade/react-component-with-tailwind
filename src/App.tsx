import InputExample from "./components/atoms/input/input.example";
import { SelectExample } from "./components/atoms/select/select.example";
import { ToastContainer } from "./components/atoms/toast/ToastContainer";
function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        <SelectExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
