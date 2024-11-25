"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FileWithPath } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import ImgUpload from "./img_upload";
import { addDish } from "@/services/dish.service";

const formSchema = z.object({
  dish_name: z.string().min(1, { message: "This is required" }),
  dish_type: z.string({ required_error: "Please select dish type" }),
  supplier: z.string({ required_error: "Please select a supplier" }),
  price: z.coerce.number().int().gt(0, { message: "Must be greater than zero" }),
  tags: z.string().min(1, { message: "This is required" }),
});

export default function AddDish() {
  const [showForm, setshowForm] = useState(false);
  const imgUploadRef = useRef<{ imgFile: FileWithPath; error: () => void }>();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { dish_name: "", dish_type: undefined, supplier: undefined, tags: "", price: 1 },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!imgUploadRef.current?.imgFile) {
      imgUploadRef.current?.error();
      return;
    }

    const payload = {
      ...values,
      image: imgUploadRef.current.imgFile,
    };

    console.log("payload", payload);

    // TODO: FINALIZE API FOR SUBMISSION
    // const res = await addDish(payload);

    // if (!res?.id) {
    //   throw new Error("Failed to add supplier");
    // }

    toast.success(`${payload.dish_name} has been successfully added on your dish list`);
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Dish Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                <SelectItem value="m@support.com">m@support.com</SelectItem>
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
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Supplier" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                <SelectItem value="m@support.com">m@support.com</SelectItem>
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
                            <FormControl>
                              <Input type="number" placeholder="Price" {...field} />
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
