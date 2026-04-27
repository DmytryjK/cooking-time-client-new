import { LoadedPhotos } from "../../RecipesForm";
import PhotoField from "./PhotoField/PhotoField";

export type PhotoFieldType = {
  name: string;
  maxSize?: string;
  id: keyof LoadedPhotos;
};

const UploadPhotos = () => {
  const photoFields: PhotoFieldType[] = [
    {
      name: "Фотографія мініатюри",
      maxSize: "1000",
      id: "preview",
    },
    {
      name: "Основна фотографія",
      id: "main",
    },
  ];
  return (
    <fieldset className="form__upload-photo upload-photo">
      {photoFields.map((photo) => {
        const { name, maxSize, id } = photo;
        return <PhotoField key={`${id}`} id={`${id}`} name={name} maxSize={maxSize} />;
      })}
    </fieldset>
  );
};

export default UploadPhotos;
