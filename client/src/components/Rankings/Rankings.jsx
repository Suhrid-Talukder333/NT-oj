import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { BACK_SERVER_URL } from "../../config/config";

import "./rankings.css";
import "react-toastify/dist/ReactToastify.css";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";

import NoContent from "./noContent/NoContent";

const columns = [
  { id: "rank", align: "center", label: "Rank", minWidth: 10 },
  { id: "username", align: "center", label: "Username", minWidth: 50 },
  { id: "ratings", align: "center", label: "Ratings", minWidth: 100 },
];

const verdicts = [
  "ACCount",
  "WACount",
  "CECount",
  "RTECount",
  "TLECount",
  "MLECount",
];

const verdictPoints = {
  ACCount: 100,
  WACount: -25,
  CECount: -5,
  RTECount: -5,
  TLECount: -5,
  MLECount: -5,
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    width: "100%",
    height: "calc(100vh - 100px)",
  },
  container: {
    maxHeight: 550,
  },
}));

function parseData(data) {
  const rate = (user) => {
    let rating = 0;
    verdicts.forEach((verdict) => {
      rating += user.stats.verdicts[verdict] * verdictPoints[verdict];
    })
    return rating;
  }
  const parsedData = data.map((user) => {
    return {
      id: user.id,
      username: user.username,
      ratings: rate(user)
    }
  });
  parsedData.sort((a, b) => b.ratings - a.ratings);
  return parsedData;
}

export default function Rankings() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(true);
  const [hasUsers, setHasUsers] = useState(true);

  useLayoutEffect(() => {
    axios
      .get(`${BACK_SERVER_URL}/api/users`,)
      .then((res) => {
        console.log(res.data, "data")
        if (!res.data || res.data.length === 0) setHasUsers(false);
        else {
          const parsedData = parseData(res.data)
          setRows(parsedData);
        }
        setLoader(false);
      })
      .catch((err) => {
        const error = err.response ? err.response.data.message : err.message;
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, []);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  return hasUsers === false ? (
    <>
      <NoContent />
    </>
  ) : (
    <div className="rankings-container">
      <ToastContainer />
      <div className="rankings-spinner">
        <BeatLoader color={"#343a40"} size={30} loading={loader} />
      </div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value =
                          column.id === "rank" ? index + 1 : row[column.id];
                        if (column.id === "username") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Link
                                to={`/dashboard/${row.id}`}
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "15px",
                                  textDecoration: "none",
                                  color: "#1a237e",
                                  cursor: "pointer",
                                }}
                              >
                                {value}
                              </Link>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <span
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "15px",
                                  color: "#1a237e",
                                }}
                              >
                                {value}
                              </span>
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
