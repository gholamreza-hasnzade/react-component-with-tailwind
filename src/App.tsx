import { AccordionExample } from "./components/atoms/accordion";
import ActionsDropdownExample from "./components/atoms/actionsDropdown/actionsDropdown.example";
import AvatarExample from "./components/atoms/avatar/avatar.example";
import { BadgeExample } from "./components/atoms/badge";
import { DialogExample } from "./components/atoms/dialog/dialog.example";
import InputExample from "./components/atoms/input/input.example";
import { SelectExample } from "./components/atoms/select/select.example";
import { ToastContainer } from "./components/atoms/toast/ToastContainer";
function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        <DialogExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
