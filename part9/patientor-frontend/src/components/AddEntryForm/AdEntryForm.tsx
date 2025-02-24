import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FormEventHandler, useState } from "react";
import { useDiagnoses } from "../../stores/diagnoses";
import {
  EntryFormValues,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import { useAddEntry } from "../../stores/patients";
import { useParams } from "react-router-dom";

const toString = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${date.getDate()}`;
};

type Props = {
  show: boolean;
};

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

export const AddEntryForm = ({ show }: Props) => {
  const { id: patientId } = useParams();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState<Date>();
  const [sickLeaveEnd, setSickLeaveEnd] = useState<Date>();

  const [dischargeDate, setDischargeDate] = useState(new Date());
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [type, setType] = useState<EntryType>("HealthCheck");

  const { data } = useDiagnoses();
  const { mutateAsync } = useAddEntry();

  const resetForm = () => {
    setDescription("");
    setDate(new Date());
    setHealthCheckRating(0);
    setSpecialist("");
    setDiagnosisCodes([]);

    setEmployerName("");
    setSickLeaveStart(undefined);
    setSickLeaveEnd(undefined);

    setDischargeDate(new Date());
    setDischargeCriteria("");
  };

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!patientId) return;

    let entry: EntryFormValues = {
      description,
      date: toString(date),
      specialist,
      diagnosisCodes,
      type,
    };

    if (type === "HealthCheck") {
      entry = { ...entry, healthCheckRating } as HealthCheckEntry;
    }

    if (type === "Hospital") {
      entry = {
        ...entry,
        discharge: {
          date: toString(dischargeDate),
          criteria: dischargeCriteria,
        },
      } as HospitalEntry;
    }

    if (type === "OccupationalHealthcare") {
      entry = {
        ...entry,
        employerName,
        sickLeave: {
          startDate: sickLeaveStart ? toString(sickLeaveStart) : "",
          endDate: sickLeaveEnd ? toString(sickLeaveEnd) : "",
        },
      } as OccupationalHealthcareEntry;
    }

    await mutateAsync({
      patientId,
      ...entry,
    });

    resetForm();
  };

  if (!show) return null;

  return (
    <Box
      onSubmit={onSubmit}
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        border: "1px dashed black",
        padding: "12px",
        paddingTop: "32px",
        mt: "16px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ fontWeight: "bold" }}>New </Typography>
        <Select
          variant="standard"
          value={type}
          onChange={(e) => setType(e.target.value as EntryType)}
        >
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            OccupationalHealthcare
          </MenuItem>
        </Select>
        <Typography sx={{ fontWeight: "bold" }}>entry</Typography>
      </Box>
      <TextField
        label="Description"
        variant="standard"
        InputLabelProps={{ shrink: true }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Date"
        variant="standard"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={toString(date)}
        onChange={(e) => setDate(new Date(e.target.value))}
      />
      <TextField
        label="Specialist"
        variant="standard"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      {type === "HealthCheck" && (
        <TextField
          select
          label="Heathcheck rating"
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(+e.target.value)}
          variant="standard"
        >
          <MenuItem value={0}>Healthy</MenuItem>
          <MenuItem value={1}>LowRisk</MenuItem>
          <MenuItem value={2}>HighRisk</MenuItem>
          <MenuItem value={3}>CriticalRisk</MenuItem>
        </TextField>
      )}
      {type === "Hospital" && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            type="date"
            label="Discharge date"
            InputLabelProps={{ shrink: true }}
            variant="standard"
            value={toString(dischargeDate)}
            onChange={(e) => setDischargeDate(new Date(e.target.value))}
          />
          <TextField
            variant="standard"
            label="Discharge creteria"
            fullWidth
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
          />
        </Box>
      )}
      {type === "OccupationalHealthcare" && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="standard"
            label="Employer Name"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
          <Typography sx={{ fontWeight: 600, alignSelf: "flex-end", ml: 2 }}>
            Sick leave:{" "}
          </Typography>
          <TextField
            InputLabelProps={{ shrink: true }}
            type="date"
            label="Start date"
            variant="standard"
            value={sickLeaveStart ? toString(sickLeaveStart) : ""}
            onChange={(e) => setSickLeaveStart(new Date(e.target.value))}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            type="date"
            label="End date"
            variant="standard"
            value={sickLeaveEnd ? toString(sickLeaveEnd) : ""}
            onChange={(e) => setSickLeaveEnd(new Date(e.target.value))}
          />
        </Box>
      )}
      <FormControl>
        <InputLabel id="code" shrink sx={{ ml: -1.5 }}>
          Diagnosis codes
        </InputLabel>
        <Select
          labelId="code"
          label="Diagnosis codes"
          variant="standard"
          multiple
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(String(e.target.value).split(","))}
        >
          {data?.map((code) => (
            <MenuItem key={code.code} value={code.code}>
              {code.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="error" onClick={() => resetForm()}>
          Cancel
        </Button>
        <Button variant="contained" color="inherit" type="submit">
          Add
        </Button>
      </Box>
    </Box>
  );
};
