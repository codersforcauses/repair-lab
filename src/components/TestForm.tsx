import { SubmitHandler,useForm } from "react-hook-form";

import TextInput from "@/components/TextInput";

type Inputs = {
  email: string
  name: string
  other: string
}

const TestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput textArea label="Other" {...register("other")}/>
        <TextInput label="Email" placeholder="Enter Email" icon="https://file.rendit.io/n/WO0yqXIkWlVzApILek8q.svg" required {...register("email")}/>
        <TextInput label="Name" placeholder="Enter Name" {...register("name")}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default TestForm;