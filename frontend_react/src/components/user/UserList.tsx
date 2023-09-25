import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import { TbTrashX } from "react-icons/tb";
import Input from "../shared/Input";
import { useGetAllUsersQuery } from "../../hooks/userHooks";
import Loading from "../shared/Loading";
import { User } from "../../types/user";
import DeleteUserModal from "./DeleteUserModal";
import UserFormModal from "./UserFormModal";
import { useTokenContext } from "../../context/TokenContext";

interface UserListProps {
  searchText: string;
  setSearchText: (val: string) => void;
  columns: string[];
  setColumns: (val: string[]) => void;
}

const UserList: React.FC<UserListProps> = ({
  searchText,
  setSearchText,
  columns,
  setColumns,
}) => {
  const tokenContext = useTokenContext();
  const { data, isLoading, error, refetch } = useGetAllUsersQuery(
    tokenContext.token
  );

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [searchFilters, setSearchFilters] = useState<{ [key: string]: string }>(
    {}
  );

  const itemsPerPage = 5;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const reloadUserData = () => {
    refetch();
  };

  useEffect(() => {
    reloadUserData();
    console.log("selected user", selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    console.log("useEffect is running");
    console.log("data", data);
    // Dynamically fetch columns from data
    if (data && data.length > 0) {
      const firstUser = data[0];
      const userColumns = Object.keys(firstUser);
      // Excluding unwanted columns
      const columnsToExclude = ["id", "role", "createdAt", "updatedAt"];
      const filteredColumns = userColumns.filter(
        (column) => !columnsToExclude.includes(column)
      );
      setColumns(filteredColumns);
      // Initialize searchFilters with empty values for each column
      const initialFilters = {};
      filteredColumns.forEach((column) => {
        initialFilters[column] = "";
      });
      setSearchFilters(initialFilters);
    }
  }, [data]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSort = (
    column: string,
    event: React.MouseEvent<HTMLTableHeaderCellElement>
  ) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
  };

  const clearFilters = () => {
    setSearchText("");
    const clearedFilters = {};
    Object.keys(searchFilters).forEach((key) => {
      clearedFilters[key] = "";
    });

    const dropdown = document.getElementById("filterStatus");
    if (dropdown) {
      dropdown.value = "";
    }

    setSearchFilters(clearedFilters);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error("Something went wrong");
  }

  const filteredData = data
    .filter((user: User) => {
      // Filter based on searchText
      if (searchText) {
        return Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase())
        );
      }
      return true; // Return all data if search Text is empty
    })
    .filter((user: User) => {
      // Filter based on searchFilters
      return Object.keys(searchFilters).every((param) =>
        String(user[param])
          .toLowerCase()
          .includes(searchFilters[param].toLowerCase())
      );
    })
    .sort((a: User, b: User) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      const multiplier = sortOrder === "asc" ? 1 : -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * multiplier;
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * multiplier;
      } else if (typeof aValue === "boolean" && typeof bValue === "boolean") {
        return (aValue - bValue) * multiplier;
      }

      return 0;
    });

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      <div className="flex items-start justify-end">
        <button
          className="px-2 py-1 bg-green-500 text-white rounded"
          onClick={() => {
            clearFilters();
          }}
        >
          Clear Filters
        </button>
      </div>

      <div className="relative mt-4 overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-black">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="border border-black p-3 bg-green-500"
                  onClick={(e) => handleSort(column, e)}
                >
                  <div className="flex items-center justify-between">
                    {column.charAt(0).toUpperCase() + column.slice(1)}{" "}
                    {sortColumn === column && sortOrder === "asc" && "↑"}
                    {sortColumn === column && sortOrder === "desc" && "↓"}
                  </div>
                  <div className="relative">
                    {column === "status" ? ( // if column is status
                      <select
                        id="filterStatus"
                        defaultValue={searchFilters[column]}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                        onChange={(e) =>
                          setSearchFilters({
                            ...searchFilters,
                            [column]:
                              e.target.value === "active" ? "true" : "false",
                          })
                        }
                        className="w-full p-1 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none text-black"
                      >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    ) : (
                      <>
                        <input
                          placeholder={`Filter ${column}`}
                          value={searchFilters[column]}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                          onChange={(e) =>
                            setSearchFilters({
                              ...searchFilters,
                              [column]: e.target.value,
                            })
                          }
                          className="w-full p-1 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none text-black"
                        />
                        {searchFilters[column] && (
                          <span
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-black"
                            onClick={() => {
                              setSearchFilters({
                                ...searchFilters,
                                [column]: "",
                              });
                            }}
                          >
                            &#10006; {/* "✖" symbol */}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </th>
              ))}
              <th className="border border-black p-3 bg-green-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1}>
                  {filteredData.length === 0 ? (
                    <div className="flex justify-between items-center">
                      <span>No records found</span>
                      <button
                        className="px-2 py-1 bg-green-500 text-white rounded"
                        onClick={() => {
                          clearFilters();
                        }}
                      >
                        Clear Filters
                      </button>
                    </div>
                  ) : (
                    "No records found."
                  )}
                </td>
              </tr>
            ) : (
              displayedData.map((user: User) => (
                <tr key={user["id"]}>
                  {columns.map((column) => (
                    <td key={column} className="border border-slate-700 p-3">
                      {column === "status" ? (
                        user[column] ? (
                          <div className="w-fit h-fit px-3 py-1 bg-green-300 text-white-700 text-sm font-medium rounded-full flex justify-center items-center border-b-0">
                            Active
                          </div>
                        ) : (
                          <div className="w-fit h-fit px-3 py-1 bg-red-600 text-white-700 text-sm font-medium rounded-full flex justify-center items-center">
                            Inactive
                          </div>
                        )
                      ) : (
                        user[column]
                      )}
                    </td>
                  ))}
                  <td className="border border-slate-700 p-3">
                    <div className="flex justify-center gap-2">
                      <div
                        onClick={() => {
                          setSelectedUser(user);
                          setIsFormOpen(true);
                        }}
                        className="bg-green-300 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
                      >
                        <AiOutlineEdit className="text-white-700 font-bold text-center text-xl" />
                      </div>
                      <div
                        onClick={() => {
                          setSelectedUser(user);
                          setIsDeleteOpen(true);
                        }}
                        className="bg-red-700 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
                      >
                        <TbTrashX className="text-white-700 font-bold text-center text-xl" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            className={`px-2 py-1 cursor-pointer border rounded ${
              currentPage === 0
                ? "bg-slate-300 text-black-500"
                : "bg-green-300 text-black"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>

          <ul className="pagination flex">
            {Array.from({ length: pageCount }).map((_, index) => {
              const isCurrentPage = index === currentPage;
              const isEllipsis =
                index > 0 && index < pageCount - 1 && !isCurrentPage;

              if (isEllipsis) {
                return (
                  <li key={index} className="px-2 py-1 cursor-pointer">
                    ...
                  </li>
                );
              }

              return (
                <li
                  key={index}
                  className={`px-2 py-1 cursor-pointer border rounded ${
                    isCurrentPage
                      ? "bg-green-300 text-black"
                      : "bg-slate-300 text-black-500"
                  }`}
                  onClick={() => handlePageChange(index)}
                >
                  {index + 1}
                </li>
              );
            })}
          </ul>

          <button
            className={`px-2 py-1 cursor-pointer border rounded ${
              currentPage === pageCount - 1
                ? "bg-slate-300 text-black-500"
                : "bg-green-300 text-black"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount - 1}
          >
            Next
          </button>
        </div>
        {columns &&
          columns.length > 0 && ( // render only if columns are present
            <UserFormModal
              user={selectedUser}
              isOpen={isFormOpen}
              columns={columns}
              handleClose={handleFormClose}
            />
          )}
        <DeleteUserModal
          user={selectedUser}
          isOpen={isDeleteOpen}
          handleClose={handleDeleteClose}
        />
      </div>
    </>
  );
};

export default UserList;
