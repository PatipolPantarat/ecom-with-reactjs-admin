import ContentBox from "../../components/contentBox";
import { Button } from "../../components/button";
import { Search } from "../../components/search";
import { useEffect, useState } from "react";
import { Input } from "../../components/input";
import { ICategory } from "../../config/interface";
import { RadioButton } from "../../components/radioButton";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ProductService from "../../services/productservice";
import { TableCategories } from "../../components/table";
import { useLocation } from "react-router-dom";

export default function Categories() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchParams = params.get("search") || "";
  const [form, setForm] = useState<ICategory>({
    name: "",
    status: "",
  });
  const [categoryList, setCategoryList] = useState<ICategory[]>([
    {
      _id: "",
      name: "",
      status: "",
    },
  ]);
  const handleRefresh = () => {
    setForm({
      name: "",
      status: "",
    });
    fetchCategoryList(searchParams);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, name: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.status) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await ProductService.createCategory(form);
      setForm({ name: "", status: "" });
      handleRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategoryList = async (searchParams?: string) => {
    try {
      const response = await ProductService.getAllCategories(searchParams);
      setCategoryList(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategoryList(searchParams);
  }, [searchParams]);

  const handleUpdate = async (category: ICategory) => {
    try {
      await ProductService.updateCategory(category._id!, category);
      handleRefresh();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await ProductService.deleteCategory(id);
      handleRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContentBox>
      <div className="flex gap-10 items-center">
        <Search />
        <div>
          <Button color="secondary" onClick={handleRefresh} type="button">
            Refresh
          </Button>
        </div>
      </div>
      <div className="my-5 py-5 border-y border-dark-300 duration-100">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-5">
            <div className="flex items-center gap-5">
              <h1 className="font-medium text-dark">Name</h1>
              <Input
                type="text"
                name="name"
                onChange={handleChange}
                value={form.name}
                required
              />
            </div>
            <div className=" flex items-center gap-5">
              <h1 className="font-medium text-dark">Status</h1>
              <RadioButton
                name="status"
                options={[
                  {
                    label: "Active",
                    value: "active",
                    icon: <CheckIcon className="h-5 w-5 text-success" />,
                  },
                  {
                    label: "Inactive",
                    value: "inactive",
                    icon: <XMarkIcon className="h-5 w-5 text-danger" />,
                  },
                ]}
                selectedValue={form.status}
                setSelectedValue={(value) =>
                  setForm({ ...form, status: value })
                }
              />
            </div>
            <Button color="success" type="submit">
              Add
            </Button>
          </div>
        </form>
      </div>
      <div className="mt-5">
        <TableCategories
          data={categoryList}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>
    </ContentBox>
  );
}
