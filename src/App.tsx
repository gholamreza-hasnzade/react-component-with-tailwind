/* import { BadgeExample } from "./components/atoms/badge";
 */import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import { ModalExample } from "./components/molecules/modal";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        <ModalExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
