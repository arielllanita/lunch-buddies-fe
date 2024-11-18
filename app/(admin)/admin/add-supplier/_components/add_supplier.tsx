"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { addSupplier } from "@/services/supplier.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  supplier_name: z.string().min(1, { message: "This field has to be filled" }),
  isFreeMainDish: z.boolean(),
  isFreeSideDish: z.boolean(),
});

export default function AddSupplier() {
  const [showForm, setshowForm] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { supplier_name: "", isFreeMainDish: false, isFreeSideDish: false },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      supplier_name: values.supplier_name,
      main_dish_free: values.isFreeMainDish,
      side_dish_free: values.isFreeSideDish,
    };

    const res = await addSupplier(payload);

    if (res?.id) {
      form.reset();
      setshowForm(false);
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <h1 className="text-4xl">Add Supplier</h1>
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
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="supplier_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="text" placeholder="Supplier name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3 mt-3">
                      <FormField
                        control={form.control}
                        name="isFreeMainDish"
                        render={({ field }) => (
                          <FormItem className="space-y-0 flex">
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormDescription className="text-base ml-2">
                              Free Main Dish
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="isFreeSideDish"
                        render={({ field }) => (
                          <FormItem className="space-y-0 flex">
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormDescription className="text-base ml-2">
                              Free Side Dish
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="bg-primary">
                      Add Supplier <Plus />
                    </Button>
                    <Button
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
