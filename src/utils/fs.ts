import fs from "fs";

interface IOpts {
  directoryPath: string;
  fileName?: string;
  fileContent: string | NodeJS.ArrayBufferView;
}

// Check if a file exists
export async function exists(path: string) {
  try {
    await fs.promises.access(path);
    return true;
  } catch {
    return false;
  }
}

async function createFile(opts: IOpts) {
  const isDirectoryExists = await exists(opts.directoryPath);
  if (!isDirectoryExists) {
    fs.mkdirSync(opts.directoryPath);
  }
  fs.writeFileSync(`${opts.directoryPath}/${opts.fileName}`, opts.fileContent);
}

async function getContent(filePath: string, encoding?: string) {
  const isFileExists = await exists(filePath);
  if (isFileExists) {
    // @ts-ignore
    return fs.readFileSync(filePath, { encoding });
  } else {
    // TODO: Handle returning an info log instead of error
    // throw "no such file !";
  }
}

async function copyFile(sourcePath: string, destination: string) {
  try {
    let readStream = fs.createReadStream(sourcePath);
    let writeStream = fs.createWriteStream(destination);

    readStream.on("close", function () {
      fs.unlink(sourcePath, (error) => {
        console.error(error);
      });
    });

    readStream.pipe(writeStream);
  } catch (error) {
    console.error(error);
  }
}

async function moveFile(sourcePath: string, destination: string) {
  try {
    const isFileExists = await exists(sourcePath);
    if (isFileExists) {
      await fs.promises.rename(sourcePath, destination);
    }
  } catch (error) {
    if (error) {
      await copyFile(sourcePath, destination);
    }
    console.error(error);
  }
}

export { createFile, getContent, moveFile };
