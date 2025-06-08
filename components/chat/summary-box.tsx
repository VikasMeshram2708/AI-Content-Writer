import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function SummaryBox({ content }: { content: string }) {
  return (
    <div>
      <Dialog defaultOpen={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lorem ipsum dolor sit amet.</DialogTitle>
            <DialogDescription>
              You are seeing an ai generated <strong>{content}</strong>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
