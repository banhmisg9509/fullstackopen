import { useState, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

import { Gender } from "../../types";
import { useCreatePatientEntry } from "../../stores/patients";
import axios from "axios";

interface Props {
  onCancel: () => void;
  setError: (error: string) => void;
}

interface GenderOption {
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddPatientForm = ({ onCancel, setError }: Props) => {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [ssn, setSsn] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(Gender.Other);

  const { mutateAsync: createPatientEntry } = useCreatePatientEntry();

  const onGenderChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const gender = Object.values(Gender).find((g) => g.toString() === value);
      if (gender) {
        setGender(gender);
      }
    }
  };

  const addPatient = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const newEntry = {
        name,
        occupation,
        ssn,
        dateOfBirth,
        gender,
        entries: [],
      };
      await createPatientEntry(newEntry);
      onCancel();
    } catch (e) {
      if (!axios.isAxiosError(e)) {
        setError("Unknown error");
        return;
      }

      if (e?.response?.data && typeof e?.response?.data === "string") {
        const message = e.response.data.replace(
          "Something went wrong. Error: ",
          ""
        );
        setError(message);
      } else {
        setError("Unrecognized axios error");
      }
    }
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <TextField
            label="Social security number"
            fullWidth
            value={ssn}
            onChange={({ target }) => setSsn(target.value)}
          />
          <TextField
            label="Date of birth"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={dateOfBirth}
            onChange={({ target }) => setDateOfBirth(target.value)}
          />
          <TextField
            label="Occupation"
            fullWidth
            value={occupation}
            onChange={({ target }) => setOccupation(target.value)}
          />
        </Stack>
        <InputLabel style={{ marginTop: 20 }}>Gender</InputLabel>
        <Select
          label="Gender"
          fullWidth
          value={gender}
          onChange={onGenderChange}
        >
          {genderOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <Grid style={{ marginTop: 20 }}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatientForm;
