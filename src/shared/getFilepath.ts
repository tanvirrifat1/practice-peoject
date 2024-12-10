type IFolderName = 'images' | 'medias' | 'docs';

export const getFilePaths = (files: any, folderName: IFolderName) => {
  if (files && files.image) {
    return files.image.map((file: any) => `/${folderName}/${file.filename}`);
  }
  return [];
};
