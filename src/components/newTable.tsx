import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ICategory } from "../config/interface";
import { Button } from "./button";

const NewTable = ({
  data,
  handleDelete,
}: {
  data: ICategory[];
  handleDelete: (id: string, name: string) => void;
}) => {
  return (
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
            className="hover:bg-primary-100 duration-150 cursor-pointer"
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
              <Button color="warning" type="button">
                <PencilIcon className="h-5 w-5" />
              </Button>
              <Button
                color="danger"
                type="button"
                onClick={() =>
                  handleDelete(item._id as string, item.name as string)
                }
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
  );
};

export default NewTable;
