import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Props = {
  triggerLabel: string;
  triggerVariant?:
    | "default"
    | "outline"
    | "ghost"
    | "secondary"
    | "destructive"
    | "link";
  contentClassName?: string;
  children: React.ReactNode;
};

export function DialogDemo({
  triggerLabel,
  triggerVariant = "outline",
  children,
  contentClassName = "",
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="pointer" variant={triggerVariant}>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className={contentClassName}>{children}</DialogContent>
    </Dialog>
  );
}
