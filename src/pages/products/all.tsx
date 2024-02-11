import ContentBox from "../../components/contentBox";
import { Button } from "../../components/button";
import { SelectOptions, DropdownOptions } from "../../components/select";
import { TableProducts } from "../../components/table";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Search } from "../../components/search";
import { useState, useEffect } from "react";
import ProductService from "../../services/productservice";
import { ICategory, IProduct } from "../../config/interface";
import { Outlet } from "react-router-dom";

export default function Products() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchParams = params.get("search") || "";

  const [productsList, setProductsList] = useState<IProduct[]>([
    {
      name: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      thumbnail: "",
      images: ["image1", "image2", "image3"],
      status: "",
    },
  ]);

  const handleRefresh = () => {
    fetchProductsList(searchParams);
  };

  const fetchProductsList = async (searchParams?: string) => {
    try {
      const response = await ProductService.getAllProducts(searchParams);
      setProductsList(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProductsList(searchParams);
  }, [searchParams]);

  const handleDelete = (id: string) => {
    ProductService.deleteProduct(id)
      .then(() => {
        handleRefresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const [categoryList, setCategoryList] = useState<ICategory[]>();
  // useEffect(() => {
  //   const fetchCategoryList = async () => {
  //     try {
  //       const response = await ProductService.getAllCategories();
  //       setCategoryList([
  //         ...categoryList,
  //         ...response.map((item: ICategory) => {
  //           return { name: item.name, value: item.value };
  //         }),
  //       ]);
  //       console.log("response : ", response);
  //       console.log("categoryList : ", categoryList);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchCategoryList();
  // }, []);
  return (
    <ContentBox>
      <div className="flex gap-10 items-center">
        <Search />

        {/* <div className="flex">
          <SelectOptions options={categoryList} className="w-full max-w-xs" />
        </div> */}

        {/* <div className="flex">
          <SelectOptions options={inventory} className="w-full max-w-xs" />
        </div> */}
        {/* <div className="flex">
          <SelectOptions options={options} className="w-full max-w-xs" />
        </div> */}
        <div>
          <Button color="secondary" onClick={handleRefresh} type="button">
            Refresh
          </Button>
        </div>
        <div>
          <Button color="primary" type="button">
            <Link to="/products/add">Add Product</Link>
          </Button>
        </div>
      </div>
      <div className="mt-5">
        <TableProducts data={productsList} handleDelete={handleDelete} />
      </div>
    </ContentBox>
  );
}
