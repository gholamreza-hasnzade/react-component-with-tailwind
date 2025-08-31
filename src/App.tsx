import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import { TimePickerExample } from "./components/atoms/timepicker/timePicker.example";
import { TimePickerValidationExample } from "./components/atoms/timepicker/timePicker.validation.example";
import InputExample from "./components/atoms/input/input.example";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        <InputExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
