import { toast } from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../shared/Input";
import Modal from "../shared/Modal";
import { User } from "../../types/user";
import {
  useCreateUserMutation,
  useEditUserMutation,
} from "../../hooks/userHooks";
import { Role } from "../../types/role";
import { useGetAllRolesQuery } from "../../hooks/roleHooks";
import { useTokenContext } from "../../context/TokenContext";

const userSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    location: yup.string().required(),
    role: yup.number().required(),
    status: yup.boolean(),
  })
  .required();

type FormData = yup.InferType<typeof userSchema>;

interface UserFormModalProps {
  user?: User;
  isOpen: boolean;
  columns: string[];
  handleClose: () => void;
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  user,
  isOpen,
  columns,
  handleClose,
}) => {
  const tokenContext = useTokenContext();
  const { data } = useGetAllRolesQuery(tokenContext.token);
  console.log("columns in form", columns);
  const columnsToExclude = ["status", "createdBy"];
  const updatedColumns = columns.filter(
    (column) => !columnsToExclude.includes(column)
  );
  const { mutateAsync: createUser, error: createError } = useCreateUserMutation(
    tokenContext.token
  );
  const { mutateAsync: editUser, error: editError } = useEditUserMutation(
    tokenContext.token
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(userSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data, e) => {
    console.log("form data", data);

    await createUser({
      name: data.name,
      email: data.email,
      location: data.location,
      role: Number(data.role),
    });

    toast.success("User Created");
    reset();
    handleClose();
    window.location.reload();
  };

  const onEditSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(" form edit data", data);

    await editUser({
      id: user?.id,
      name: data.name,
      email: data.email,
      location: data.location,
      role: data.role,
      status: true,
    });

    toast.success("User Edited");
    reset();
    handleClose();
    window.location.reload();
  };

  if (createError || editError) {
    toast.error("Something went wrong");
  }

  return (
    <Modal
      title={`${user ? "Edit" : "Create New"} User`}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <form
        onSubmit={user ? handleSubmit(onEditSubmit) : handleSubmit(onSubmit)}
      >
        {updatedColumns.map((key) => (
          <div className="flex items-center mb-4" key={key}>
            <label
              htmlFor={key}
              className="block mb-4 mr-3 text-sm font-medium text-black-400 "
            >
              {key.charAt(0).toUpperCase() + key.slice(1) + ":"}
            </label>
            {key === "roleName" ? (
              <select
                id="roles"
                className="bg-slate-300 border border-gray-400 text-black-400 rounded shadow focus:outline-none focus:ring-gray-300 focus:border-gray-500 w-full py-1.5 px-3"
                {...register("role")}
                defaultValue={
                  user && data?.some((role) => role.id === user.role)
                    ? user.role
                    : ""
                }
              >
                <option>Choose a role</option>
                {data
                  ?.filter((role: Role) => role.status === true)
                  .map((role: Role) => (
                    <option value={role.id} key={role.id}>
                      {role.name}
                    </option>
                  ))}
              </select>
            ) : (
              <input
                className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 bg-slate-300 text-black leading-tight focus:outline-none focus:shadow-outline"
                id={key}
                type="text"
                {...register(key)}
                defaultValue={user ? user[key] || "" : ""}
                placeholder={
                  "Enter " + key.charAt(0).toUpperCase() + key.slice(1)
                }
              />
            )}
            <p className="my-1 text-red-400 text-sm capitalize">
              {errors[key] &&
                `${
                  key.charAt(0).toUpperCase() + key.slice(1)
                } Is A Required Field`}
            </p>
          </div>
        ))}

        <div className="bg-slate-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-3">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-green-300 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-teal-200 sm:ml-3 sm:w-auto"
            onClick={() => {
              console.log("Submit button clicked");
            }}
          >
            {user ? "Edit" : "Create"}
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserFormModal;
