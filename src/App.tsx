/* import ActionsDropdownExample from "./components/atoms/actionsDropdown/actionsDropdown.example";
 */ /* import AvatarExample from "./components/atoms/avatar/avatar.example"; */
import ButtonExamples from "./components/atoms/button/button.example";
/* import TagsInputExample from "./components/atoms/tagsInput/tagsInput.example";
 */ import { ToastContainer } from "./components/atoms/toast/ToastContainer";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        {/*  <TagsInputExample /> */}
        {/*        <ActionsDropdownExample /> */}
        {/*  <AvatarExample /> */}
        <ButtonExamples />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
