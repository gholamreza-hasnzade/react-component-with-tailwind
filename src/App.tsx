
import { TimePickerExample } from "./components/atoms/timepicker/timePicker.example";
import { ToastContainer } from "./components/atoms/toast/ToastContainer";


function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
      <TimePickerExample />  
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
