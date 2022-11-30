import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useQuery from "./useQuery";

interface IFormInput {
  username: string;
  password: string;
}

const App = () => {
  const [detail, setDetail] = React.useState({});
  const [query, setQuery] = useQuery();
  const defaultValues = React.useMemo(() => detail, [detail]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues,
  });

  const handleChangePage = (page: number) => {
    setQuery({
      ...query,
      page,
    });
  };

  const handleChangeFilter = (data: { q: string; type: string }) => {
    setQuery({
      ...query,
      ...data,
    });
  };

  React.useEffect(() => {
    dispatch(getProduct(query));
    if (detail) {
      reset(defaultValues);
    }

    return () => {
      reset();
    };
  }, [detail]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username", { required: true, maxLength: 20 })} />
        <input
          {...register("password", {
            required: true,
            maxLength: 20,
            minLength: 10,
          })}
        />

        <input type="submit" />
      </form>
      {errors?.username?.type ||
        (errors?.password?.type === "required" && (
          <p className="errorMsg">Không đươc bỏ trống user or password</p>
        ))}
      {errors?.username?.type === "maxLength" && (
        <p className="errorMsg">tối đa 20 kì tự</p>
      )}
      {errors?.password?.type === "minLength" && (
        <p className="errorMsg">Password tối thiểu 10 ký tự</p>
      )}
    </div>
  );
};

export default App;
