
import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import InputOTPExample from "./components/atoms/inputOTP/inputOTP.example";
import LayoutExample from "./components/molecules/layout/layout.example";
import { AccordionExample } from "./components/atoms/accordion/accordion.example";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
      <AccordionExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
