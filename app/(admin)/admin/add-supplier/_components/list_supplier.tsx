"use client";

import { updateSupplier, removeSupplier } from "@/actions/supplier.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Supplier } from "@prisma/client";
import { Check, Save, SquarePen, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ListSupplier({ suppliers }: { suppliers: Supplier[] }) {
  return (
    <Card>
      <CardContent className="p-4">
        <h1 className="text-3xl mb-4">Food Suppliers</h1>

        <ScrollArea className="h-[30rem]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier Name</TableHead>
                <TableHead>Free Main Dish</TableHead>
                <TableHead>Free Side Dish</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <Row key={supplier.id} supplier={supplier} />
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function Row({ supplier }: { supplier: Supplier }) {
  const [isEditMode, setIsEditMode] = useState(false);

  if (isEditMode) return <EditRow supplier={supplier} cancelEdit={() => setIsEditMode(false)} />;

  return (
    <TableRow>
      <TableCell>{supplier.name}</TableCell>
      <TableCell>{supplier.isFreeMainDish ? <Check /> : <X />}</TableCell>
      <TableCell>{supplier.isFreeSideDish ? <Check /> : <X />}</TableCell>
      <TableCell>
        <div className="flex justify-end gap-4">
          <Button variant={"outline"} size={"icon"} onClick={() => setIsEditMode(true)}>
            <SquarePen />
          </Button>

          <DeleteSupplierBtn supplier={supplier} />
        </div>
      </TableCell>
    </TableRow>
  );
}

function EditRow({ supplier, cancelEdit }: { supplier: Supplier; cancelEdit: () => void }) {
  const router = useRouter();

  const [rowData, setRowData] = useState({
    name: supplier.name,
    isFreeMainDish: supplier.isFreeMainDish,
    isFreeSideDish: supplier.isFreeSideDish,
  });

  const saveUpdate = async () => {
    if (!rowData.name) {
      toast.error("Supplier name can't be empty");
      return;
    }

    await updateSupplier(rowData, supplier.id);

    toast.success(`${rowData.name} has been updated successfully!`);
    cancelEdit();
    router.refresh();
  };

  return (
    <TableRow>
      <TableCell>
        <Input
          value={rowData.name}
          required
          onChange={(e) => setRowData((v) => ({ ...v, name: e.target.value.trim() }))}
        />
      </TableCell>
      <TableCell>
        <Switch
          checked={rowData.isFreeMainDish}
          onCheckedChange={(checked) => setRowData((v) => ({ ...v, isFreeMainDish: checked }))}
        />
      </TableCell>
      <TableCell>
        <Switch
          checked={rowData.isFreeSideDish}
          onCheckedChange={(checked) => setRowData((v) => ({ ...v, isFreeSideDish: checked }))}
        />
      </TableCell>
      <TableCell>
        <div className="flex justify-end gap-4">
          <Button variant={"outline"} size={"icon"} onClick={saveUpdate}>
            <Save className="text-primary" />
          </Button>

          <Button variant={"outline"} size={"icon"} onClick={cancelEdit}>
            <X />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

function DeleteSupplierBtn({ supplier }: { supplier: Supplier }) {
  const router = useRouter();

  const removeHandler = async () => {
    await removeSupplier(supplier.id);

    toast.success(`${supplier.name} has been deleted`);
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <Trash className="text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure want to delete {supplier.name}?</DialogTitle>
          <DialogDescription>
            <span>
              This supplier and all of its dishes will be deleted immediately. You can&apos;t undo
              this action.
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancel</Button>
          </DialogClose>
          <Button variant={"destructive"} onClick={removeHandler}>
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
