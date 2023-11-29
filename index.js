const { compare } = require("./compare");
const fs = require("fs");

const gitIgnoreFile = ["node_modules"];

const checkingFileType = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        resolve(null);
      } else if (!stats) {
        resolve(null);
      } else if (stats.isFile()) {
        resolve("file");
      } else if (stats.isDirectory()) {
        resolve("folder");
      } else {
        resolve(null);
      }
    });
  });
};

const getFileListInDir = async (start_file_path) => {
  let start_file_path_type = await checkingFileType(start_file_path);

  if (!start_file_path_type) {
    return [];
  }
  if (start_file_path_type == "file") {
    return [start_file_path];
  }

  let dir_arr = fs.readdirSync(start_file_path);
  let arrFileDir = [];
  for (let i = 0; i < dir_arr.length; i++) {
    item = dir_arr[i];
    if (!gitIgnoreFile.includes(item)) {
      item = start_file_path + "/" + item;
      let tempDirFileList = await getFileListInDir(item);
      arrFileDir = [...arrFileDir, ...tempDirFileList];
    }
  }
  return arrFileDir;
};

const findDiffInTwoFileList = (
  folder_name_1,
  folder_name_2,
  file_list_1,
  file_list_2
) => {
  let tempFileList1 = [];
  let tempFileList2 = [];
  for (let i = 0; i < file_list_1.length; i++) {
    let item = file_list_1[i].replace(folder_name_1, "abcdefghigk");
    tempFileList1.push(item);
  }
  for (let i = 0; i < file_list_2.length; i++) {
    let item = file_list_2[i].replace(folder_name_2, "abcdefghigk");
    tempFileList2.push(item);
  }
  let data = tempFileList1.filter((item) => !tempFileList2.includes(item));
  data = data.map((item) => item.replace("abcdefghigk", folder_name_1));
  return data;
};

const findDiffInTwoFiles = async (
  folder_name_1,
  folder_name_2,
  file_list_1,
  file_list_2
) => {
  try {
    let common_file_name = "abcdefllaksdas";
    let tempFileList1 = [];
    let tempFileList2 = [];
    for (let i = 0; i < file_list_1.length; i++) {
      let item = file_list_1[i].replace(folder_name_1, common_file_name);
      tempFileList1.push(item);
    }
    for (let i = 0; i < file_list_2.length; i++) {
      let item = file_list_2[i].replace(folder_name_2, common_file_name);
      tempFileList2.push(item);
    }
    let ansFile = [];
    for (let i = 0; i < tempFileList1.length; i++) {
      let tempFileName1_ = tempFileList1[i];
      if (tempFileList2.includes(tempFileName1_)) {
        let tempFileName1 = tempFileName1_.replace(
          common_file_name,
          folder_name_1
        );
        let tempFileName2 = tempFileName1_.replace(
          common_file_name,
          folder_name_2
        );

        const da = await compare(tempFileName1, tempFileName2);
        if (!da) {
          ansFile.push(tempFileName2);
        }
      }
    }
    return ansFile;
  } catch (err) {}
};
const compare_folders_path = async (start_folder_name, update_folder_name) => {
  try {
    let start_file_arr = await getFileListInDir(start_folder_name);
    let update_file_arr = await getFileListInDir(update_folder_name);

    const deletedFileList = findDiffInTwoFileList(
      start_folder_name,
      update_folder_name,
      start_file_arr,
      update_file_arr
    );
    const addedFileList = findDiffInTwoFileList(
      update_folder_name,
      start_folder_name,
      update_file_arr,
      start_file_arr
    );
    const findDiffInFile = await findDiffInTwoFiles(
      start_folder_name,
      update_folder_name,
      start_file_arr,
      update_file_arr
    );
    return [addedFileList, deletedFileList, findDiffInFile];
  } catch (err) {
    return [[], [], []];
  }
};

module.exports = compare_folders_path;
