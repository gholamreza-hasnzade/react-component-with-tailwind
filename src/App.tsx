import { AccordionExample } from "./components/atoms/accordion";
import AvatarExample from "./components/atoms/avatar/avatar.example";
import { BadgeExample } from "./components/atoms/badge";
import { BreadcrumbExample } from "./components/atoms/breadcrumb/breadcrumb.example";
import { DrawerExample } from "./components/atoms/drawer/drawer.example";
import { ToastContainer } from "./components/atoms/toast/ToastContainer";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
