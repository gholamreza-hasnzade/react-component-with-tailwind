import { DatePickerExample, DateRangePickerExample, DatePickerFormExample } from "./components/atoms/calendar/datePicker.example";
import { ToastContainer } from "./components/atoms/toast/ToastContainer";

function App() {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center py-8">تقویم شمسی فارسی</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DatePickerExample />
            <DateRangePickerExample />
          </div>
          <div className="mt-8">
            <DatePickerFormExample />
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
