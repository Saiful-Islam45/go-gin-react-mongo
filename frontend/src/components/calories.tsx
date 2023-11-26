import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, CircularProgress, Container, Stack } from "@mui/material";
import { HeaderTypoGraphy } from "../styles/HeaderTypography";
import { CustomiseTableCell, CustomiseTableCellBody } from "../styles/Table";

const Header = (): JSX.Element => <HeaderTypoGraphy>Calories Tracker</HeaderTypoGraphy>;
interface CaloryEntry {
  id: string;
  dish: string;
  ingredients: string;
  fat: number;
  calories: string;
}

function CaloriesTracker(): JSX.Element {
  const [data, setData] = useState<CaloryEntry[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/entries");
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  console.log("data", data);
  console.log("loading", loading);

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id: string) => {
    axios
      .delete(`http://localhost:8000/entry/delete/${id}`)
      .then((res) => {
        const newData = data.filter((d) => d.id !== id);
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id: string) => {};

  if (loading) <CircularProgress size={50} />;

  return (
    <Container>
      <Header />
      <TableContainer component={Paper}>
        <Table aria-label="calories tracker table">
          <TableHead>
            <TableRow>
              <CustomiseTableCell>Sl. No</CustomiseTableCell>
              <CustomiseTableCell>Dish</CustomiseTableCell>
              <CustomiseTableCell align="right">Fat</CustomiseTableCell>
              <CustomiseTableCell align="right">Ingredients</CustomiseTableCell>
              <CustomiseTableCell align="right">Calories</CustomiseTableCell>
              <CustomiseTableCell align="right">Actions</CustomiseTableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <Stack alignItems="center">
            <CircularProgress />
          </Stack>
          ) : (
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={row.id}>
                  <CustomiseTableCellBody component="th" scope="row">
                    {index + 1}
                  </CustomiseTableCellBody>
                  <CustomiseTableCellBody component="th" scope="row">
                    {row.dish}
                  </CustomiseTableCellBody>
                  <CustomiseTableCellBody align="right">{row.fat}</CustomiseTableCellBody>
                  <CustomiseTableCellBody align="right">{row.ingredients}</CustomiseTableCellBody>
                  <CustomiseTableCellBody align="right">{row.calories}</CustomiseTableCellBody>
                  <CustomiseTableCellBody align="right">
                    <Button variant="text" color="primary" size="large" endIcon={<EditIcon />} onClick={() => handleEdit(row.id)}></Button>
                    <Button
                      variant="text"
                      color="error"
                      size="large"
                      endIcon={<DeleteIcon />}
                      onClick={() => handleDelete(row.id)}
                    ></Button>
                  </CustomiseTableCellBody>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Container>
  );
}

export default CaloriesTracker;
