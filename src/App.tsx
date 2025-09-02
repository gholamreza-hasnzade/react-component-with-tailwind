

import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import { TreeExample } from "./components/atoms/tree/tree.example";
function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        <TreeExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
