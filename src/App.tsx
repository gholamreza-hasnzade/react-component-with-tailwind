import { AccordionExample } from "./components/atoms/accordion";
import ActionsDropdownExample from "./components/atoms/actionsDropdown/actionsDropdown.example";
import AlertDemo from "./components/atoms/alert/alert-demo";
import AlertExamples from "./components/atoms/alert/alert-examples";
import AvatarExample from "./components/atoms/avatar/avatar.example";
import { BadgeExample } from "./components/atoms/badge";
import CardExamples from "./components/atoms/card/card-examples";
import { DialogExample } from "./components/atoms/dialog/dialog.example";
import { DrawerExample } from "./components/atoms/drawer/drawer.example";
import ImageDebug from "./components/atoms/image/image-debug";
import ImageTest from "./components/atoms/image/image-test";
import ImageGalleryExample from "./components/atoms/image/image-gallery-example";
import InputExample from "./components/atoms/input/input.example";
import { InputOTPExample } from "./components/atoms/inputOTP";
import { SelectExample } from "./components/atoms/select/select.example";
import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import { TypographyExample } from "./components/atoms/typography/typography.example";
function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        <ImageGalleryExample />
        {/* <ImageTest /> */}
        {/* <ImageExamples /> */}
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
