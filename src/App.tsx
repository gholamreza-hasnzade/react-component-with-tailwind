/* import { MeterGroupExample } from "./components/atoms/meterGroup";
 */import { MultiFileUploadExample } from "./components/atoms/multiFileUpload";
/* import { SingleFileUploadExample } from "./components/atoms/singleFileUpload";
 */import { /* ToastExample, */ ToastContainer } from "./components/atoms/toast";
/* import { TreeExample } from "./components/atoms/tree";
 */
function App() {
  /*  const [productCode, setProductCode] = useState("");
  const [password3, setPassword3] = useState(""); */
  return (
    <>
      <div className="w-full h-screen p-4 bg-gray-50 pb-60">
        {/*   <Input
          id="productCode"
          label="Product Code"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          type="number"
          formatPattern="custom"
          customFormat="##-####-###"
          helperText="Enter the 9-digit product code"
        />

        <Password
          id="full-width-password"
          label="Full Width Password"
          value={password3}
          onChange={(e) => setPassword3(e.target.value)}
          fullWidth
          minLength={1}
          maxLength={10}
          color="primary"
          helperText="This password field spans the full width of its container"
        /> */}
       {/*  <MeterGroupExample />
       <TreeExample /> */}

       <MultiFileUploadExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
