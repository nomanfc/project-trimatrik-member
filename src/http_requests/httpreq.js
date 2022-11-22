import axios from "axios";
import { BASE_URL_TRIMATRIK } from "../constants/constant";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: BASE_URL_TRIMATRIK,
});

/*....................API interceptors...............*/
API.interceptors.request.use((req) => {
  if (Cookies.get("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(Cookies.get("user"))?.token
    }`;
  }
  return req;
});

/*....................TriMatrik30BCS API CALLS...............*/

/*....................ADMIN API CALLS...............*/

// Member Login
export const login_member = (loginData) => {
  return API.post("/trimatrik/api/member/login", loginData);
};

// get All Admins
export const get_all_admins = () => {
  return API.get("/trimatrik/api/admin/get/all");
};

//activate admin
export const activate_admin = (activateAdminData) => {
  return API.post("/trimatrik/api/admin/manage/active", {
    is_active: 1,
    member_id: activateAdminData.member_id,
  });
};

//deactivate admin
export const deactivate_admin = (deActivateAdminData) => {
  return API.post("/trimatrik/api/admin/manage/active", {
    is_active: 0,
    member_id: deActivateAdminData.member_id,
  });
};

//create admin
export const create_admin = (adminData) => {
  return API.post("/trimatrik/api/admin/create", adminData);
};

//Delete Admin
export const delete_admin = (deleteData) => {
  return API.post("/trimatrik/api/admin/delete", { member_id: deleteData });
};

/*....................Member API CALLS...............*/

// get All Members
export const get_all_members = () => {
  return API.get("/trimatrik/api/member/get/all");
};

//Approve Member
export const approve_member = (approveData, id) => {
  return API.post("/trimatrik/api/member/manage/approve", {
    is_approved: 1,
    verifier_user_id: id,
    id: approveData.id,
  });
};

//Disapprove Member
export const disapprove_member = (disApproveData, id) => {
  return API.post("/trimatrik/api/member/manage/approve", {
    is_approved: 0,
    verifier_user_id: id,
    id: disApproveData.id,
  });
};

//create member
export const create_member = (memberData) => {
  return API.post("/trimatrik/api/member/create", memberData);
};

//remove member
export const remove_member = (deleteData) => {
  return API.post("/trimatrik/api/member/remove", { id: deleteData });
};

//get member by id
export const get_member_by_id = (data) => {
  return API.get(`/trimatrik/api/member/get/${parseInt(data)}`);
};

//update member
export const update_member = (edit) => {
  return API.post("/trimatrik/api/member/update", edit);
};
//update member panel
export const update_member_panel = (memberData) => {
  return API.post("/trimatrik/api/member/update", memberData);
};

//change password
export const update_password = (pass, id) => {
  return API.post("/trimatrik/api/admin/change/password", {
    member_id: id,
    old_password: pass.old_password,
    new_password: pass.new_password,
  });
};

//update member phone   number
export const update_member_phone = (updatePhoneData) => {
  return API.post("/trimatrik/api/member/update/phone", {
    phone: updatePhoneData.phone,
    id: updatePhoneData.id,
  });
};

/*....................Designation API CALLS...............*/

//get all designations
export const get_all_designation = () => {
  return API.get("/trimatrik/api/designation/get/all");
};

//create designation
export const create_designation = (designation) => {
  return API.post("/trimatrik/api/designation/create", { value: designation });
};

//remove designation
export const remove_designation = (removeDesignationData) => {
  return API.post("/trimatrik/api/designation/remove", {
    id: removeDesignationData,
  });
};

//edit designation
export const edit_designation = (designation) => {
  return API.post("/trimatrik/api/designation/update", designation);
};

/*....................CADRE API CALLS...............*/

//get all cadres
export const get_all_cadre = () => {
  return API.get("/trimatrik/api/cadre/type/get/all");
};

//create cadre
export const create_cadre = (cadre) => {
  return API.post("/trimatrik/api/cadre/type/create", { value: cadre });
};

//create cadre
export const remove_cadre = (removeCadreData) => {
  return API.post("/trimatrik/api/cadre/type/remove", { id: removeCadreData });
};

//edit cadre type
export const edit_cadre = (cadre) => {
  return API.post("/trimatrik/api/cadre/type/update", cadre);
};

/*....................Payment API CALLS...............*/
//get all payments
export const get_all_payment = () => {
  return API.get("/trimatrik/api/payment/type/get/all");
};

/*....................Project API CALLS...............*/

//get all projects
export const get_all_project = () => {
  return API.get("/trimatrik/api/project/get/all");
};

//create project
export const create_project = (projectData) => {
  return API.post("/trimatrik/api/project/create", projectData);
};

//get project by id
export const get_project_by_id = (data) => {
  return API.get(`/trimatrik/api/project/get/${parseInt(data)}`);
};

//get  all project by memberid
export const get_all_project_by_member_id = (data) => {
  return API.get(`/trimatrik/api/project/get/all/${parseInt(data)}`);
};

//remove project
export const remove_project = (deleteData) => {
  return API.post("/trimatrik/api/project/remove", { id: deleteData });
};

//update project
export const update_project = (alluser, id) => {
  return API.post("/trimatrik/api/project/update", {
    project_name: alluser.project_name,
    registration_fee: alluser.registration_fee,
    total_share: alluser.total_share,
    creator_user_id: id,
    id: alluser.id,
  });
};

/*....................Project Member API CALLS...............*/

//get members by project id
export const get_members_by_project_id = (data) => {
  return API.get(`/trimatrik/api/project/member/${data}`);
};

//add member to project
export const add_project_member = (adminData) => {
  return API.post("/trimatrik/api/project/member/add", adminData);
};

//delete project member
export const delete_project_member = (deleteData) => {
  return API.post("/trimatrik/api/project/member/remove", {
    project_id: deleteData.project_id,
    member_id: deleteData.member_id,
  });
};

//edit project member
export const update_project_member = (editData) => {
  return API.post("/trimatrik/api/project/member/update", editData);
};

/*............................Dashboard.......................*/

//getBarchartData
export const getBarChartData = (id, year) => {
  return API.get(
    `/trimatrik/api/dashboard/bar_chart/collection/monthly_fee/${id}/${year}`
  );
};

export const getBarChartDefaultData = (id, year) => {
  return API.get(
    `/trimatrik/api/dashboard/bar_chart/collection/monthly_fee/${1}/${year}`
  );
};

//getdashData
export const get_dash_data = () => {
  return API.get(`/trimatrik/api/dashboard/admin/data`);
};

//getdashData
export const get_dash_data_by_id = (data) => {
  return API.get(`/trimatrik/api/dashboard/member/data/${data}`);
};

//get pie data
export const get_pie_data = () => {
  return API.get(`/trimatrik/api/dashboard/pie_chart/collection/all`);
};

//get pie data by member id
export const get_pie_data_by_id = (id) => {
  return API.get(`/trimatrik/api/dashboard/pie_chart/payout/member/${id}`);
};

/*......................Payment type settings..........................*/

//get all payment type
export const get_all_payment_type_data = () => {
  return API.get(`/trimatrik/api/payment/type/get/all`);
};

//create payment type
export const create_payment_type = (paymentType) => {
  return API.post(`/trimatrik/api/payment/type/create`, paymentType);
};

//edit payment type
export const edit_payment_type = (paymentType) => {
  return API.post(`/trimatrik/api/payment/type/update`, paymentType);
};

//delete payment type
export const delete_payment_type = (paymentTypeData) => {
  return API.post(`/trimatrik/api/payment/type/remove`, {
    id: paymentTypeData,
  });
};

/*............................Payout Request.............................*/

//get all payout request
export const get_all_payout_request = () => {
  return API.get(`/trimatrik/api/payout/request/all`);
};

//get all payout request by member id
export const get_all_payout_request_by_member_id = (data) => {
  return API.get(`/trimatrik/api/payout/request/all/${data}`);
};

//verifiaction
export const payout_verification_any = (verifiactionData, id) => {
  return API.post(`/trimatrik/api/payout/request/verify`, {
    member_id: verifiactionData?.member_id,
    member_payable_id: verifiactionData?.member_payable_id,
    is_verified: 1,
    verifier_member_id: id,
    payment_type_id: verifiactionData?.payment_type_id,
    id: verifiactionData?.id,
    billing_token: verifiactionData?.billing_token,
  });
};

/* ...........................Member Payable............................. */
//get all payout request
export const get_all_payoutable = () => {
  return API.get(`/trimatrik/api/member/payable/all`);
};

//get paybale by member id
export const get_all_payoutable_by_memeber_id = (data) => {
  return API.get(`/trimatrik/api/member/payable/all/${data}`);
};

//add payable
export const add_payable = (adminData) => {
  return API.post(`/trimatrik/api/member/payable/add`, adminData);
};

//get Share amount by member and project id
export const get_share_amount = (member_id, project_id) => {
  return API.get(
    `/trimatrik/api/project/member/share/${member_id}/${project_id}`
  );
};

//send payout request
export const payout_request = (verifiactionData) => {
  return API.post(`/trimatrik/api/payout/request/member/create`, {
    sender_member_id: verifiactionData?.member_id,
    payment_proof_file: "demo_file",
    id: verifiactionData?.id,
    billing_token: verifiactionData?.billing_token,
    transaction_identifier_string:
      verifiactionData?.transaction_identifier_string,
  });
};


