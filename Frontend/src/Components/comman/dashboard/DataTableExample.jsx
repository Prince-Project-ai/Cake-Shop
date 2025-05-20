import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Download,
  FileText,
  // FilePdf, 
  FileSpreadsheet,
  FileJson,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  MoreHorizontal
} from 'lucide-react';

const DataTable = ({ title = 'Data Table', data = [], columns = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  // Calculate total pages based on filtered data
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [data, searchQuery]);

  // Sort data if sort config is set
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;

      const direction = sortConfig.direction === 'ascending' ? 1 : -1;

      return aValue > bValue ? direction : -direction;
    });
  }, [filteredData, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, sortedData.length);
  const currentPageData = sortedData.slice(startIndex, endIndex);

  // Request sort
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get sort direction icon
  const getSortDirectionIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <ArrowUpDown className="w-4 h-4 ml-1" />;
    }
    return sortConfig.direction === 'ascending' ?
      <ArrowUp className="w-4 h-4 ml-1" /> :
      <ArrowDown className="w-4 h-4 ml-1" />;
  };

  // Handle page change
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle export
  const handleExport = (type) => {
    // Here you would implement the actual export functionality
    console.log(`Exporting as ${type}:`, sortedData);
    setIsExportMenuOpen(false);
  };

  // Toggle row selection
  const toggleRowSelection = (id) => {
    setSelectedRows(prev => {
      if (prev.includes(id)) {
        return prev.filter(rowId => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Toggle all rows selection
  const toggleAllRows = () => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentPageData.map(row => row.id));
    }
    setIsAllSelected(!isAllSelected);
  };

  // Update all selected state when current page changes
  useEffect(() => {
    setIsAllSelected(currentPageData.length > 0 && currentPageData.every(row => selectedRows.includes(row.id)));
  }, [currentPage, currentPageData, selectedRows]);

  return (
    <div className="bg-white border-2 border-light text-sm rounded-lg overflow-hidden w-full max-w-7xl mx-auto">
      <div className="border-b-2 p-4 border-light flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-primary-dark">{title}</h2>
          <p className="text-gray-500 mt-1">Showing {startIndex + 1} to {endIndex} of {sortedData.length} entries</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
          {/* Search box */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Export dropdown */}
          <div className="relative">
            <button
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-button transition-colors"
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
            >
              <Download className="h-5 w-5" />
              <span>Export</span>
            </button>

            {isExportMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 animate-pop">
                <ul className="py-2">
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => handleExport('csv')}
                    >
                      <FileSpreadsheet className="h-5 w-5 text-green-600" />
                      <span>CSV</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => handleExport('excel')}
                    >
                      <FileSpreadsheet className="h-5 w-5 text-green-800" />
                      <span>Excel</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => handleExport('pdf')}
                    >
                      <FilePdf className="h-5 w-5 text-red-600" />
                      <span>PDF</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => handleExport('print')}
                    >
                      <FileText className="h-5 w-5 text-gray-700" />
                      <span>Print</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => handleExport('json')}
                    >
                      <FileJson className="h-5 w-5 text-blue-600" />
                      <span>JSON</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Settings button */}
          <button
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-button transition-colors"
            aria-label="Table settings"
          >
            <Settings className="h-5 w-5" />
          </button>

          {/* Filter button */}
          <button
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-button transition-colors"
            aria-label="Filter data"
          >
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg px-4 ">
        <table className="min-w-full divide-y divide-gray-200 border-2 border-light">
          <thead className="bg-light">
            <tr>
              {columns.map((column) => (  
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-primary-dark uppercase tracking-wider cursor-pointer hover:text-accent"
                  onClick={() => requestSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.label}
                    {getSortDirectionIcon(column.key)}
                  </div>
                </th>
              ))}
              <th scope="col" className="px-6 py-3 text-right">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPageData.length > 0 ? (
              currentPageData.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={`hover:bg-gray-50 ${selectedRows.includes(row.id) ? 'bg-purple-50' : ''}`}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                      {row[column.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-accent">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 2} className="px-6 py-12 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 px-4 pb-4 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Rows per page:</span>
          <select
            className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-accent"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when changing rows per page
            }}
          >
            {[5, 10, 25, 50, 100].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
            aria-label="First page"
          >
            <ChevronsLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center">
            <span className="mx-2 text-sm text-gray-700">
              Page {totalPages > 0 ? currentPage : 0} of {totalPages}
            </span>
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`p-2 rounded-md ${currentPage === totalPages || totalPages === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`p-2 rounded-md ${currentPage === totalPages || totalPages === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
            aria-label="Last page"
          >
            <ChevronsRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Usage example component
const DataTableExample = () => {
  // Sample data
  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2025-05-18' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2025-05-19' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2025-04-25' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'User', status: 'Active', lastLogin: '2025-05-15' },
    { id: 5, name: 'David Brown', email: 'david@example.com', role: 'Admin', status: 'Active', lastLogin: '2025-05-17' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'Editor', status: 'Active', lastLogin: '2025-05-10' },
    { id: 7, name: 'Daniel Wilson', email: 'daniel@example.com', role: 'User', status: 'Inactive', lastLogin: '2025-04-30' },
    { id: 8, name: 'Olivia Taylor', email: 'olivia@example.com', role: 'User', status: 'Active', lastLogin: '2025-05-12' },
    { id: 9, name: 'James Moore', email: 'james@example.com', role: 'Editor', status: 'Active', lastLogin: '2025-05-14' },
    { id: 10, name: 'Sophia Anderson', email: 'sophia@example.com', role: 'Admin', status: 'Active', lastLogin: '2025-05-16' },
    { id: 11, name: 'Benjamin Thomas', email: 'benjamin@example.com', role: 'User', status: 'Active', lastLogin: '2025-05-18' },
    { id: 12, name: 'Isabella Martin', email: 'isabella@example.com', role: 'User', status: 'Inactive', lastLogin: '2025-05-01' },
    { id: 13, name: 'William White', email: 'william@example.com', role: 'Editor', status: 'Active', lastLogin: '2025-05-09' },
    { id: 14, name: 'Mia Harris', email: 'mia@example.com', role: 'User', status: 'Active', lastLogin: '2025-05-11' },
    { id: 15, name: 'Alexander Clark', email: 'alexander@example.com', role: 'Admin', status: 'Active', lastLogin: '2025-05-13' },
  ];

  // Table columns configuration
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'lastLogin', label: 'Last Login' },
  ];

  return (
    <div className="">
      <p>Product Management</p>
      <DataTable
        title="Users Management"
        data={sampleData}
        columns={columns}
      />
    </div>
  );
};

export default DataTableExample;