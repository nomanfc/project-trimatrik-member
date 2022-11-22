import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Select as SelectM } from "@mui/material";

const SubmitModal = (props) => {
  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          marginTop: "15px",
          justifyContent: "space-between",
          //   flexDirection: windowWidth.width < 800 ? "column" : "row",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <TextField
            fullWidth
            type="file"
            id="outlined-basic"
            label="Upload Bank Pay Slip"
            name="first_name"
            onChange={(e) =>
              props.setVerificationData({
                ...props.verificationData,
                payment_proof_file: "aa",
              })
            }
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          marginTop: "15px",
        }}
      >
        <TextField
          fullWidth
          id="outlined-basic"
          label="Transition ID (if available)"
          name="transaction_identifier_string"
          onChange={(e) =>
            props.setVerificationData({
              ...props.verificationData,
              transaction_identifier_string: e.target.value,
            })
          }
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default SubmitModal;
