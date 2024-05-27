import { memo, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// hight light color for text editor
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";

import SpinLoading from "../Loading/SpinLoading";

interface Props {
    content?: string;
}

//Add class Image Quill Editor
var Image = ReactQuill.Quill.import("formats/image");
Image.className = "quill__image";

ReactQuill.Quill.register(Image, true);

//Font Quill Editor
const FontAttributor = ReactQuill.Quill.import("attributors/class/font");
FontAttributor.whitelist = [
    "sofia",
    "slabo",
    "roboto",
    "inconsolata",
    "ubuntu"
];
ReactQuill.Quill.register(FontAttributor, true);

hljs.configure({
    languages: ["javascript", "html", "css"]
});

// Format header for Quill Editor
const formats: string[] = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "code-block",
    "background",
    "color",
    "link",
    "image",
    "video",
    "align",
    "float"
];

// Module color for Quill Editor
const colors: string[] = ["blue", "white", "orange", "#A91D3A"];

// Module background color for Quill Editor
const backgroundColors: string[] = ["red"];

const Editor = (props: Props) => {
    const { content = "" } = props;
    const quillRef = useRef(null);

    const [value, setValue] = useState<string>(content);
    const [loading, setLoading] = useState<boolean>(false);

    const modules = useMemo(
        () => ({
            syntax: {
                highlight: (text: string) => hljs.highlightAuto(text).value
            },
            toolbar: {
                container: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ color: colors }, { background: backgroundColors }],
                    [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" }
                    ],
                    [{ align: [] }],
                    ["code-block"],
                    ["link", "image"],
                    ["clean"]
                ]
            }
        }),
        []
    );

    return (
        <div className="relative overflow-hidden z-0">
            <ReactQuill
                modules={modules}
                formats={formats}
                ref={quillRef}
                theme="snow"
                readOnly
                value={value}
            />

            {loading && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/40 rounded-md">
                    <SpinLoading className="text-3xl text-white" />
                </div>
            )}
        </div>
    );
};

export default memo(Editor);
