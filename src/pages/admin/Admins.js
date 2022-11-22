import React, { useState, useEffect, useCallback } from "react";
import Table from "./SortingTable.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import {
  get_all_admins,
  activate_admin,
  deactivate_admin,
  delete_admin,
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

const Admins = () => {
  const { user } = useUserContext();
  const [alluser, setAlluser] = useState();
  const [deleteData, setDeleteData] = useState();

  const [id, setId] = useState();

  const [activateAdminData, setActivateAdminData] = useState();
  const [deActivateAdminData, setDeActivateAdminData] = useState();

  const [msgS, setMsgS] = useState("");
  const [msgF, setMsgF] = useState("");

  //fetching data
  const fetchData = useCallback(async () => {
    const res = await get_all_admins();
    setAlluser(res.data.data);
    setId(user?.user_id);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  //////////////////////////////////////////////
  const [SnackbarS, setSnackbarS] = useState(false);
  const handleCloseSnackS = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarS(false);
  };
  ///////////////////////////////////////////////

  //////////////////////////////////////////////
  const [SnackbarF, setSnackbarF] = useState(false);
  const handleCloseSnackF = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarF(false);
  };
  ///////////////////////////////////////////////

  //delete modal/////////////////////////////////////
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = (data) => () => {
    setOpenDeleteModal(true);
    setDeleteData(data.row.original.member_id);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  ///////////////////////////////////////////////////

  //activate admin modal/////////////////////////////////////
  const [openActivateAdminModal, setOpenActivateAdminModal] =
    React.useState(false);
  const handleOpenActivateAdminModal = (data) => () => {
    setOpenActivateAdminModal(true);
    setActivateAdminData(data.row.original);
  };
  const handleCloseActivateAdminModal = () => setOpenActivateAdminModal(false);
  ///////////////////////////////////////////////////

  //deactivate admin modal/////////////////////////////////////
  const [openDeActivateAdminModal, setOpenDeActivateAdminModal] =
    React.useState(false);
  const handleOpenDeActivateAdminModal = (data) => () => {
    setOpenDeActivateAdminModal(true);
    setDeActivateAdminData(data.row.original);
  };
  const handleCloseDeActivateAdminModal = () =>
    setOpenDeActivateAdminModal(false);
  ///////////////////////////////////////////////////

  const handleRemoveUser = () => {
    delete_admin(deleteData).then((res)=>{
      if(res.data.success === 1) {
        setMsgF(res.data.message);
        handleCloseDeleteModal();
        setSnackbarF(true);
        fetchData();
      }
    })
  };

  const handleActivateAdmin = () => {
    activate_admin(activateAdminData).then((res)=>{
      if(res.data.success === 1){
        setMsgS(res.data.message);
        handleCloseActivateAdminModal();
        setSnackbarS(true);
        fetchData();
      }
    })
  };

  const handleDeActivateAdmin = () => {
    deactivate_admin(deActivateAdminData).then((res)=>{
      if(res.data.success === 1){
        setMsgF(res.data.message);
        handleCloseDeActivateAdminModal();
        setSnackbarF(true);
        fetchData();
      }
    })
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
          sx={{ width: "100%", background: "##599f22" }}
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
            style={{ color: "#599f22" }}
          >
            Do you want to remove this admin ?
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
        open={openActivateAdminModal}
        onClose={handleCloseActivateAdminModal}
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
            Do you want to activate this admin ?
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
                onClick={handleCloseActivateAdminModal}
              >
                Cancel
              </Button>
              <Button
                onClick={handleActivateAdmin}
                style={{ textTransform: "none", color: mainThemeColor }}
              >
                Activate
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openDeActivateAdminModal}
        onClose={handleCloseDeActivateAdminModal}
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
            Do you want to deactivate this admin ?
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
                onClick={handleCloseDeActivateAdminModal}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeActivateAdmin}
                style={{ textTransform: "none", color: "red" }}
              >
                Deactivate
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Table
        handleDeleteModal={handleOpenDeleteModal}
        handleOpenActivateAdminModal={handleOpenActivateAdminModal}
        handleOpenDeActivateAdminModal={handleOpenDeActivateAdminModal}
        row={alluser}
      />
    </div>
  );
};

export default Admins;
