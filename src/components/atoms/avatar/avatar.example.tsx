import React from "react";
import { Avatar } from "./avatar";
import { HiUser, HiCamera } from "react-icons/hi";

export const AvatarExample: React.FC = () => {
  const handleMoreClick = React.useCallback(
    (teamName: string, hiddenCount: number) => {
      console.log(`🔄 More clicked for ${teamName}`);
      console.log(`📊 Hidden members count: ${hiddenCount}`);

      // Toggle showing hidden members for this team
    },
    []
  );

  const handleAvatarClick = React.useCallback((name: string) => {
    console.log(`👤 Avatar clicked: ${name}`);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Avatar Component Examples
          </h1>
          <p className="text-lg text-gray-600">
            A comprehensive showcase of the Avatar component
          </p>
        </div>

        {/* Basic Sizes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Basic Sizes
          </h2>
          <div className="flex items-center justify-center space-x-8">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
              <div key={size} className="text-center">
                <h3 className="text-sm font-medium text-gray-800 mb-2">
                  {size.toUpperCase()}
                </h3>
                <Avatar size={size} alt={`${size} Avatar`} />
              </div>
            ))}
          </div>
        </div>

        {/* Variants */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Variants</h2>
          <div className="flex items-center justify-center space-x-8">
            {(["circle", "rounded", "square"] as const).map((variant) => (
              <div key={variant} className="text-center">
                <h3 className="text-sm font-medium text-gray-800 mb-2">
                  {variant}
                </h3>
                <Avatar variant={variant} size="lg" alt={`${variant} Avatar`} />
              </div>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(
              [
                "primary",
                "secondary",
                "success",
                "error",
                "warning",
                "info",
                "default",
              ] as const
            ).map((color) => (
              <div key={color} className="text-center">
                <h3 className="text-sm font-medium text-gray-800 mb-2">
                  {color}
                </h3>
                <Avatar color={color} size="md" alt={`${color} Avatar`} />
              </div>
            ))}
          </div>
        </div>

        {/* Status Indicators */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Status Indicators
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(["online", "offline", "away", "busy"] as const).map((status) => (
              <div key={status} className="text-center">
                <h3 className="text-sm font-medium text-gray-800 mb-2">
                  {status}
                </h3>
                <Avatar status={status} size="md" alt={`${status} User`} />
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Notification
              </h3>
              <Avatar
                badge="3"
                badgeColor="error"
                size="md"
                alt="Notification Badge"
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">New</h3>
              <Avatar
                badge="NEW"
                badgeColor="success"
                size="md"
                alt="New Badge"
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">VIP</h3>
              <Avatar
                badge="VIP"
                badgeColor="warning"
                size="md"
                alt="VIP Badge"
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Admin</h3>
              <Avatar
                badge="ADMIN"
                badgeColor="primary"
                size="md"
                alt="Admin Badge"
              />
            </div>
          </div>
        </div>

        {/* Interactive Features */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Interactive Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Clickable
              </h3>
              <Avatar
                clickable
                onClick={() => handleAvatarClick("John")}
                hoverEffect="scale"
                size="lg"
                alt="Clickable Avatar"
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Hover Glow
              </h3>
              <Avatar hoverEffect="glow" size="lg" alt="Glow Effect Avatar" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                With Border
              </h3>
              <Avatar border color="primary" size="lg" alt="Bordered Avatar" />
            </div>
          </div>
        </div>

        {/* Fallback Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Fallback Content
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Initials
              </h3>
              <Avatar size="md" alt="John Doe">
                JD
              </Avatar>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Icon</h3>
              <Avatar
                size="md"
                alt="User Icon"
                fallbackIcon={<HiUser className="w-6 h-6" />}
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Custom Icon
              </h3>
              <Avatar
                size="md"
                alt="Camera Icon"
                fallbackIcon={<HiCamera className="w-6 h-6" />}
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Emoji</h3>
              <Avatar size="md" alt="Star Emoji">
                ⭐
              </Avatar>
            </div>
          </div>
        </div>

        {/* Loading State */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Loading State
          </h2>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Loading
              </h3>
              <Avatar loading size="lg" alt="Loading Avatar" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                With Status
              </h3>
              <Avatar
                loading
                status="online"
                size="lg"
                alt="Loading with Status"
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                With Badge
              </h3>
              <Avatar loading badge="5" size="lg" alt="Loading with Badge" />
            </div>
          </div>
        </div>

        {/* Avatar Groups */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Avatar Groups
          </h2>

          {/* Stack Variant */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Stack Variant
            </h3>
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Normal Spacing
                </h4>
                <div className="flex">
                  {[
                    {
                      name: "John Doe",
                      initials: "JD",
                      color: "primary" as const,
                    },
                    {
                      name: "Jane Smith",
                      initials: "JS",
                      color: "success" as const,
                    },
                    {
                      name: "Bob Johnson",
                      initials: "BJ",
                      color: "warning" as const,
                    },
                    {
                      name: "Alice Brown",
                      initials: "AB",
                      color: "info" as const,
                    },
                  ].map((user, index) => (
                    <Avatar
                      key={index}
                      color={user.color}
                      size="md"
                      alt={user.name}
                      group
                      groupVariant="stack"
                      groupSpacing="normal"
                      groupIndex={index}
                      groupTotal={4}
                      clickable
                      onClick={() => handleAvatarClick(user.name)}
                    >
                      {user.initials}
                    </Avatar>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Tight Spacing
                </h4>
                <div className="flex">
                  {[
                    {
                      name: "Mike Wilson",
                      initials: "MW",
                      color: "secondary" as const,
                    },
                    {
                      name: "Sarah Davis",
                      initials: "SD",
                      color: "error" as const,
                    },
                    {
                      name: "Tom Miller",
                      initials: "TM",
                      color: "primary" as const,
                    },
                    {
                      name: "Lisa Garcia",
                      initials: "LG",
                      color: "success" as const,
                    },
                    {
                      name: "David Lee",
                      initials: "DL",
                      color: "warning" as const,
                    },
                  ].map((user, index) => (
                    <Avatar
                      key={index}
                      color={user.color}
                      size="md"
                      alt={user.name}
                      group
                      groupVariant="stack"
                      groupSpacing="tight"
                      groupIndex={index}
                      groupTotal={5}
                      groupMax={4}
                      showGroupMore
                      onGroupMoreClick={() => handleAvatarClick("+1 more")}
                      clickable
                      onClick={() => handleAvatarClick(user.name)}
                    >
                      {user.initials}
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Grid Variant */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Grid Variant
            </h3>
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  3x2 Grid
                </h4>
                <div className="grid grid-cols-3 gap-1 w-32">
                  {[
                    {
                      name: "User 1",
                      initials: "U1",
                      color: "primary" as const,
                    },
                    {
                      name: "User 2",
                      initials: "U2",
                      color: "success" as const,
                    },
                    {
                      name: "User 3",
                      initials: "U3",
                      color: "warning" as const,
                    },
                    { name: "User 4", initials: "U4", color: "info" as const },
                    {
                      name: "User 5",
                      initials: "U5",
                      color: "secondary" as const,
                    },
                    { name: "User 6", initials: "U6", color: "error" as const },
                  ].map((user, index) => (
                    <Avatar
                      key={index}
                      color={user.color}
                      size="sm"
                      alt={user.name}
                      group
                      groupVariant="grid"
                      groupIndex={index}
                      groupTotal={6}
                      clickable
                      onClick={() => handleAvatarClick(user.name)}
                    >
                      {user.initials}
                    </Avatar>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  2x2 Grid
                </h4>
                <div className="grid grid-cols-2 gap-2 w-24">
                  {[
                    { name: "Admin", initials: "A", color: "primary" as const },
                    { name: "Mod", initials: "M", color: "warning" as const },
                    { name: "User", initials: "U", color: "success" as const },
                    {
                      name: "Guest",
                      initials: "G",
                      color: "secondary" as const,
                    },
                  ].map((user, index) => (
                    <Avatar
                      key={index}
                      color={user.color}
                      size="sm"
                      alt={user.name}
                      group
                      groupVariant="grid"
                      groupIndex={index}
                      groupTotal={4}
                      clickable
                      onClick={() => handleAvatarClick(user.name)}
                    >
                      {user.initials}
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* List Variant */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              List Variant
            </h3>
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Vertical List
                </h4>
                <div className="flex flex-col space-y-2 w-24">
                  {[
                    {
                      name: "Team Lead",
                      initials: "TL",
                      color: "primary" as const,
                    },
                    {
                      name: "Developer",
                      initials: "DEV",
                      color: "success" as const,
                    },
                    {
                      name: "Designer",
                      initials: "DES",
                      color: "warning" as const,
                    },
                    { name: "QA", initials: "QA", color: "info" as const },
                  ].map((user, index) => (
                    <Avatar
                      key={index}
                      color={user.color}
                      size="sm"
                      alt={user.name}
                      group
                      groupVariant="list"
                      groupIndex={index}
                      groupTotal={4}
                      clickable
                      onClick={() => handleAvatarClick(user.name)}
                    >
                      {user.initials}
                    </Avatar>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  With Status
                </h4>
                <div className="flex flex-col space-y-2 w-24">
                  {[
                    {
                      name: "Online User",
                      initials: "OU",
                      status: "online" as const,
                    },
                    {
                      name: "Away User",
                      initials: "AU",
                      status: "away" as const,
                    },
                    {
                      name: "Busy User",
                      initials: "BU",
                      status: "busy" as const,
                    },
                    {
                      name: "Offline User",
                      initials: "OU",
                      status: "offline" as const,
                    },
                  ].map((user, index) => (
                    <Avatar
                      key={index}
                      color="default"
                      size="sm"
                      alt={user.name}
                      status={user.status}
                      group
                      groupVariant="list"
                      groupIndex={index}
                      groupTotal={4}
                      clickable
                      onClick={() => handleAvatarClick(user.name)}
                    >
                      {user.initials}
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-world Examples */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Real-world Examples
          </h2>

          {/* User List */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              User List
            </h3>
            <div className="space-y-3">
              {[
                {
                  name: "John Doe",
                  role: "Admin",
                  status: "online" as const,
                  badge: "3",
                },
                { name: "Jane Smith", role: "User", status: "away" as const },
                {
                  name: "Bob Johnson",
                  role: "Moderator",
                  status: "offline" as const,
                },
                {
                  name: "Alice Brown",
                  role: "User",
                  status: "busy" as const,
                  badge: "NEW",
                },
              ].map((user, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                >
                  <Avatar
                    status={user.status}
                    badge={user.badge}
                    badgeColor={user.badge === "NEW" ? "success" : "error"}
                    size="md"
                    alt={user.name}
                  >
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {user.name}
                    </h4>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === "online"
                          ? "bg-green-100 text-green-800"
                          : user.status === "away"
                          ? "bg-yellow-100 text-yellow-800"
                          : user.status === "busy"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Collaboration */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Team Collaboration
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-blue-900">
                    Project Team
                  </span>
                  <div className="flex">
                    {[
                      {
                        name: "John",
                        initials: "J",
                        color: "primary" as const,
                      },
                      {
                        name: "Jane",
                        initials: "J",
                        color: "success" as const,
                      },
                      { name: "Bob", initials: "B", color: "warning" as const },
                      { name: "Alice", initials: "A", color: "info" as const },
                    ].map((user, index) => (
                      <Avatar
                        key={index}
                        color={user.color}
                        size="sm"
                        alt={user.name}
                        group
                        groupVariant="stack"
                        groupSpacing="normal"
                        groupIndex={index}
                        groupTotal={4}
                        clickable
                        onClick={() => handleAvatarClick(user.name)}
                      >
                        {user.initials}
                      </Avatar>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-blue-600">4 members</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-green-900">
                    Design Team
                  </span>
                  <div className="flex">
                    {[
                      {
                        name: "Sarah",
                        initials: "S",
                        color: "success" as const,
                      },
                      {
                        name: "Mike",
                        initials: "M",
                        color: "primary" as const,
                      },
                      {
                        name: "Lisa",
                        initials: "L",
                        color: "warning" as const,
                      },
                      { name: "David", initials: "D", color: "info" as const },
                      {
                        name: "Emma",
                        initials: "E",
                        color: "secondary" as const,
                      },
                    ].map((user, index) => (
                      <Avatar
                        key={index}
                        color={user.color}
                        size="sm"
                        alt={user.name}
                        group
                        groupVariant="stack"
                        groupSpacing="tight"
                        groupIndex={index}
                        groupTotal={5}
                        groupMax={4}
                        showGroupMore
                        onGroupMoreClick={() => handleAvatarClick("+1 more")}
                        clickable
                        onClick={() => handleAvatarClick(user.name)}
                      >
                        {user.initials}
                      </Avatar>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-green-600">5 members</span>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">Usage Instructions</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium text-blue-300 mb-2">Basic Usage:</h3>
              <pre className="bg-gray-800 p-3 rounded overflow-x-auto">
                {`// Simple avatar
<Avatar alt="User Avatar" />

// With custom content
<Avatar alt="John Doe">JD</Avatar>

// With image
<Avatar src="/path/to/image.jpg" alt="User Photo" />`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-green-300 mb-2">
                Advanced Features:
              </h3>
              <pre className="bg-gray-800 p-3 rounded overflow-x-auto">
                {`// With status and badge
<Avatar 
  status="online"
  badge="3"
  badgeColor="error"
  size="lg"
  alt="Online User"
/>

// Interactive avatar
<Avatar 
  clickable
  onClick={() => handleClick()}
  hoverEffect="scale"
  size="md"
  alt="Clickable Avatar"
/>

// Group avatars
<Avatar 
  group
  groupVariant="stack"
  groupSpacing="normal"
  groupIndex={0}
  groupTotal={4}
  alt="Team Member"
>
  JD
</Avatar>

// With max limit and show more
<Avatar 
  group
  groupVariant="stack"
  groupMax={4}
  showGroupMore
  onGroupMoreClick={() => handleMore()}
  alt="Team Member"
>
  +2
</Avatar>`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-yellow-300 mb-2">
                Group Variants:
              </h3>
              <pre className="bg-gray-800 p-3 rounded overflow-x-auto">
                {`// Stack variant (overlapping)
<Avatar group groupVariant="stack" groupSpacing="normal" />

// Grid variant (3-column layout)
<Avatar group groupVariant="grid" />

// List variant (vertical)
<Avatar group groupVariant="list" />

// Different spacing options
<Avatar group groupSpacing="tight" />    // -ml-2
<Avatar group groupSpacing="normal" />   // -ml-3
<Avatar group groupSpacing="loose" />    // -ml-4`}
              </pre>
            </div>
          </div>
        </div>

        {/* More Functionality Examples */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            "More" Functionality Examples
          </h2>

          {/* Large Team with More Button */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Large Team with More Button
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-blue-900">
                    Development Team (12 members)
                  </span>
                  <div className="flex">
                    {[
                      {
                        name: "John",
                        initials: "J",
                        color: "primary" as const,
                      },
                      {
                        name: "Jane",
                        initials: "J",
                        color: "success" as const,
                      },
                      { name: "Bob", initials: "B", color: "warning" as const },
                      { name: "Alice", initials: "A", color: "info" as const },
                      {
                        name: "Mike",
                        initials: "M",
                        color: "secondary" as const,
                      },
                      { name: "Sarah", initials: "S", color: "error" as const },
                    ].map((user, index) => (
                      <Avatar
                        key={index}
                        color={user.color}
                        size="sm"
                        alt={user.name}
                        group
                        groupVariant="stack"
                        groupSpacing="tight"
                        groupIndex={index}
                        groupTotal={12}
                        groupMax={6}
                        showGroupMore
                        onGroupMoreClick={() =>
                          handleMoreClick("Development Team", 6)
                        }
                        clickable
                        onClick={() => handleAvatarClick(user.name)}
                      >
                        {user.initials}
                      </Avatar>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-blue-600">12 members</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-green-900">
                    Design Team (8 members)
                  </span>
                  <div className="flex">
                    {[
                      {
                        name: "Lisa",
                        initials: "L",
                        color: "success" as const,
                      },
                      {
                        name: "David",
                        initials: "D",
                        color: "primary" as const,
                      },
                      {
                        name: "Emma",
                        initials: "E",
                        color: "warning" as const,
                      },
                      { name: "Chris", initials: "C", color: "info" as const },
                    ].map((user, index) => (
                      <Avatar
                        key={index}
                        color={user.color}
                        size="sm"
                        alt={user.name}
                        group
                        groupVariant="stack"
                        groupSpacing="normal"
                        groupIndex={index}
                        groupTotal={8}
                        groupMax={4}
                        showGroupMore
                        onGroupMoreClick={() =>
                          handleMoreClick("Design Team", 4)
                        }
                        clickable
                        onClick={() => handleAvatarClick(user.name)}
                      >
                        {user.initials}
                      </Avatar>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-green-600">8 members</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-purple-900">
                    QA Team (15 members)
                  </span>
                  <div className="flex">
                    {[
                      { name: "Tom", initials: "T", color: "primary" as const },
                      {
                        name: "Anna",
                        initials: "A",
                        color: "primary" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                      {
                        name: "Paul",
                        initials: "P",
                        color: "success" as const,
                      },
                    ].map((user, index) => (
                      <Avatar
                        key={index}
                        color={user.color}
                        size="sm"
                        alt={user.name}
                        group
                        groupVariant="stack"
                        groupSpacing="loose"
                        groupIndex={index}
                        groupTotal={15}
                        groupMax={3}
                        showGroupMore
                        onGroupMoreClick={() => handleMoreClick("QA Team", 12)}
                        clickable
                        onClick={() => handleAvatarClick(user.name)}
                      >
                        {user.initials}
                      </Avatar>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-purple-600">15 members</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              💡{" "}
              <strong>Hover over the "+" buttons to see them lift up!</strong>{" "}
              Click them to see console output. Open your browser's developer
              console (F12) to see the logged information.
            </p>
          </div>

          {/* Console Output Display */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Console Output Examples
            </h3>
            <div className="bg-gray-900 p-4 rounded-lg text-white">
              <p className="text-sm text-gray-300 mb-3">
                When you click the "+" buttons, you'll see in the console:
              </p>
              <div className="bg-gray-800 p-3 rounded text-sm font-mono space-y-1">
                <div className="text-green-400">
                  🔄 More clicked for [Team Name]
                </div>
                <div className="text-blue-400">
                  📊 Hidden members count: [Number]
                </div>
                <div className="text-yellow-400">
                  👥 Team: [Team Name] has [Number] hidden members
                </div>
                <div className="text-purple-400">
                  👤 Avatar clicked: [Member Name] (when clicking individual
                  avatars)
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-900 rounded text-yellow-100">
                <p className="text-sm font-medium">🔍 Debugging Tips:</p>
                <ul className="text-xs mt-2 space-y-1">
                  <li>• Press F12 to open Developer Tools</li>
                  <li>• Go to Console tab</li>
                  <li>• Make sure "All" or "Info" level is selected</li>
                  <li>• Click the "+" buttons to see logs</li>
                  <li>• Click individual avatars to see click logs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Implementation Guide */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Implementation Guide
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">
                  1. Basic Console Logging
                </h4>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {`const handleMoreClick = (teamName, hiddenCount, hiddenMembers) => {
  console.log(\`🔄 More clicked for \${teamName}\`);
  console.log(\`📊 Hidden members count: \${hiddenCount}\`);
  console.log('Hidden members:', hiddenMembers);
};`}
                </pre>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">
                  2. Modal Approach
                </h4>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {`const handleMoreClick = (teamName, hiddenCount, hiddenMembers) => {
  setShowModal(true);
  setSelectedTeam(teamName);
  setHiddenMembers(hiddenMembers);
};`}
                </pre>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">
                  3. Navigation Approach
                </h4>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {`const handleMoreClick = (teamName, hiddenCount, hiddenMembers) => {
  // Navigate to team page
  router.push(\`/teams/\${teamName.toLowerCase().replace(' ', '-')}\`);
  
  // Or open in new tab
  window.open(\`/teams/\${teamName.toLowerCase().replace(' ', '-')}\`, '_blank');
};`}
                </pre>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">
                  4. Analytics Tracking
                </h4>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {`const handleMoreClick = (teamName, hiddenCount, hiddenMembers) => {
  // Track analytics
  analytics.track('avatar_group_more_clicked', {
    team: teamName,
    hiddenCount,
    totalMembers: hiddenMembers.length + hiddenCount
  });
  
  // Your custom logic here
  console.log('Analytics tracked, handling more click...');
};`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Live Debug Logs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Live Debug Logs
          </h2>
          <div className="bg-gray-900 p-4 rounded-lg text-white">
            <p className="text-sm text-gray-300 mb-3">
              Recent actions (click the "+" buttons or avatars to see logs):
            </p>

            <div className="mt-3 text-xs text-gray-400">
              💡 This shows the same logs that appear in the browser console
              (F12 → Console tab)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarExample;
