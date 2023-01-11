import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import ReportIcon from "@mui/icons-material/Report";
import DeleteIcon from "@mui/icons-material/Delete";

import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { delAccount, getTotalAnalyze, lockAccount } from "../../../apis/admin";
import PageHeader from "../../../components/admin/PageHeader";
import SearchToolbar from "../../../components/SearchToolBar";
import TooltipMUI from "../../../components/TooltipMUI";
import CustomDialog from "../../../components/CustomDialog";

function User() {
  const user = useSelector((state) => state.user);

  const [userList, setUserList] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(9);
  const [show, setShow] = React.useState(false);
  const [id, setId] = React.useState("");

  const handleLockAcc = async (userId, token) => {
    const res = await lockAccount(userId, token);

    if (typeof res === "object") {
      const allUser = res.allUser.filter((user) => {
        return !user.isAdmin;
      });
      setUserList(allUser);
    }
  };

  const handleDelAcc = async (userId, token) => {
    const res = await delAccount(userId, token);
    if (res.status) {
      const newUserList = userList.filter((user) => {
        return user._id !== userId;
      });

      setUserList(newUserList);
      setShow(false);
    }
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getTotalAnalyze(user.token);
        const allUser = res.allUser.filter((user) => {
          return !user.isAdmin;
        });
        setUserList(allUser);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [user.token]);

  let columns = [
    {
      field: "full_name",
      headerName: "Tên người dùng",
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            component={Link}
            to={`/admin/user/${params.row.id}`}
          >
            {params.value}
          </Button>
        );
      },
      width: 180,
    },
    {
      field: "email",
      headerName: "Email",
      width: 190,
    },
    {
      field: "accesses",
      headerName: "Số lượt truy cập",
      width: 140,
    },
    {
      field: "isLock",
      headerName: "Trạng thái",
      width: 190,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            color={!!params.value ? "red" : "green"}
          >
            {!!params.value ? <ReportIcon /> : <VerifiedUserIcon />}

            <Typography
              variant="body2"
              sx={{
                marginLeft: "5px",
                fontWeight: "500",
              }}
            >
              {!!params.value ? "Tài khoản đã bị khoá" : "Đang hoạt động"}
            </Typography>
          </Box>
        );
      },
    },
    { field: "gender", headerName: "Giới tính" },
    {
      field: "createdAt",
      headerName: "Ngày tạo tài khoản",
      width: 150,
      renderCell: (params) => moment(params.value).format("DD-MM-YYYY"),
    },
    {
      field: "_id",
      headerName: "Hành động",
      width: 130,
      renderCell: (params) => {
        // console.log(params);
        return (
          <>
            {!params.row.isLock ? (
              <TooltipMUI title="Khoá tài khoản" placement="top">
                <IconButton
                  aria-label="lock"
                  color="error"
                  onClick={() => handleLockAcc(params.value, user.token)}
                >
                  <LockIcon />
                </IconButton>
              </TooltipMUI>
            ) : (
              <TooltipMUI title="Mở khoá tài khoản" placement="top">
                <IconButton
                  aria-label="unlock"
                  color="success"
                  onClick={() => handleLockAcc(params.value, user.token)}
                >
                  <LockOpenIcon />
                </IconButton>
              </TooltipMUI>
            )}

            <TooltipMUI title="Chi tiết" placement="top">
              <IconButton
                aria-label="detail"
                color="primary"
                component={Link}
                to={`/admin/user/${params.value}`}
              >
                <OpenInNewOutlinedIcon />
              </IconButton>
            </TooltipMUI>

            <TooltipMUI title="Xóa tài khoản" placement="top">
              <IconButton
                aria-label="delete"
                color="error"
                // onClick={() => handleDelAcc(params.value, user.token)}
                onClick={() => {
                  setShow(true);
                  setId(params.value);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </TooltipMUI>
          </>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <PageHeader title={"Tất cả người dùng"} />

      <Paper>
        <DataGrid
          autoHeight
          getRowId={(r) => r._id}
          rows={userList}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[9, 50, 100]}
          onPageSizeChange={(size) => setPageSize(size)}
          showCellRightBorder
          showColumnRightBorder
          disableSelectionOnClick
          components={{ Toolbar: SearchToolbar }}
        />
      </Paper>

      <CustomDialog
        open={show}
        handleClose={() => setShow(false)}
        maxWidth={"400"}
        title={"Bạn có chắc chắn muốn xóa"}
        actions={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: " center",
            }}
            width="100%"
          >
            <Button
              sx={{
                width: "100px",
                height: "50px",
              }}
              onClick={() => setShow(false)}
            >
              Hủy
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{
                width: "100px",
                height: "50px",
                marginLeft: "43px",
              }}
              onClick={() => handleDelAcc(id, user.token)}
            >
              Xóa
            </Button>
          </Box>
        }
      />
    </Box>
  );
}

export default User;
