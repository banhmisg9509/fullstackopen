import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePatients } from "../../stores/patients";
import { Patient } from "../../types";
import AddPatientModal from "../AddPatientModal";
import HealthRatingBar from "../HealthRatingBar";

const PatientListPage = () => {
  const navigate = useNavigate();
  const { data: patients } = usePatients();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => setModalOpen(false);

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients?.map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell onClick={() => navigate(`/patient/${patient.id}`)}>
                {patient.name}
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal modalOpen={modalOpen} onClose={closeModal} />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
