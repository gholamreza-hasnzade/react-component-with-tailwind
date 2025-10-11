import { DateFormatExamples ,CalendarMultipleExample} from "./components/atoms/calendar";
import { ToastContainer } from "./components/atoms/toast/ToastContainer";

function App() {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
        <div className="container mx-auto">
          <CalendarMultipleExample />
        </div>
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
