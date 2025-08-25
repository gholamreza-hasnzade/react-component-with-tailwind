/* import { TextareaExample } from "./components/atoms/textarea/textarea.example";
 */ import InputExample from "./components/atoms/input/input.example";
import TagsInputExample from "./components/atoms/tagsInput/tagsInput.example";
import { ToastContainer } from "./components/atoms/toast/ToastContainer";
/* import TooltipExample from "./components/atoms/tooltip/tooltip.example";
 */ /* import { LayoutExample } from "./components/molecules/layout"; */
function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        {/*  <AccordionExample /> */}
        {/* <TextareaExample /> */}
        {/*       <TooltipExample />
         */}
        {/*  <LayoutExample /> */}
        {/*  <InputExample /> */}
        <TagsInputExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
