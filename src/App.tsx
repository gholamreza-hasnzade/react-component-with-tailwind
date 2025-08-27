import { ToastContainer } from "./components/atoms/toast/ToastContainer";
/* import InputOTPExample from "./components/atoms/inputOTP/inputOTP.example";
import LayoutExample from "./components/molecules/layout/layout.example";
import { AccordionExample } from "./components/atoms/accordion/accordion.example";
import ActionsDropdownExample from "./components/atoms/actionsDropdown/actionsDropdown.example";
import AvatarExample from "./components/atoms/avatar/avatar.example";
import { BadgeExample } from "./components/atoms/badge"; */
import BarcodeExamples from "./components/atoms/barcodes/barcode.example";
import QRCodeExamples from "./components/atoms/barcodes/qrcode.example";
import ButtonExamples from "./components/atoms/button/button.example";
import { CheckboxExample } from "./components/atoms/checkbox/checkbox.example";
import { DialogExample } from "./components/atoms/dialog/dialog.example";
import { DrawerExample } from "./components/atoms/drawer/drawer.example";
import InputExample from "./components/atoms/input/input.example";
import { InputOTPExample } from "./components/atoms/inputOTP";
import { NotificationsExample } from "./components/atoms/notifications";
import { PasswordExample } from "./components/atoms/password/password.example";
import RatingExample from "./components/atoms/rating/rating.example";
import ActionsDropdownExample from "./components/atoms/actionsDropdown/actionsDropdown.example";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        {/* <BadgeExample /> */}
        <ActionsDropdownExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
