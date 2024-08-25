import Editor from "@/components/dashboard/Editor";
import "react-quill/dist/quill.snow.css";

export default function page({ params }: { params: { id: string } }) {
  return (
    <div className="mt-20 h-screen px-3">
      <Editor id={params.id} />
    </div>
  );
}
