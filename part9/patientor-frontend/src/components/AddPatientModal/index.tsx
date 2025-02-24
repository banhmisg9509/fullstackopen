import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";

import AddPatientForm from "./AddPatientForm";
import { useState } from "react";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
}

const AddPatientModal = ({ modalOpen, onClose }: Props) => {
  const [error, setError] = useState("");

  return (
    <Dialog
      fullWidth={true}
      open={modalOpen}
      onClose={() => {
        setError("");
        onClose();
      }}
    >
      <DialogTitle>Add a new patient</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <AddPatientForm onCancel={onClose} setError={setError} />
      </DialogContent>
    </Dialog>
  );
};
export default AddPatientModal;
