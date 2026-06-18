import ImageCompress from "quill-image-compress";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Sources = "api" | "user" | "silent";

interface RecipeDescriptionAreaProps {
  value: string;
  onChange?: (value: string, delta: any, source: Sources, editor: ReactQuill.UnprivilegedEditor) => void;
}

ReactQuill.Quill.register("modules/imageCompress", ImageCompress);

const textareaOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote"],
  ["link", "image"],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];

const RecipeDescriptionArea = ({ value, onChange }: RecipeDescriptionAreaProps) => {
  return (
    <>
      <span className="form-descr__title form__label">Процес приготування</span>
      <ReactQuill
        className="form-descr__editor"
        placeholder="Опишіть процес приготування..."
        theme="snow"
        modules={{
          toolbar: {
            container: textareaOptions,
          },
          imageCompress: {
            quality: 0.6,
            maxWidth: 400,
            maxHeight: 300,
            imageType: "image/jpeg",
            debug: true,
            suppressErrorLogging: false,
            insertIntoEditor: undefined,
          },
        }}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default RecipeDescriptionArea;
