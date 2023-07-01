import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import TextInput from "@/components/TextInput";

type Inputs = {
  email: string;
  name: string;
  other: string;
};

const TestForm = () => {
  const methods = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TextInput textArea label="Other" name="other" />
          <TextInput
            label="Email"
            placeholder="Enter Email"
            icon="https://file.rendit.io/n/WO0yqXIkWlVzApILek8q.svg"
            required
            name="email"
          />
          <TextInput label="Name" placeholder="Enter Name" name="name" />
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default TestForm;
