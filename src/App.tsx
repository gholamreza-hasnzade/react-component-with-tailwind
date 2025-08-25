/* import { TextareaExample } from "./components/atoms/textarea/textarea.example";
 */ import { ToastContainer } from "./components/atoms/toast/ToastContainer";
/* import TooltipExample from "./components/atoms/tooltip/tooltip.example";
 */import { LayoutExample } from "./components/molecules/layout";
function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        {/*  <AccordionExample /> */}
        {/* <TextareaExample /> */}
        {/*       <TooltipExample />
         */}
        <LayoutExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
