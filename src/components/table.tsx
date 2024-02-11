import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ICategory, IProduct } from "../config/interface";
import { Button } from "./button";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ConfirmationModal, EditCategoryModal } from "./modal";

export const TableProducts = ({
  data,
  handleDelete,
}: {
  data: IProduct[];
  handleDelete: (id: string) => void;
}) => {
  const navigate = useNavigate();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<IProduct>({} as IProduct);

  const confirmDelete = () => {
    console.log("confirm delete : ", itemSelected);
    handleDelete(itemSelected._id!);
    setIsConfirmationModalOpen(false);
  };

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // const totalPages = Math.ceil(products.length / itemsPerPage);

  // const handlePageChange = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // };
  // console.log("data : ", data);
  return (
    <>
      <table className="min-w-full divide-y divide-dark-300 table-fixed">
        <thead className="border-y border-dark-300 text-left">
          <tr className="cursor-pointer">
            <th scope="col" className="py-3 pl-6 w-1/12">
              ID
            </th>
            <th scope="col" className="py-3 w-5/12">
              Name
            </th>
            <th scope="col" className="py-3 w-2/12">
              Category
            </th>
            <th scope="col" className="py-3 w-1/12 text-center">
              Stock
            </th>
            <th scope="col" className="py-3 w-1/12 text-center">
              Status
            </th>
            <th scope="col" className="py-3 w-2/12 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-dark-300">
          {data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-primary-light duration-150 cursor-pointer"
            >
              <td className="py-3 pl-6 whitespace-nowrap text-dark">
                {index + 1}
              </td>
              <td className="py-3 whitespace-nowrap font-medium text-dark">
                <Link to={`/products/detail/${item._id}`}>
                  <div className="flex items-center hover:underline duration-150">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-8 h-8 rounded-lg mr-5"
                    />
                    <p className="truncate w-full max-w-[300px]">{item.name}</p>
                  </div>
                </Link>
              </td>
              <td className="py-3 whitespace-nowrap font-medium text-dark-500">
                {item.category}
              </td>
              <td className="py-3 whitespace-nowrap font-medium text-dark text-center">
                {item.stock}
              </td>
              <td
                className={`py-3 whitespace-nowrap font-medium capitalize text-center ${
                  item.status === "active" ? "text-success" : "text-danger"
                }`}
              >
                {item.status}
              </td>
              <td className="py-3 whitespace-nowrap font-medium flex gap-2 justify-center">
                <Button
                  color="warning"
                  type="button"
                  onClick={() => navigate(`/products/detail/${item._id}`)}
                >
                  <PencilIcon className="h-5 w-5" />
                </Button>
                <Button
                  color="danger"
                  type="button"
                  onClick={() => (
                    setIsConfirmationModalOpen(true), setItemSelected(item)
                  )}
                >
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="border-y border-dark-300">
          <tr></tr>
        </tfoot>
      </table>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={confirmDelete}
        title={"Are you sure you want to delete this product?"}
        description={itemSelected.name}
      />
      {/* <div className="flex justify-center items-center mt-4 gap-5">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={
            "text-dark duration-100" +
            (currentPage === 1 ? " opacity-50" : " hover:text-primary")
          }
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={
            "text-dark duration-100" +
            (currentPage === totalPages ? " opacity-50" : " hover:text-primary")
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div> */}
    </>
  );
};

export const TableCategories = ({
  data,
  handleDelete,
  handleUpdate,
}: {
  data: ICategory[];
  handleDelete: (id: string) => void;
  handleUpdate: (category: ICategory) => void;
}) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] =
    useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<ICategory>({
    name: "",
    status: "",
  });

  const confirmDelete = () => {
    handleDelete(itemSelected._id!);
    setIsConfirmationModalOpen(false);
  };

  const confirmEdit = (category: ICategory) => {
    console.log("confirm edit : ", category);
    handleUpdate(category);
    setIsEditCategoryModalOpen(false);
  };

  return (
    <>
      <table className="min-w-full divide-y divide-dark-300 table-fixed">
        <thead className="border-y border-dark-300 text-left">
          <tr className="cursor-pointer">
            <th scope="col" className="py-3 pl-6 w-1/12">
              ID
            </th>
            <th scope="col" className="py-3 w-5/12">
              Name
            </th>
            <th scope="col" className="py-3 w-1/4 text-center">
              Status
            </th>
            <th scope="col" className="py-3 w-1/4 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-dark-300">
          {data.map((item, index) => (
            <tr
              key={item._id}
              className="hover:bg-primary-light duration-150 cursor-pointer "
            >
              <td className="py-3 pl-6 whitespace-nowrap text-dark">
                {index + 1}
              </td>
              <td className="py-3 whitespace-nowrap font-medium text-gray-900">
                {item.name}
              </td>
              <td
                className={`py-3 whitespace-nowrap font-medium capitalize text-center ${
                  item.status === "active" ? "text-success" : "text-danger"
                }`}
              >
                {item.status}
              </td>
              <td className="py-3 whitespace-nowrap font-medium flex gap-2 justify-center">
                <Button
                  color="warning"
                  type="button"
                  onClick={() => (
                    setIsEditCategoryModalOpen(true), setItemSelected(item)
                  )}
                >
                  <PencilIcon className="h-5 w-5" />
                </Button>
                <Button
                  color="danger"
                  type="button"
                  onClick={() => (
                    setIsConfirmationModalOpen(true), setItemSelected(item)
                  )}
                >
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="border-y border-dark-300">
          <tr></tr>
        </tfoot>
      </table>
      <EditCategoryModal
        isOpen={isEditCategoryModalOpen}
        onClose={() => setIsEditCategoryModalOpen(false)}
        onSave={confirmEdit}
        title={"Edit Category"}
        defaultValue={itemSelected}
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={confirmDelete}
        title={"Are you sure you want to delete this category?"}
        description={itemSelected.name}
      />
    </>
  );
};
