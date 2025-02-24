import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDiagnoses } from "../../stores/diagnoses";
import { usePatient } from "../../stores/patients";
import { Gender } from "../../types";
import { AddEntryForm } from "../AddEntryForm/AdEntryForm";
import { EntryDetail } from "../EntryDetail";
import { useState } from "react";

const PatientIcon = ({ gender }: { gender: Gender }) => {
  if (gender === Gender.Male) return <MaleIcon />;
  if (gender === Gender.Female) return <FemaleIcon />;
  return <TransgenderIcon />;
};

const PatientDetailPage = () => {
  const { id } = useParams();
  const { data: patient, isLoading } = usePatient(id);
  const { data: diagnoses } = useDiagnoses();
  const [show, setShow] = useState(false);

  if (isLoading || !patient) return <div>Loading...</div>;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
            fontWeight: "bold",
            marginY: "1.5rem",
          }}
        >
          {patient.name}
          {<PatientIcon gender={patient.gender} />}
        </Typography>
        <Box>
          <Typography>ssh: {patient.ssn}</Typography>
          <Typography>occupation: {patient.occupation}</Typography>
        </Box>
        <AddEntryForm show={show} />
        <Typography variant="h6" sx={{ marginY: "16px", fontWeight: "bold" }}>
          entries
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {patient.entries.map((entry) => (
            <EntryDetail key={entry.id} entry={entry} diagnoses={diagnoses} />
          ))}
        </Box>
      </Box>
      <Box sx={{ marginTop: "16px" }}>
        <Button variant="contained" onClick={() => setShow((value) => !value)}>
          ADD NEW ENTRY
        </Button>
      </Box>
    </>
  );
};

export default PatientDetailPage;
