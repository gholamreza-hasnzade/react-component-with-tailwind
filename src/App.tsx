import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import { TimePickerExample } from "./components/atoms/timepicker/timePicker.example";
import { TimePickerValidationExample } from "./components/atoms/timepicker/timePicker.validation.example";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        <TimePickerValidationExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
