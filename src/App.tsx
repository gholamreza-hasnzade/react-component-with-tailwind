/* import { BadgeExample } from "./components/atoms/badge";
 */import BarcodeExamples from "./components/atoms/barcodes/example/barcode.example";
import { ToastContainer } from "./components/atoms/toast/ToastContainer";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        <BarcodeExamples />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
