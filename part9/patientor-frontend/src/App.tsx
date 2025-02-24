import { Button, Container, Divider, Typography } from "@mui/material";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PatientDetailPage from "./components/PatientDetailPage";
import PatientListPage from "./components/PatientListPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="patient/:id" element={<PatientDetailPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
