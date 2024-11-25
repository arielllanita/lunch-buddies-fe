import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImgUpload = forwardRef((props, ref) => {
  const [state, setState] = useState<"ERROR" | "GOOD">("GOOD");

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: () => setState("GOOD"),
  });

  useImperativeHandle(ref, () => ({
    imgFile: acceptedFiles[0],
    error: () => setState("ERROR"),
  }));

  return (
    <div className="flex flex-col gap-3">
      {/* Drag & Drop component */}
      <div
        {...getRootProps()}
        className={cn(
          state === "ERROR" ? "border-red-500" : "border-green-500",
          "text-center border-dashed p-4 rounded border-2"
        )}
      >
        <input {...getInputProps()} />
        <span className="text-muted-foreground">Drag your file to start uploading</span>
        
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>
        
        <Button variant={"outline"} type="button">
          Browse files
        </Button>
      </div>

      {state === "ERROR" && (
        <p className="text-sm font-medium text-destructive">Image is required</p>
      )}

      {/* Thumbnail */}
      {acceptedFiles.map((file, i) => {
        const preview = URL.createObjectURL(file);

        return (
          <div key={i} className="flex items-center gap-3 border rounded-lg p-3">
            <div>
              <Image
                src={preview}
                width={100}
                height={100}
                alt="Dish preview"
                onLoad={() => {
                  // prevent memory leaks
                  URL.revokeObjectURL(preview);
                }}
              />
            </div>
            <div>
              <span className="text-sm">{file.name}</span> <br />
              <span className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
});

ImgUpload.displayName = "ImgUpload";

export default ImgUpload;
