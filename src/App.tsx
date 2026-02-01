import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import { MeterGroupExample } from "./components/molecules/meterGroup/meterGroup.example";
function App() {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
        <div className="container mx-auto">
          <MeterGroupExample />
        </div>
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
