import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  CardBadge,
  CardElevated,
  CardOutlined,
  CardFilled,
  CardGradient,
  CardGlass,
  CardInteractive,
} from "./card";
import { Button } from "../button/button";

export function CardExamples() {
  const [selectedCard, setSelectedCard] = React.useState<string | null>(null);

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Card Component Examples</h1>
        <p className="text-gray-600 mb-8">
          Comprehensive examples of the Card component with all variants, features, and use cases.
        </p>
      </div>

      {/* Basic Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Basic Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>
                This is a basic card with header, content, and footer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content goes here. You can add any content you want.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outlined" size="sm">
                Action
              </Button>
            </CardFooter>
          </Card>

          <Card size="lg">
            <CardHeader>
              <CardTitle>Large Card</CardTitle>
              <CardDescription>
                This card has larger padding for more spacious content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>More space for content with the large size variant.</p>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Small Card</CardTitle>
              <CardDescription>Compact card with minimal padding.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Perfect for compact layouts.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Card Variants */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Card Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardElevated>
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>
                Enhanced shadow that increases on hover.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Perfect for important content that needs emphasis.</p>
            </CardContent>
          </CardElevated>

          <CardOutlined>
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
              <CardDescription>
                Strong border with transparent background.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Great for subtle content separation.</p>
            </CardContent>
          </CardOutlined>

          <CardFilled>
            <CardHeader>
              <CardTitle>Filled Card</CardTitle>
              <CardDescription>
                Muted background for content grouping.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Ideal for grouping related content.</p>
            </CardContent>
          </CardFilled>

          <CardGradient>
            <CardHeader>
              <CardTitle>Gradient Card</CardTitle>
              <CardDescription>
                Beautiful gradient background effect.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Eye-catching design for special content.</p>
            </CardContent>
          </CardGradient>

          <CardGlass>
            <CardHeader>
              <CardTitle>Glass Card</CardTitle>
              <CardDescription>
                Glassmorphism effect with backdrop blur.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Modern glass effect for contemporary designs.</p>
            </CardContent>
          </CardGlass>

          <Card variant="flat">
            <CardHeader>
              <CardTitle>Flat Card</CardTitle>
              <CardDescription>
                No shadow, clean flat design.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Minimalist design without shadows.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Interactive Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardInteractive
            onClick={() => setSelectedCard(selectedCard === "card1" ? null : "card1")}
            className={selectedCard === "card1" ? "ring-2 ring-blue-500" : ""}
          >
            <CardHeader>
              <CardTitle>Clickable Card</CardTitle>
              <CardDescription>
                This card responds to clicks with hover effects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Click me to see the interaction!</p>
            </CardContent>
          </CardInteractive>

          <CardInteractive
            onClick={() => setSelectedCard(selectedCard === "card2" ? null : "card2")}
            className={selectedCard === "card2" ? "ring-2 ring-green-500" : ""}
          >
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>
                Hover and click animations included.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Try hovering and clicking this card!</p>
            </CardContent>
          </CardInteractive>

          <Card
            interactive={true}
            onClick={() => setSelectedCard(selectedCard === "card3" ? null : "card3")}
            className={selectedCard === "card3" ? "ring-2 ring-purple-500" : ""}
          >
            <CardHeader>
              <CardTitle>Custom Interactive</CardTitle>
              <CardDescription>
                Interactive prop with custom styling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Another interactive card example.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Cards with Images */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Cards with Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardImage
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=200&fit=crop"
              alt="Sample image"
            />
            <CardHeader>
              <CardTitle>Image Card</CardTitle>
              <CardDescription>
                Card with a beautiful image header.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card includes an image with hover effects.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outlined" size="sm">
                View More
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <div className="relative">
              <CardImage
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop"
                alt="Sample image"
              />
              <CardBadge variant="success">New</CardBadge>
            </div>
            <CardHeader>
              <CardTitle>Card with Badge</CardTitle>
              <CardDescription>
                Image card with a status badge.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Badges can indicate status or categories.</p>
            </CardContent>
          </Card>

          <Card>
            <div className="relative">
              <CardImage
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=200&fit=crop"
                alt="Sample image"
              />
              <CardBadge variant="warning">Featured</CardBadge>
            </div>
            <CardHeader>
              <CardTitle>Featured Content</CardTitle>
              <CardDescription>
                Highlighted content with warning badge.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Use badges to highlight important content.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* RTL Support */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">RTL Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card dir="rtl">
            <CardHeader>
              <CardTitle>بطاقة باللغة العربية</CardTitle>
              <CardDescription>
                هذه بطاقة تدعم الاتجاه من اليمين إلى اليسار
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>النص يظهر بشكل صحيح في الاتجاه العربي</p>
            </CardContent>
            <CardFooter>
              <Button variant="outlined" size="sm">
                إجراء
              </Button>
            </CardFooter>
          </Card>

          <Card dir="rtl" variant="elevated">
            <div className="relative">
              <CardImage
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=200&fit=crop"
                alt="صورة عينة"
              />
              <CardBadge variant="success" dir="rtl">
                جديد
              </CardBadge>
            </div>
            <CardHeader>
              <CardTitle>بطاقة مع صورة</CardTitle>
              <CardDescription>
                بطاقة عربية مع صورة وشارة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>الشارة تظهر في المكان الصحيح للاتجاه العربي</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Complex Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Complex Cards</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardElevated>
            <CardHeader>
              <CardTitle>Product Card</CardTitle>
              <CardDescription>
                Complete product information card
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">In Stock</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">$99.99</span>
                <span className="text-sm text-gray-500 line-through">$129.99</span>
              </div>
              <p className="text-sm text-gray-600">
                High-quality product with excellent features and great value for money.
              </p>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
                <span className="text-sm text-gray-500 ml-2">(4.8)</span>
              </div>
            </CardContent>
            <CardFooter className="space-x-2">
              <Button variant="outlined" size="sm">
                Add to Cart
              </Button>
              <Button size="sm">
                Buy Now
              </Button>
            </CardFooter>
          </CardElevated>

          <CardGradient>
            <CardHeader>
              <CardTitle>User Profile Card</CardTitle>
              <CardDescription>
                User information and actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Followers</span>
                  <p className="font-semibold">1,234</p>
                </div>
                <div>
                  <span className="text-gray-500">Following</span>
                  <p className="font-semibold">567</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Passionate about creating amazing user experiences and building scalable applications.
              </p>
            </CardContent>
            <CardFooter className="space-x-2">
              <Button variant="outlined" size="sm">
                Message
              </Button>
              <Button size="sm">
                Follow
              </Button>
            </CardFooter>
          </CardGradient>
        </div>
      </section>

      {/* Animation Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Animation Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card animated={true}>
            <CardHeader>
              <CardTitle>Animated Card</CardTitle>
              <CardDescription>
                Smooth transitions and hover effects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has smooth animations enabled.</p>
            </CardContent>
          </Card>

          <Card animated={false}>
            <CardHeader>
              <CardTitle>Static Card</CardTitle>
              <CardDescription>
                No animations for performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has animations disabled.</p>
            </CardContent>
          </Card>

          <CardInteractive animated={true}>
            <CardHeader>
              <CardTitle>Interactive + Animated</CardTitle>
              <CardDescription>
                Both interactive and animated features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Best of both worlds!</p>
            </CardContent>
          </CardInteractive>
        </div>
      </section>

      {/* Code Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Examples</CardTitle>
              <CardDescription>
                Here are some common usage patterns for the Card component.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  {`// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Interactive card
<CardInteractive onClick={handleClick}>
  <CardHeader>
    <CardTitle>Clickable Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>This card is clickable</p>
  </CardContent>
</CardInteractive>

// Card with image and badge
<Card>
  <div className="relative">
    <CardImage src="/image.jpg" alt="Image" />
    <CardBadge variant="success">New</CardBadge>
  </div>
  <CardHeader>
    <CardTitle>Image Card</CardTitle>
  </CardHeader>
</Card>

// RTL support
<Card dir="rtl">
  <CardHeader>
    <CardTitle>بطاقة عربية</CardTitle>
  </CardHeader>
</Card>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default CardExamples;
