import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import AccordionDemo from "./components/atoms/accordion/accordion-demo";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        <AccordionDemo />
        {/* <BadgeExample /> */}
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
