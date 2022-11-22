import React, { useState, useEffect, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { mainThemeColor } from "../../constants/constant";
import { get_member_by_id } from "../../http_requests/httpreq";
import { useUserContext } from "../../contexts/UserContext";
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./PasswordChange";

import UpdatePhone from "./UpdatePhone";

const styleRemove = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleRemovePhone = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProfileSettings = () => {
  const { user } = useUserContext();
  const [profileData, setProfileData] = useState();
  const [msgS, setMsgS] = useState("");
  const [updatePhoneData, setUpdatePhoneData] = useState();

  const fetchData = useCallback(async () => {
    const res = await get_member_by_id(user?.id);
    setProfileData(res.data.data);
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

  //Update profile modal/////////////////////////////////////
  const [openUpdateProfileModal, setOpenUpdateProfileModal] =
    React.useState(false);
  const handleOpenUpdateProfileModal = () => {
    setOpenUpdateProfileModal(true);
  };
  const handleCloseUpdateProfileModal = () => setOpenUpdateProfileModal(false);
  ///////////////////////////////////////////////////

  //Change pass modal/////////////////////////////////////
  const [openChangePassModal, setOpenChangePassModal] = React.useState(false);
  const handleOpenChangePassModal = () => {
    setOpenChangePassModal(true);
    // setChangePassData(data.row.original.id);
  };
  const handleCloseChangePassModal = () => setOpenChangePassModal(false);

  //Update Phone modal/////////////////////////////////////
  const [openUpdatePhoneModal, setOpenUpdatePhoneModal] = React.useState(false);
  const handleOpenUpdatePhoneModal = () => {
    setOpenUpdatePhoneModal(true);
    setUpdatePhoneData(user);
  };
  const handleCloseUpdatePhoneModal = () => setOpenUpdatePhoneModal(false);
  ///////////////////////////////////////////////////

  return (
    <div>
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
        open={openUpdatePhoneModal}
        onClose={handleCloseUpdatePhoneModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemovePhone}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: mainThemeColor }}
          >
            Update Phone Number
          </Typography>

          <UpdatePhone
            fetchData={fetchData}
            setMsgS={setMsgS}
            handleCloseUpdatePhoneModal={handleCloseUpdatePhoneModal}
            setSnackbarS={setSnackbarS}
            user={user}
          />
        </Box>
      </Modal>

      <Modal
        open={openChangePassModal}
        onClose={handleCloseChangePassModal}
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
            Change Password
          </Typography>
          <ChangePassword
            handleClose={handleCloseChangePassModal}
            setMsgS={setMsgS}
            setSnackbarS={setSnackbarS}
            fetchData={fetchData}
          />
        </Box>
      </Modal>

      <Modal
        open={openUpdateProfileModal}
        onClose={handleCloseUpdateProfileModal}
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
            Update Profile
          </Typography>
          <div>
            <UpdateProfile
              profileData={profileData}
              handleCloseUpdateProfileModal={handleCloseUpdateProfileModal}
              setMsgS={setMsgS}
              setSnackbarS={setSnackbarS}
              fetchData={fetchData}
            />
          </div>
        </Box>
      </Modal>

      <div>
        <div
          style={{
            color: mainThemeColor,
            fontSize: "20px",
            fontWeight: 700,
            marginBottom: "5px",
          }}
        >
          Profile Details
        </div>
        <div>
          <div>Name</div>
          <div style={{ color: "#000000", fontWeight: 600 }}>
            {profileData?.id
              ? profileData?.first_name + " " + profileData?.last_name
              : "N/A"}
          </div>

          <div style={{ marginTop: "10px" }}>Cadre</div>
          <div style={{ color: "#000000", fontWeight: 600 }}>
            {" "}
            {profileData?.cadre_type ? profileData?.cadre_type : "N/A"}
          </div>

          <div style={{ marginTop: "10px" }}>Email</div>
          <div style={{ color: "#000000", fontWeight: 600 }}>
            {" "}
            {profileData?.email ? profileData?.email : "N/A"}
          </div>
        </div>
      </div>
      <Button
        style={{
          textTransform: "none",
          background: mainThemeColor,
          color: "#FFFFFF",
          marginTop: "15px",
        }}
        onClick={handleOpenUpdateProfileModal}
      >
        Update Profile
      </Button>

      <hr style={{ marginTop: "35px", color: "gray" }} />

      <div>
        <div
          style={{
            color: mainThemeColor,
            fontSize: "20px",
            fontWeight: 700,
            marginTop: "35px",
          }}
        >
          Phone Setting
        </div>

        <div style={{ marginTop: "10px" }}>Phone</div>
        <div style={{ color: "#000000", fontWeight: 600 }}>
          {" "}
          {profileData?.phone ? profileData?.phone : "N/A"}
        </div>

        <Button
          style={{
            textTransform: "none",
            background: mainThemeColor,
            color: "#FFFFFF",
            marginTop: "15px",
          }}
          onClick={handleOpenUpdatePhoneModal}
        >
          Update Phone Number
        </Button>
      </div>

      <hr style={{ marginTop: "35px", color: "gray" }} />

      <div>
        <div
          style={{
            color: mainThemeColor,
            fontSize: "20px",
            fontWeight: 700,
            marginTop: "35px",
            marginBottom: "15px",
          }}
        >
          Password Setting
        </div>
        <Button
          style={{
            textTransform: "none",
            background: mainThemeColor,
            color: "#FFFFFF",
          }}
          onClick={handleOpenChangePassModal}
        >
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
