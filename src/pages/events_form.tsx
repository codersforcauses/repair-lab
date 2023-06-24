/* 
This is a very basic form taken straight from React Hook Form's website
Added some inline tailwind CSS so you can understand what is going on
Right now it takes 2 text inputs,
  - Example Input
  - Example Input (Required)
The only different between the two is that the second one is required to submit the form while the first one is optional

It should return an object type of the form's values
*/

import { SubmitHandler,useForm } from "react-hook-form";

type Inputs = {
  example: string
  exampleRequired: string
};

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <main className="mx-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label htmlFor="example" className="mx-5">Example Input</label>
        <input type="text" id="example" defaultValue="test" {...register("example")} className="outline-1 outline"/>

        <br>
        </br>

        {/* include validation with required or other standard HTML validation rules */}
        <label htmlFor="exampleRequired" className="mx-5">Example Input (Required)</label>
        <input {...register("exampleRequired", { required: true })} className="outline-1 outline" />
        
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span className="text-red-500">This field is required</span>}

        <br></br><br></br>
        <input type="submit" />
      </form>
    </main>
  );
}