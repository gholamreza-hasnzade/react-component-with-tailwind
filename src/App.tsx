import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import BarcodeExamples from "./components/atoms/barcodes/barcode.example";
import { QRCodeExamples } from "./components/atoms/barcodes";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        <BarcodeExamples />

        <QRCodeExamples />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
