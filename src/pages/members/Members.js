import React, { useState, useEffect, useCallback } from "react";
import Table from "./SortingTable.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import {
  get_all_members,
  remove_member,
  approve_member,
  disapprove_member,
} from "../../http_requests/httpreq";

import { useUserContext } from "../../contexts/UserContext";

import { mainThemeColor } from "../../constants/constant.js";

const styleRemove = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Members = () => {
  const { user } = useUserContext();
  const [alluser, setAlluser] = useState();
  const [deleteData, setDeleteData] = useState();

  const [id, setId] = useState();

  const [approveData, setApproveData] = useState();
  const [disApproveData, setDisApproveData] = useState();

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

  //delete modal/////////////////////////////////////
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = (data) => () => {
    setOpenDeleteModal(true);
    setDeleteData(data.row.original.id);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  ///////////////////////////////////////////////////

  //approve modal/////////////////////////////////////
  const [openApproveModal, setOpenApproveModal] = React.useState(false);
  const handleOpenApproveModal = (data) => () => {
    setOpenApproveModal(true);
    setApproveData(data.row.original);
  };
  const handleCloseApproveModal = () => setOpenApproveModal(false);
  ///////////////////////////////////////////////////

  //Disapprove modal/////////////////////////////////////
  const [openDisApproveModal, setOpenDisApproveModal] = React.useState(false);
  const handleOpenDisApproveModal = (data) => () => {
    setOpenDisApproveModal(true);
    setDisApproveData(data.row.original);
  };
  const handleCloseDisApproveModal = () => setOpenDisApproveModal(false);
  ///////////////////////////////////////////////////

  const fetchData = useCallback(async () => {
    const res = await get_all_members();
    setAlluser(res.data.data);
    setId(user?.member_id);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleRemoveUser = () => {
    remove_member(deleteData).then((res) => {
      if (res.data.success === 1) {
        setSnackbarF(true);
        setOpenDeleteModal(false);
        setMsgF(res.data.message)
      }

      fetchData();
    });
  };



  const handleApproveMember = () => {
    approve_member(approveData, id).then((res) => {
      if (res.data.success === 1) {
        setMsgS(res.data.message);
        handleCloseApproveModal();
        setSnackbarS(true);
        fetchData();
      }
    });
  };

  const handleDisApproveMember = () => {
    disapprove_member(disApproveData, id).then((res) => {
      if (res.data.success === 1) {
        setMsgF(res.data.message);
        handleCloseDisApproveModal();
        setSnackbarF(true);
        fetchData();
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
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: mainThemeColor }}
          >
            Do you want to remove this member ?
          </Typography>

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
                onClick={handleCloseDeleteModal}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRemoveUser}
                style={{ textTransform: "none", color: "red" }}
              >
                Remove
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openApproveModal}
        onClose={handleCloseApproveModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: mainThemeColor }}
          >
            Do you want to approve this member ?
          </Typography>

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
                onClick={handleApproveMember}
                style={{ textTransform: "none", color: mainThemeColor }}
              >
                Approve
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openDisApproveModal}
        onClose={handleCloseDisApproveModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: mainThemeColor }}
          >
            Do you want to Disapprove this member ?
          </Typography>
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
                onClick={handleCloseDisApproveModal}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDisApproveMember}
                style={{ textTransform: "none", color: "red" }}
              >
                Disapprove
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Table
        handleApproveModal={handleOpenApproveModal}
        handleDisApproveModal={handleOpenDisApproveModal}
        handleDeleteModal={handleOpenDeleteModal}
        row={alluser}
      />
    </div>
  );
};

export default Members;
