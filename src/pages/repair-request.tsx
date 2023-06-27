// Page for submitting a repair request

import { Inter } from "next/font/google";
import {useForm} from 'react-hook-form';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {register, handleSubmit, formState: {errors}} = useForm(
    {defaultValues: {
      item_brand: "",
      item_type: "",
      description: "",
      images:"",}
  
    });

  console.log(errors);
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center ${inter.className}`}
    >
      <br></br>

      <picture>
        <a href= "https://repairlab.myfreesites.net/" target="_blank" >
  
        <img
        src="/images/repair_lab_logo.jpg" 
        alt="Repair Labs Logo" 
        width={80}
        />

        </a>
      </picture> 

      <br></br>

      <h1 className = "font-bold text-xl"> Submit a Repair Request</h1>

      <br></br>

      <div>
        <form onSubmit = {handleSubmit ((data) => {
          console.log(data)

          const formData = new FormData();
          formData.append('item_brand', data.item_brand);
          formData.append('item_type', data.item_type);
          formData.append('description', data.description);
          formData.append('images', data.images[0]); 

        })}>

          <input className = {`h-12 w-80 pl-3 border border-solid rounded-md border-spacing-0.5 ${errors.item_brand && "focus:border-red-500 focus:ring-red-500 border-red-500"} `} {...register("item_brand", {required: "*Required"})} placeholder="Brand" />

      <p className="text-red-600"> {errors.item_brand?.message} </p>

      <br></br>

      <div>
        <select className = {`h-12 w-80 p-2 pl-2 pr-3 border border-solid rounded-md border-spacing-0.5 ${errors.item_type && "focus:border-red-500 focus:ring-red-500 border-red-500"}`} {...register("item_type", {required: "*Please select an option"})}>
          <option value="" disabled selected hidden>Item Type</option>
          <option value="clothing" > Clothing </option>
          <option value="bikes" > Bikes </option>
          <option value="other" > Other </option>
          
        </select>

        <p className="text-red-600"> {errors.item_type?.message} </p>
      </div>

      <br></br>

        <input className = {`h-12 w-80 pl-3 border border-solid rounded-md border-spacing-0.5 ${errors.description && "focus:border-red-500 focus:ring-red-500 border-red-500"}`} {...register("description", {required:  "*Required"})}  placeholder="Description of Item" />

      <p className="text-red-600"> {errors.description?.message} </p>

      <br></br>

        <input className = "h-12" type='file' {...register("images", {required:  "*Required"})} />
      
      <p className="text-red-600"> {errors.images?.message} </p>

        <input className = "h-12 w-60 border border-solid rounded-md border-spacing-0.5 text-center flex justify-center bg-teal-600 text-white hover:bg-teal-500 text-lg self-center m-auto" type="submit" />


        </form>
      </div>


    </main>
  );
}
