import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { Button } from "./button";
import { ICategory } from "../config/interface";
import { Input } from "./input";
import { RadioButton } from "./radioButton";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-dark">{description}</p>
                </div>
                <div className="mt-4 flex justify-end gap-3">
                  <Button type="button" color="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="button" color="primary" onClick={onConfirm}>
                    Confirm
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export const EditCategoryModal = ({
  isOpen,
  onClose,
  onSave,
  title,
  defaultValue,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: ICategory) => void;
  title: string;
  defaultValue: ICategory;
}) => {
  const [editedForm, setEditedForm] = useState<ICategory>(defaultValue);
  useEffect(() => {
    setEditedForm(defaultValue);
  }, [defaultValue]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("edited form : ", editedForm);
    onSave(editedForm);
  };
  const onCancel = () => {
    onClose();
    setEditedForm(defaultValue);
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-10">
                  <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center gap-5">
                      <div className="flex flex-col items-center gap-5">
                        <h1 className="font-medium text-dark">Name</h1>
                        <Input
                          type="text"
                          name="name"
                          onChange={(e) =>
                            setEditedForm({
                              ...editedForm,
                              name: e.target.value,
                            })
                          }
                          value={editedForm.name}
                          required
                        />
                      </div>
                      <div className=" flex flex-col items-center gap-5">
                        <h1 className="font-medium text-dark">Status</h1>
                        <RadioButton
                          name="status"
                          options={[
                            {
                              label: "Active",
                              value: "active",
                              icon: (
                                <CheckIcon className="h-5 w-5 text-success" />
                              ),
                            },
                            {
                              label: "Inactive",
                              value: "inactive",
                              icon: (
                                <XMarkIcon className="h-5 w-5 text-danger" />
                              ),
                            },
                          ]}
                          selectedValue={editedForm.status}
                          setSelectedValue={(value) =>
                            setEditedForm({ ...editedForm, status: value })
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-10 flex justify-end gap-3">
                      <Button
                        type="button"
                        color="secondary"
                        onClick={onCancel}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" color="primary">
                        Save
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export const AlertModal = ({
  isOpen,
  onClose,
  title,
  description,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-dark">{description}</p>
                </div>
                <div className="mt-4 flex justify-end gap-3">
                  <Button type="button" color="primary" onClick={onClose}>
                    OK
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
