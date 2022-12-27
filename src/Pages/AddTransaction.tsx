import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {
  TextField,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormLabel,
  Button,
} from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import React, { FormEvent, useEffect, useState, useContext } from "react";
import { Cookies } from "react-cookie";
import { getEnvironmentData } from "worker_threads";
import { UserDataContext } from "../App";
const StyledBoxContainer = styled(Box)(({ theme }) => {
  return {
    width: "100vw",
    padding: 1,
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    minHeight: "100vh",
    alignSelf: "center",
    [theme.breakpoints.up("md")]: {
      width: "70vw",
      position: "relative",
      left: "28%",
    },
  };
});

export interface TransactionObj {
  title: string;
  amount: string;
  tType: string;
  pType: string;
}

const TObject = {
  title: "",
  amount: "",
  tType: "",
  pType: "",
};

const AddTransaction: React.FC = () => {
  const cookie = new Cookies();
  const { userDataInfo }: any = useContext(UserDataContext);
  const { dispatch }: any = useContext(UserDataContext);
  const { listDataInfo }: any = useContext(UserDataContext);
  const { listDispatch }: any = useContext(UserDataContext);

  const Data = async () => {
    const api = `https://expensess-tracker-default-rtdb.firebaseio.com/${cookie.get(
      "etToken"
    )}.json`;

    const res = await fetch(api);
    const data = await res.json();
    const key = Object.keys(data)[0];
    const value = data[key];
    dispatch({ type: "FETCH_SUCESS", payload: { key: key, value: value } });
  };
  useEffect(() => {
    Data();
  }, [dispatch]);

  const addItemToList = async () => {
    const api = `https://expensess-tracker-default-rtdb.firebaseio.com/${cookie.get(
      "etToken"
    )}/list.json`;
    const key = userDataInfo.key;
    const valueI = {
      ...userDataInfo.value,
      transactionList: listDataInfo.transactionList,
    };
    const options = { method: "PUT", body: JSON.stringify({ key: valueI }) };
    const res = await fetch(api, options);
    console.log("ueF", options);
  };

  const [transactionObject, setTransactinObject] = useState<TransactionObj>(
    TObject
  );
  const handleObjChange = (e: any) => {
    setTransactinObject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAmountChange = (e: any) => {
    setTransactinObject((prev) => ({ ...prev, amount: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    listDispatch({ type: "ADD_ITEM", payload: { data: transactionObject } });
  };

  useEffect(() => {
    addItemToList();
  }, [handleSubmit]);
  return (
    <StyledBoxContainer>
      <form onSubmit={handleSubmit}>
        <Typography mt={2} gutterBottom ml={0.7} variant="h5" fontWeight={400}>
          Add Transaction
        </Typography>
        <TextField
          value={transactionObject.title}
          name="title"
          onChange={handleObjChange}
          label="Title"
          fullWidth
          sx={{ marginLeft: 0.5, marginBottom: 2 }}
        />
        <TextField
          value={transactionObject.amount}
          name="amout"
          onChange={handleAmountChange}
          label="Amount"
          type="number"
          sx={{
            marginLeft: 0.5,
            marginBottom: 2,
            width: "45%",
            marginRight: 1.7,
          }}
        />
        <FormControl sx={{ width: "50%" }}>
          <InputLabel>Payment Type</InputLabel>
          <Select
            onChange={handleObjChange}
            label="Payment Type"
            name="pType"
            value={transactionObject.pType}
          >
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Credit">Credit Card Bill</MenuItem>
            <MenuItem value="EMIs">EMIs</MenuItem>
            <MenuItem value="Rent">Rent</MenuItem>
            <MenuItem value="Grocerys">Grocerys</MenuItem>
            <MenuItem value="Other">Others</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{
            marginLeft: 0.5,
            marginBottom: 2,
            marginRight: 1.7,
          }}
        >
          <FormLabel>Transaction Type</FormLabel>
          <RadioGroup
            onChange={handleObjChange}
            sx={{ display: "flex" }}
            name="tType"
            value={transactionObject.tType}
          >
            <FormControlLabel
              value="EXPENSES"
              control={<Radio />}
              label="Expenses"
            />
            <FormControlLabel
              value="INCOME"
              control={<Radio />}
              label="Income"
            />
          </RadioGroup>
        </FormControl>
        <br />
        <Button sx={{ marginLeft: 0.5 }} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </StyledBoxContainer>
  );
};

export default AddTransaction;
