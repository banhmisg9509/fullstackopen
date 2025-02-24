import { Box, List, ListItem, Typography } from "@mui/material";
import { Diagnosis, Entry, HealthCheckRating } from "../../types";
import { green, yellow, orange, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const EntryIcon = ({ entry }: { entry: Entry }) => {
  if (entry.type === "HealthCheck") return <MedicalServicesIcon />;
  if (entry.type === "OccupationalHealthcare") return <WorkIcon />;
  return <LocalHospitalIcon />;
};

const HealthCheckRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
  if (rating === HealthCheckRating.Healthy)
    return <FavoriteIcon sx={{ color: green["500"] }} />;
  if (rating === HealthCheckRating.LowRisk)
    return <FavoriteIcon sx={{ color: yellow["500"] }} />;
  if (rating === HealthCheckRating.HighRisk)
    return <FavoriteIcon sx={{ color: orange["500"] }} />;
  if (rating === HealthCheckRating.CriticalRisk)
    return <FavoriteIcon sx={{ color: red["500"] }} />;
};

type Props = {
  entry: Entry;
  diagnoses?: Diagnosis[];
};

export const EntryDetail = ({ entry, diagnoses }: Props) => {
  return (
    <Box
      key={entry.id}
      sx={{
        border: "1px solid black",
        borderRadius: "6px",
        padding: "8px",
      }}
    >
      <Typography sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {entry.date} <EntryIcon entry={entry} />
        {entry.type === "OccupationalHealthcare" ? entry.employerName : null}
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      {entry.diagnosisCodes && (
        <List>
          {entry.diagnosisCodes?.map((code) => (
            <ListItem key={code}>
              {code}{" "}
              {diagnoses?.find((diagnose) => diagnose.code === code)?.name}
            </ListItem>
          ))}
        </List>
      )}
      {entry.type === "HealthCheck" ? (
        <HealthCheckRatingIcon rating={entry.healthCheckRating} />
      ) : null}
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};
