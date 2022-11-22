import React, { useState, useEffect, useCallback } from "react";
import Table from "./SortingTable.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import {
  get_all_payoutable_by_memeber_id,
  payout_request,
  remove_member,
  approve_member,
  disapprove_member,
} from "../../http_requests/httpreq";

import { useUserContext } from "../../contexts/UserContext";

import { mainThemeColor } from "../../constants/constant.js";
import SubmitModal from "./SubmitProofModal/SubmitModal.js";

const styleRemove = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MemberPayable = () => {
  const { user } = useUserContext();
  const [alluser, setAlluser] = useState();
  const [id, setId] = useState();

  const [verificationData, setVerificationData] = useState();
  const [msgS, setMsgS] = useState("");
  const [msgF, setMsgF] = useState("");

  //////////////////////////////////////////////
  const [SnackbarF, setSnackbarF] = useState(false);
  const handleCloseSnackF = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarF(false);
  };
  ///////////////////////////////////////////////

  //////////////////////////////////////////////
  const [SnackbarS, setSnackbarS] = useState(false);
  const handleCloseSnackS = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarS(false);
  };
  ///////////////////////////////////////////////

  //approve modal/////////////////////////////////////
  const [openApproveModal, setOpenApproveModal] = React.useState(false);
  const handleOpenApproveModal = (data) => () => {
    setVerificationData(data.row.original);
    setOpenApproveModal(true);
  };
  const handleCloseApproveModal = () => setOpenApproveModal(false);
  ///////////////////////////////////////////////////

  const fetchData = useCallback(async () => {
    const res = await get_all_payoutable_by_memeber_id(user?.id);
    setAlluser(res.data.data);
    setId(user?.member_id);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleVerification = () => {
    payout_request(verificationData).then((res) => {
      if (res.data.success === 1) {
        setMsgS(res.data.message);
        setSnackbarS(true);
        handleCloseApproveModal();
        fetchData();
      } else {
        window.alert(res.data.message);
      }
    });
  };

  return (
    <div>
      <Snackbar
        open={SnackbarF}
        autoHideDuration={3000}
        onClose={handleCloseSnackF}
      >
        <Alert
          onClose={handleCloseSnackF}
          severity="success"
          sx={{ width: "100%", background: "#F88379" }}
        >
          {msgF}
        </Alert>
      </Snackbar>

      <Snackbar
        open={SnackbarS}
        autoHideDuration={3000}
        onClose={handleCloseSnackS}
      >
        <Alert
          onClose={handleCloseSnackS}
          severity="success"
          sx={{ width: "100%", background: "#599f22" }}
        >
          {msgS}
        </Alert>
      </Snackbar>

      <Modal
        open={openApproveModal}
        onClose={handleCloseApproveModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <div
            style={{
              color: mainThemeColor,
              fontSize: "20px",
              marginBottom: "20px",
            }}
          >
            Submit payment Proof
          </div>
          <SubmitModal
            setVerificationData={setVerificationData}
            verificationData={verificationData}
          />
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ margin: "auto" }}>
              <Button
                style={{
                  textTransform: "none",
                  color: "gray",
                  marginRight: "50px",
                }}
                onClick={handleCloseApproveModal}
              >
                Cancel
              </Button>
              <Button
                onClick={handleVerification}
                style={{ textTransform: "none", color: mainThemeColor }}
              >
                Submit for verification
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Table handleApproveModal={handleOpenApproveModal} row={alluser} />
    </div>
  );
};

export default MemberPayable;
