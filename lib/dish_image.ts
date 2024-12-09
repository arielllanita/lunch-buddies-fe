import { createId } from "@paralleldrive/cuid2";
import fs from "node:fs/promises";
import path from "path";

// TODO: Use recursion to check if image id exist

export async function dishImageUpload(img: File) {
  const data = await img.arrayBuffer();
  const fileType = img.type.split("/")[1];

  const uploadPath = path.join(process.cwd(), "public", "dish-images");
  const isUploadPathExist = await folderExists(uploadPath);

  if (!isUploadPathExist) {
    await fs.mkdir(uploadPath, { recursive: true });
  }

  const documentHash = createId();
  const filePath = `${uploadPath}/${documentHash}.${fileType}`;
  await fs.appendFile(filePath, Buffer.from(data));

  return `/dish-images/${documentHash}.${fileType}`;
}

export async function dishImageRemove(imgPath: string) {
  const img = path.join(process.cwd(), "public", imgPath);

  const isImgExist = await folderExists(img);
  if (isImgExist) {
    await fs.unlink(img);
  }
}

async function folderExists(folderPath: string) {
  try {
    // Check if the folder is accessible
    await fs.access(folderPath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}
