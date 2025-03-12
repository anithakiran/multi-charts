"use client";

import { useState } from "react";
import Link from "next/link";

// Define types for DropdownMenu props
interface DropdownMenuProps {
  title: string;
  links: { href: string; label: string }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2 w-full text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-75"
      >
        <span className="flex-1 ml-3 text-left">{title}</span>
        <svg
          className={`w-6 h-6 transform ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <ul className="pl-6 space-y-2">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="block p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const SideBar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="sm:hidden p-2 m-2 bg-gray-800 text-white rounded-md"
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-50 dark:bg-gray-800 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/"
                className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>

            <DropdownMenu
              title="Pages"
              links={[
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ]}
            />

            <DropdownMenu
              title="Sales"
              links={[
                { href: "/orders", label: "Orders" },
                { href: "/invoices", label: "Invoices" },
              ]}
            />

            <li>
              <Link
                href="/emails"
                className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span className="ml-3">Emails</span>
                <span className="ml-auto inline-flex justify-center items-center w-5 h-5 text-xs font-semibold rounded-full bg-primary-100 text-primary-800 dark:bg-primary-200 dark:text-primary-800">
                  6
                </span>
              </Link>
            </li>

            <DropdownMenu
              title="Analytics"
              links={[
                { href: "/reports", label: "Reports" },
                { href: "/performance", label: "Performance" },
              ]}
            />
          </ul>

          {/* Secondary Links */}
          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <Link
                href="/calendar"
                className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span className="ml-3">Calendar</span>
              </Link>
            </li>
            <li>
              <Link
                href="/receipts"
                className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span className="ml-3">Receipts</span>
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span className="ml-3">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
