import { useNavigate, useParams } from "react-router-dom";
import ContentBox from "../../components/contentBox";
import { Input, TextArea } from "../../components/input";
import { useEffect, useState } from "react";
import { IProduct, IProductFormError } from "../../config/interface";
import { Button } from "../../components/button";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ProductService from "../../services/productservice";
import { AlertModal } from "../../components/modal";
import { RadioButton } from "../../components/radioButton";
import { ListBox } from "../../components/listBox";
import { Loading } from "../../components/loading";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoriesList, setCategoriesList] = useState<string[]>([""]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<IProductFormError>({});
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [defaultValue, setDefaultValue] = useState<IProduct>({
  //   name: "",
  //   description: "",
  //   price: 0,
  //   category: "",
  //   stock: 0,
  //   thumbnail: "",
  //   images: [
  //     "https://picsum.photos/100",
  //     "https://picsum.photos/200",
  //     "https://picsum.photos/300",
  //   ],
  //   status: "",
  // });
  const [editedForm, setEditedForm] = useState<IProduct>({} as IProduct);

  useEffect(() => {
    const fetchProductById = async (id: string) => {
      setIsLoading(true);
      try {
        await ProductService.getProductById(id).then((response) => {
          console.log("response : ", response);
          setEditedForm(response);
        });
        setIsLoading(false);
      } catch (error) {
        console.log("error : ", error);
      }
    };

    fetchProductById(id!);
  }, [id]);

  const validateForm = (values: IProduct): IProductFormError => {
    const errors: IProductFormError = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    if (!values.price) {
      errors.price = "Price is required";
    } else {
      if (values.price <= 0) {
        errors.price = "Price must be greater than 0";
      }
    }
    if (!values.category) {
      errors.category = "Category is required";
    }
    if (!values.stock) {
      errors.stock = "Stock is required";
    } else {
      if (values.stock <= 0) {
        errors.stock = "Stock must be greater than 0";
      }
    }
    if (!values.thumbnail) {
      errors.thumbnail = "Thumbnail is required";
    }
    if (!values.images.length) {
      errors.images = "Images is required";
    }
    if (!values.status) {
      errors.status = "Status is required";
    }
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // console.log("editedForm before convert :", editedForm);
    const errors = validateForm(editedForm);

    if (Object.keys(errors).length > 0) {
      console.log("Form errors :", errors);
      setIsAlertModalOpen(true);
      setFormErrors(errors);
      return;
    } else {
      setIsAlertModalOpen(false);
      setFormErrors({});
    }
    const formData = convertProductToFormData(editedForm);
    // console.log("formData after convert : ", formData);
    try {
      // console.log("editedForm id :", editedForm._id);
      await ProductService.updateProduct(editedForm._id!, formData).then(() => {
        navigate("/products");
      });
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedForm({ ...editedForm, [name]: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setEditedForm({ ...editedForm, thumbnail: reader.result as string });
      }
    };
    reader.readAsDataURL(file);

    setThumbnail(file);
  };

  const handleImageRemove = () => {
    setEditedForm({ ...editedForm, thumbnail: "" });
  };
  const handleBack = () => {
    navigate("/products");
  };

  const convertProductToFormData = (product: IProduct) => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("stock", String(product.stock));
    if (thumbnail) {
      formData.append("thumbnail", thumbnail, thumbnail.name);
    }
    // formData.append("images", JSON.stringify(product.images));
    product.images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("price", String(product.price));
    formData.append("description", product.description);
    formData.append("status", product.status);
    return formData;
  };

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        ProductService.getActiveCategories().then((response) => {
          setCategoriesList(response.map((category) => category.name));
        });
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchAllCategories();
  }, []);

  return (
    <>
      {" "}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
          >
            <div className="grid gap-5">
              <div className="grid grid-cols-3 gap-5">
                <div className="col-span-2">
                  <div className="grid grid-rows-1 gap-5">
                    <ContentBox className="h-fit">
                      <div>
                        <h1 className="font-medium mb-3 text-dark">Name</h1>
                        <Input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          value={editedForm.name}
                        />
                        {formErrors.name && (
                          <p className="text-danger">{formErrors.name}</p>
                        )}
                      </div>
                      <div className="mt-5">
                        <h1 className="font-medium mb-3 text-dark">
                          Description
                        </h1>
                        <TextArea
                          name="description"
                          onChange={(e) =>
                            setEditedForm({
                              ...editedForm,
                              description: e.target.value,
                            })
                          }
                          value={editedForm.description}
                        />
                        {formErrors.description && (
                          <p className="text-danger">
                            {formErrors.description}
                          </p>
                        )}
                      </div>
                    </ContentBox>
                    {/* <ContentBox className="h-fit">
                  <div>
                    <h1 className="font-medium mb-3 text-dark">Images</h1>
                    <div className="grid grid-flow-col auto-cols-max gap-5">
                      <img
                        src="https://picsum.photos/200"
                        alt="#"
                        className="h-20 w-20 border border-dark-300 rounded-md"
                      />
                    </div>
                    {formErrors.images && (
                      <p className="text-danger">{formErrors.images}</p>
                    )}
                  </div>
                </ContentBox> */}
                    <ContentBox className="h-fit flex justify-between gap-5">
                      <div className="w-full">
                        <h1 className="font-medium mb-3 text-dark">Stock</h1>
                        <Input
                          type="number"
                          name="stock"
                          onChange={handleChange}
                          value={`${editedForm.stock}`}
                        />
                        {formErrors.stock && (
                          <p className="text-danger">{formErrors.stock}</p>
                        )}
                      </div>
                      <div className="w-full">
                        <h1 className="font-medium mb-3 text-dark">Price</h1>
                        <Input
                          type="number"
                          name="price"
                          onChange={handleChange}
                          value={`${editedForm.price}`}
                        />
                        {formErrors.price && (
                          <p className="text-danger">{formErrors.price}</p>
                        )}
                      </div>
                    </ContentBox>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="grid grid-rows-1 gap-5">
                    <ContentBox className="h-fit">
                      <div>
                        <h1 className="font-medium mb-3 text-dark">Status</h1>
                        <RadioButton
                          name="status"
                          options={[
                            {
                              label: "Active",
                              value: "active",
                              icon: (
                                <CheckIcon className="h-6 w-6 text-success" />
                              ),
                            },
                            {
                              label: "Inactive",
                              value: "inactive",
                              icon: (
                                <XMarkIcon className="h-6 w-6 text-danger" />
                              ),
                            },
                          ]}
                          selectedValue={editedForm.status}
                          setSelectedValue={(e) => (
                            setEditedForm({ ...editedForm, status: e }),
                            console.log(e)
                          )}
                        />
                        {formErrors.status && (
                          <p className="text-danger">{formErrors.status}</p>
                        )}
                      </div>
                      <div className="mt-5">
                        <h1 className="font-medium mb-3 text-dark">Category</h1>
                        <ListBox
                          name="category"
                          options={categoriesList}
                          selectedValue={editedForm.category}
                          setSelectedValue={(e) => (
                            setEditedForm({ ...editedForm, category: e }),
                            console.log(e)
                          )}
                        />
                        {formErrors.category && (
                          <p className="text-danger">{formErrors.category}</p>
                        )}
                      </div>
                    </ContentBox>
                    <ContentBox className="h-fit">
                      <div>
                        <h1 className="font-medium mb-3 text-dark">
                          Thumbnail
                        </h1>
                        <div className="border border-dark-300 rounded-lg w-full h-full aspect-square">
                          <Input
                            type="file"
                            id="file-input"
                            name="thumbnail"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            // required
                          />
                          {editedForm.thumbnail ? (
                            <img
                              src={editedForm.thumbnail}
                              alt="#"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <label className="flex justify-center items-center h-full text-dark-400 font-medium">
                              Empty
                            </label>
                          )}
                        </div>
                        <div className="mt-4 flex gap-5 justify-between">
                          <Button
                            color="danger"
                            type="button"
                            onClick={handleImageRemove}
                            disabled={!editedForm.thumbnail}
                          >
                            Del
                          </Button>
                          <Button
                            color="primary"
                            type="button"
                            onClick={() =>
                              document.getElementById("file-input")?.click()
                            }
                          >
                            Upload
                          </Button>
                        </div>
                        {formErrors.thumbnail && (
                          <p className="text-danger">{formErrors.thumbnail}</p>
                        )}
                      </div>
                    </ContentBox>
                  </div>
                </div>
              </div>
              <div>
                <ContentBox className="h-fit gap-5 flex justify-evenly">
                  <Button
                    color="danger"
                    className="w-1/4"
                    type="button"
                    onClick={handleBack}
                  >
                    Cancel
                  </Button>
                  <Button color="success" className="w-1/4" type="submit">
                    Save
                  </Button>
                </ContentBox>
              </div>
            </div>
          </form>
          <AlertModal
            isOpen={isAlertModalOpen}
            onClose={() => setIsAlertModalOpen(false)}
            title={"Alert Message"}
            description={"Please fill all required fields"}
          />
        </>
      )}
    </>
  );
}
