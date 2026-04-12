import { useState, useRef } from "react";
import { Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadPdf, Deck } from "@/lib/api";
import { toast } from "sonner";
import Spinner from "./Spinner";

interface UploadSectionProps {
  onUploaded: (deck: Deck) => void;
}

const UploadSection = ({ onUploaded }: UploadSectionProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const deck = await uploadPdf(file);
      toast.success("PDF uploaded! Deck created successfully.");
      onUploaded(deck);
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch {
      toast.error("Failed to upload PDF. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm animate-fade-in">
      <h2 className="text-lg font-semibold text-foreground mb-4">Upload a PDF</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed px-4 py-3 transition-colors hover:border-primary/50 hover:bg-muted/50">
          <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
          <span className="text-sm text-muted-foreground truncate">
            {file ? file.name : "Choose a PDF file..."}
          </span>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
        <Button onClick={handleUpload} disabled={!file || uploading} className="gap-2">
          {uploading ? (
            <Spinner className="py-0" />
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default UploadSection;
