import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../types";

interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
  // 1. Add this prop definition so the parent can pass the invalidation function
  onSuccess?: () => void;
}

export const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initialValues,
  onSuccess, // 2. Destructure the new prop
}: UpdateAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit the Agent detail"
      open={open}
      onOpenChange={onOpenChange}>
      <AgentForm
        // 3. Update this handler
        onSuccess={() => {
          // First, trigger the parent's logic (invalidation)
          if (onSuccess) {
            onSuccess();
          }
          // Then close the dialog
          onOpenChange(false);
        }}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
