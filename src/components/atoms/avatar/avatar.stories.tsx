import { Avatar } from "./avatar";

export default {
  title: "Atoms/Avatar",
  component: Avatar,
};

const sampleImg = "https://randomuser.me/api/portraits/men/32.jpg";

export const Default = () => <Avatar>AB</Avatar>;

export const WithImage = () => (
  <Avatar src={sampleImg} alt="User" size="lg" color="primary" />
);

export const AllColors = () => {
  const colors = [
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "info",
    "default",
  ] as const;
  return (
    <div style={{ display: "flex", gap: 16 }}>
      {colors.map((color) => (
        <Avatar
          key={color}
          src={sampleImg}
          alt={color}
          color={color}
          border
        />
      ))}
    </div>
  );
};

export const AllSizes = () => {
  const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
      {sizes.map((size) => (
        <Avatar key={size} src={sampleImg} alt={size} size={size} border />
      ))}
    </div>
  );
};

export const AllVariants = () => {
  const variants = ["circle", "rounded", "square"] as const;
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
      {variants.map((variant) => (
        <Avatar
          key={variant}
          src={sampleImg}
          alt={variant}
          variant={variant}
          border
        />
      ))}
    </div>
  );
};

export const WithShadow = () => (
  <Avatar src={sampleImg} alt="Shadow" size="lg" shadow border color="info" />
);

export const FallbackInitials = () => (
  <Avatar size="lg" color="success">JS</Avatar>
); 