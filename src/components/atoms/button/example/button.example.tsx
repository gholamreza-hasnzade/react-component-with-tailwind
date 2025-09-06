import { Button } from "../button";
import { FaDownload, FaHeart, FaUser } from "react-icons/fa";

export const ButtonExamples = () => {
  const handleClick = (message: string) => {
    console.log(message);
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Button Component Examples
      </h1>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => handleClick("Contained button clicked")}
            debounce={1000}
          >
            Contained
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleClick("Outlined button clicked")}
          >
            Outlined
          </Button>
          <Button
            variant="text"
            onClick={() => handleClick("Text button clicked")}
          >
            Text
          </Button>
        </div>
      </section>

      {/* Colors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Colors</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="success">Success</Button>
            <Button color="error">Error</Button>
            <Button color="warning">Warning</Button>
            <Button color="info">Info</Button>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <FaUser />
          </Button>
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">With Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button startIcon={<FaDownload />}>Download</Button>
          <Button endIcon={<FaHeart />} color="error">
            Like
          </Button>
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">States</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </section>

      {/* Full Width */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Full Width</h2>
        <div className="space-y-4">
          <Button fullWidth>Full Width Button</Button>
        </div>
      </section>
    </div>
  );
};

export default ButtonExamples;
