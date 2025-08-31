import { AccordionExample } from "./components/atoms/accordion";
import ActionsDropdownExample from "./components/atoms/actionsDropdown/actionsDropdown.example";
import AvatarExample from "./components/atoms/avatar/avatar.example";
import { BadgeExample } from "./components/atoms/badge";
import { DialogExample } from "./components/atoms/dialog/dialog.example";
import { DrawerExample } from "./components/atoms/drawer/drawer.example";
import InputExample from "./components/atoms/input/input.example";
import { InputOTPExample } from "./components/atoms/inputOTP";
import { SelectExample } from "./components/atoms/select/select.example";
import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import { TypographyExample } from "./components/atoms/typography/typography.example";
function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        <TypographyExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
