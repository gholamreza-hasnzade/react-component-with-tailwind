
import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import InputOTPExample from "./components/atoms/inputOTP/inputOTP.example";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
      <InputOTPExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
