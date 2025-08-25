import React, { useState } from "react";
import { ActionsDropdown } from "./actionsDropdown";
import { HiPencil, HiTrash, HiEye, HiStar, HiCog, HiUser } from "react-icons/hi";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
}

export const ActionsDropdownExample: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "active" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "active" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Moderator", status: "suspended" },
  ]);

  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const getUserActions = (user: User) => [
    {
      label: "View Profile",
      onClick: (row?: User) => alert(`Viewing profile for ${row?.name}`),
      icon: <HiEye className="w-4 h-4" />,
    },
    {
      label: "Edit User",
      onClick: (row?: User) => alert(`Editing user ${row?.name}`),
      icon: <HiPencil className="w-4 h-4" />,
    },
    { separator: true as const },
    {
      label: "Suspend User",
      onClick: (row?: User) => alert(`Suspending user ${row?.name}`),
      icon: <HiUser className="w-4 h-4" />,
      disabled: user.status === "suspended",
    },
    {
      label: "Delete User",
      onClick: (row?: User) => {
        if (confirm(`Delete ${row?.name}?`)) {
          setUsers(prev => prev.filter(u => u.id !== row?.id));
        }
      },
      icon: <HiTrash className="w-4 h-4" />,
      danger: true,
    },
  ];

  const getBasicActions = () => [
    {
      label: "Quick Action",
      onClick: () => alert("Quick action executed!"),
      icon: <HiStar className="w-4 h-4" />,
    },
    {
      label: "Loading Action",
      onClick: async () => {
        setLoadingAction("loading");
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert("Loading action completed!");
        setLoadingAction(null);
      },
      icon: <HiCog className="w-4 h-4" />,
      loading: loadingAction === "loading",
    },
    { separator: true as const },
    {
      label: "Disabled Action",
      onClick: () => {},
      icon: <HiStar className="w-4 h-4" />,
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ActionsDropdown Component Examples
          </h1>
          <p className="text-lg text-gray-600">
            A comprehensive showcase of the ActionsDropdown component
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Examples</h2>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Default Trigger</h3>
              <ActionsDropdown actions={getBasicActions()} />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Custom Button</h3>
              <ActionsDropdown
                actions={getBasicActions()}
                trigger={
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Menu
                  </button>
                }
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">User Management Table</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ActionsDropdown actions={getUserActions(user)} row={user} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">Usage Instructions</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium text-blue-300 mb-2">Basic Usage:</h3>
              <pre className="bg-gray-800 p-3 rounded overflow-x-auto">
{`const actions = [
  {
    label: "Edit",
    onClick: (row) => console.log("Editing:", row),
    icon: <HiPencil className="w-4 h-4" />
  },
  { separator: true },
  {
    label: "Delete",
    onClick: (row) => console.log("Deleting:", row),
    icon: <HiTrash className="w-4 h-4" />,
    danger: true
  }
];

<ActionsDropdown actions={actions} row={data} />`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionsDropdownExample;
