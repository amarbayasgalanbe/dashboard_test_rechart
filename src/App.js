import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts";
import {
  Calculator,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  FileStack,
} from "lucide-react";

// --- MOCK DATA GENERATOR ---
const timeData = [
  {
    name: "Mon",
    invoices: 40,
    receipts: 24,
    orders: 20,
    processed: 70,
    failed: 5,
    draft: 9,
    pages: 120,
    submissions: 30,
  },
  {
    name: "Tue",
    invoices: 30,
    receipts: 13,
    orders: 22,
    processed: 50,
    failed: 2,
    draft: 13,
    pages: 100,
    submissions: 25,
  },
  {
    name: "Wed",
    invoices: 20,
    receipts: 98,
    orders: 22,
    processed: 130,
    failed: 10,
    draft: 10,
    pages: 250,
    submissions: 45,
  },
  {
    name: "Thu",
    invoices: 27,
    receipts: 39,
    orders: 20,
    processed: 80,
    failed: 4,
    draft: 2,
    pages: 140,
    submissions: 35,
  },
  {
    name: "Fri",
    invoices: 18,
    receipts: 48,
    orders: 21,
    processed: 75,
    failed: 8,
    draft: 5,
    pages: 130,
    submissions: 32,
  },
];

const statusByDoctype = [
  { name: "Invoices", processed: 400, failed: 20, draft: 40 },
  { name: "Receipts", processed: 300, failed: 15, draft: 30 },
  { name: "Orders", processed: 200, failed: 10, draft: 20 },
];

const avgTimeData = [{ name: "Avg Seconds", Document: 4.5, Page: 1.2 }];

// --- COMPONENTS ---

const Card = ({ title, children }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col h-[400px]">
    <h3 className="text-gray-700 font-semibold mb-4 flex justify-between items-center">
      {title}
      <span className="text-xs font-normal text-blue-500 cursor-pointer hover:underline">
        Fullscreen
      </span>
    </h3>
    <div className="flex-grow">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  </div>
);

const BillingTable = () => {
  const stats = {
    uploaded: 1540,
    failed: 40,
    draft: 100,
  };
  const processed = stats.uploaded - (stats.failed + stats.draft);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex items-center gap-3">
          <FileText className="text-blue-600" />
          <div>
            <p className="text-sm text-blue-600 font-medium">Total Uploaded</p>
            <p className="text-2xl font-bold">{stats.uploaded}</p>
          </div>
        </div>
      </div>
      <div className="bg-red-50 p-4 rounded-lg border border-red-100">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-red-600" />
          <div>
            <p className="text-sm text-red-600 font-medium">Total Failed</p>
            <p className="text-2xl font-bold">{stats.failed}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Calculator className="text-gray-600" />
          <div>
            <p className="text-sm text-gray-600 font-medium">Total Drafts</p>
            <p className="text-2xl font-bold">{stats.draft}</p>
          </div>
        </div>
      </div>
      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-600" />
          <div>
            <p className="text-sm text-green-600 font-medium">
              Total Processed
            </p>
            <p className="text-2xl font-bold">{processed}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Document Processing Analytics
        </h1>
        <p className="text-gray-500">
          Real-time submission and processing metrics
        </p>
      </header>

      {/* Billing Table Section */}
      <BillingTable />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Total Document Types (Stacked Column/Line) */}
        <Card title="Total Document Types">
          <BarChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [
                value,
                name.charAt(0).toUpperCase() + name.slice(1),
              ]}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend />
            <Bar
              dataKey="invoices"
              stackId="a"
              fill="#3b82f6"
              name="Invoices"
            />
            <Bar
              dataKey="receipts"
              stackId="a"
              fill="#60a5fa"
              name="Receipts"
            />
            <Bar dataKey="orders" stackId="a" fill="#93c5fd" name="Orders" />
          </BarChart>
        </Card>

        {/* 2. Total Documents (Stacked Bar) */}
        <Card title="Document Status by Doctype">
          <BarChart data={statusByDoctype} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="processed"
              stackId="status"
              fill="#10b981"
              name="Processed"
            />
            <Bar
              dataKey="failed"
              stackId="status"
              fill="#ef4444"
              name="Failed"
            />
            <Bar dataKey="draft" stackId="status" fill="#9ca3af" name="Draft" />
          </BarChart>
        </Card>

        {/* 3. Total Submission Status (Column Chart) */}
        <Card title="Total Submission Status">
          <BarChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="processed" fill="#10b981" name="Success" />
            <Bar dataKey="failed" fill="#ef4444" name="Failed" />
          </BarChart>
        </Card>

        {/* 5. Total Amounts (Line Chart) */}
        <Card title="Submission, Document & Page Amounts">
          <LineChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="submissions"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Submissions"
            />
            <Line
              type="monotone"
              dataKey="processed"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Documents"
            />
            <Line
              type="monotone"
              dataKey="pages"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Pages"
            />
          </LineChart>
        </Card>

        {/* 6. Average Processing Time (Bar Chart) */}
        <Card title="Average Processing Time (Seconds)">
          <BarChart data={avgTimeData} layout="vertical" margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" hide />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Legend />
            <Bar
              dataKey="Document"
              fill="#6366f1"
              barSize={40}
              radius={[0, 4, 4, 0]}
            />
            <Bar
              dataKey="Page"
              fill="#a855f7"
              barSize={40}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </Card>

        {/* 7. Total Document Pages (Stacked Area/Line Chart) */}
        <Card title="Pages Submitted by Doctype">
          <AreaChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="pages"
              stroke="#3b82f6"
              fill="#dbeafe"
              name="Total Pages"
            />
          </AreaChart>
        </Card>
      </div>
    </div>
  );
}
