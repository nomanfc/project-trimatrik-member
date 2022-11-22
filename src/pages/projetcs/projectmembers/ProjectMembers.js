import React, { useState, useEffect, useCallback } from "react";
import Table from "./SortingTable.js";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import {
  get_members_by_project_id,
  delete_project_member,
  get_project_by_id,
} from "../../../http_requests/httpreq";
import { mainThemeColor } from "../../../constants/constant.js";

import AddProjectMember from "../addprojectmembers/AddProjectMember";
import EditProjectMember from "../editprojectmember/EditProjectMember";

const styleRemove = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 6,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProjectMembers = () => {
  const [alluser, setAlluser] = useState();
  const [deleteData, setDeleteData] = useState();
  const [editData, setEditData] = useState();
  const [projectDetails, setProjectDetails] = useState();
  const [msgF, setMsgF] = useState();
  const router = useRouter();
  const {
    query: { data },
  } = router;

  //////////////////////////////////////////////
  const [SnackbarDel, setSnackbarDel] = useState(false);
  const handleCloseSnackDel = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarDel(false);
  };
  ///////////////////////////////////////////////

  //delete modal/////////////////////////////////////
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = (data) => () => {
    setOpenDeleteModal(true);
    setDeleteData(data.row.original);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  ///////////////////////////////////////////////////

  //Add member modal/////////////////////////////////////
  const [openAddMemberModal, setOpenAddMemberModal] = React.useState(false);
  const handleOpenAddMemberModal = () => {
    setOpenAddMemberModal(true);
  };
  const handleCloseAddMemberModal = () => setOpenAddMemberModal(false);
  ///////////////////////////////////////////////////

  //Edit member modal/////////////////////////////////////
  const [openEditMemberModal, setOpenEditMemberModal] = React.useState(false);
  const handleOpenEditMemberModal = (data) => () => {
    setOpenEditMemberModal(true);
    setEditData(data.row.original);
  };
  const handleCloseEditMemberModal = () => setOpenEditMemberModal(false);
  ///////////////////////////////////////////////////

  const fetchData = useCallback(async () => {
    const res = await get_members_by_project_id(parseInt(data));
    setAlluser(res.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  useEffect(() => {
    get_project_by_id(data).then((res) => {
      setProjectDetails(res.data.data);
    });
  }, []);

  const handleRemoveProjectMember = () => {
    delete_project_member(deleteData).then((res) => {
      if (res.data.success === 1) {
        setSnackbarDel(true);
        setOpenDeleteModal(false);
        setMsgF(res.data.message);
      }

      fetchData();
    });
  };

  return (
    <div>
      <Snackbar
        open={SnackbarDel}
        autoHideDuration={3000}
        onClose={handleCloseSnackDel}
      >
        <Alert
          onClose={handleCloseSnackDel}
          severity="success"
          sx={{ width: "100%", background: "#F88379" }}
        >
          {msgF}
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
            Do you want to remove this project member?
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
                onClick={handleRemoveProjectMember}
                style={{ textTransform: "none", color: "red" }}
              >
                Remove
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openAddMemberModal}
        onClose={handleCloseAddMemberModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <div style={{ color: mainThemeColor, fontWeight: 700 }}>
            Add Member To This Project
          </div>
          <AddProjectMember
            handleCloseAddMemberModal={handleCloseAddMemberModal}
            projectId={data}
            fetchData={fetchData}
          />
        </Box>
      </Modal>

      <Modal
        open={openEditMemberModal}
        onClose={handleCloseAddMemberModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <div
            style={{ color: mainThemeColor, fontWeight: 700, fontSize: "25px" }}
          >
            Update Share Amount
          </div>
          <EditProjectMember
            handleCloseEditMemberModal={handleCloseEditMemberModal}
            editData={editData}
            fetchData={fetchData}
          />
        </Box>
      </Modal>

      <div
        style={{
          fontSize: "15px",
          fontWeight: 700,
          margin: "0px auto 10px auto",
          display: " flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <span style={{ color: mainThemeColor }}>Project Name: </span>
          {projectDetails?.project_name}{" "}
        </div>

        <div>
          <span style={{ color: mainThemeColor }}>Total Members: </span>
          {alluser && alluser.length || "0"}{" "} 
        </div>

        <div>
          <span style={{ color: mainThemeColor }}>Total Share: </span>
          {projectDetails?.total_share}{" "}
        </div>

        <div>
          <Button
            style={{
              textTransform: "none",
              fontSize: "15px",
              fontWeight: 700,
              color: "#FFFFFF",
              background: mainThemeColor,
              padding: "8px 20px"
            }}
            onClick={handleOpenAddMemberModal}
          >
            Add Member
          </Button>
        </div>
      </div>

      <Table
        handleModal={handleOpenDeleteModal}
        handleDeleteModal={handleOpenDeleteModal}
        handleEditModal={handleOpenEditMemberModal}
        row={alluser}
      />
    </div>
  );
};

export default ProjectMembers;
