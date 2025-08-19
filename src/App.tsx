/* import { TextareaExample } from "./components/atoms/textarea/textarea.example";
 */import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import TooltipExample from "./components/atoms/tooltip/tooltip.example";
function App() {
  return (
    <>
      <div className="w-full h-screen p-4 bg-gray-50 pb-60">
        {/*  <AccordionExample /> */}
      {/* <TextareaExample /> */}
      <TooltipExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
