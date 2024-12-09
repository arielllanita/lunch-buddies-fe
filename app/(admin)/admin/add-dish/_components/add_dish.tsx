"use client";

import { createDish } from "@/actions/dish.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Supplier } from "@prisma/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import ImgUpload, { ImgUploadRef } from "./img_upload";

const formSchema = z.object({
  dish_name: z.string().min(1, { message: "This is required" }),
  dish_type: z.string({ required_error: "Please select dish type" }),
  supplier: z.string({ required_error: "Please select a supplier" }),
  // See https://stackoverflow.com/a/75291616/14047061
  price: z.coerce.number().refine((x) => Math.abs(x * 100 - Math.round(x * 100)) < Number.EPSILON, {
    message: "Number must be within floating-point precision.",
  }),
  tags: z.string().min(1, { message: "This is required" }),
});

export default function AddDish({ suppliers }: { suppliers: Supplier[] }) {
  const [showForm, setshowForm] = useState(false);

  const imgUploadRef = useRef<ImgUploadRef>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { dish_name: "", dish_type: undefined, supplier: undefined, tags: "", price: 1 },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!imgUploadRef.current?.imgFile) {
      imgUploadRef.current?.error("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("imgFile", imgUploadRef.current.imgFile);
    formData.append("name", values.dish_name);
    formData.append("type", values.dish_type);
    formData.append("supplierId", values.supplier);
    formData.append("tags", values.tags);
    formData.append("price", `${values.price}`);

    await createDish(formData);

    toast.success(`${values.dish_name} has been successfully added on your dish list`);
    form.reset();
    setshowForm(false);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <h1 className="text-4xl">Add Dish</h1>
        <Button
          variant={"ghost"}
          className="rounded-full p-0"
          size={"icon"}
          asChild
          onClick={() => setshowForm(true)}
        >
          <Plus className="text-primary" size={30} strokeWidth={3} absoluteStrokeWidth />
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="p-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <ImgUpload ref={imgUploadRef} />
                  </div>

                  <div className="col-span-2 flex flex-col gap-3">
                    <div className="flex gap-3">
                      <FormField
                        control={form.control}
                        name="dish_name"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Dish name</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="Dish name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dish_type"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Dish type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Dish Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="MAIN">Main Dish</SelectItem>
                                <SelectItem value="SIDE">Side Dish</SelectItem>
                                <SelectItem value="EXTRA">Extra Order</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex gap-3">
                      <FormField
                        control={form.control}
                        name="supplier"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormLabel>Supplier</FormLabel>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Supplier" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {suppliers.map((s) => (
                                  <SelectItem key={s.id} value={s.id}>
                                    {s.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input type="number" step={"0.01"} placeholder="Price" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Tags (comma separated ex. Spicy,Halal,Sea foods)"
                                {...field}
                              />
                              {/* <InputTags {...field} placeholder="Tags" /> */}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="bg-primary">
                      Add Dish <Plus />
                    </Button>
                    <Button
                      type="button"
                      variant={"outline"}
                      onClick={() => {
                        form.reset();
                        setshowForm(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
