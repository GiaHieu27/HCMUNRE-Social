import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FeedIcon from "@mui/icons-material/Feed";
import PeopleIcon from "@mui/icons-material/People";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import { colors } from "@mui/material";

import { getTotalAnalyze } from "../../apis/admin";
import SummaryInfo from "../../components/admin/Dashboard/SummaryInfo";

function Dashboard() {
  const user = useSelector((state) => state.user);
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getTotalAnalyze(user.token);
        setSummaryData(res);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(summaryData);

  return (
    <Stack spacing={3.5}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card elevation={0} sx={{ boxShadow: 2 }}>
            <CardContent>
              {summaryData && (
                <SummaryInfo
                  title="Tổng số lượt truy cập"
                  number={summaryData.totalAccess}
                  icon={
                    <RoomOutlinedIcon
                      sx={{ fontSize: "3rem" }}
                      color="secondary"
                    />
                  }
                />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card elevation={0} sx={{ boxShadow: 2 }}>
            <CardContent>
              {summaryData && (
                <SummaryInfo
                  title="Tổng số người dùng"
                  number={summaryData.totalUser}
                  icon={
                    <PeopleIcon sx={{ fontSize: "3rem" }} color="warning" />
                  }
                />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card elevation={0} sx={{ boxShadow: 2 }}>
            <CardContent>
              {summaryData && (
                <SummaryInfo
                  title="Người dùng mới"
                  number={summaryData.newUsers.length}
                  icon={
                    <PersonOutlineOutlinedIcon
                      sx={{ fontSize: "3rem" }}
                      color="success"
                    />
                  }
                />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card elevation={0} sx={{ boxShadow: 2 }}>
            <CardContent>
              {summaryData && (
                <SummaryInfo
                  title="Tổng số bài viết"
                  number={summaryData.totalPost}
                  icon={
                    <ArticleIcon sx={{ fontSize: "3rem" }} color="primary" />
                  }
                />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card
            elevation={0}
            sx={{
              // boxShadow: 2,
              border: "2px solid",
              borderColor: colors.red.A700,
            }}
          >
            <CardContent>
              {summaryData && (
                <SummaryInfo
                  pending
                  title="Bài viết chưa duyệt"
                  number={summaryData.totalPostHasNotBeenApproved}
                  icon={
                    <PendingActionsIcon
                      sx={{ fontSize: "3rem" }}
                      color="error"
                    />
                  }
                />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card elevation={0} sx={{ boxShadow: 2 }}>
            <CardContent>
              {summaryData && (
                <SummaryInfo
                  title="Bài viết mới"
                  number={summaryData.newPosts.length}
                  icon={<FeedIcon sx={{ fontSize: "3rem" }} color="success" />}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* <Grid container spacing={2}>
        <Grid item xs={4} paddingLeft={0}>
          <Card elevation={0} sx={{ boxShadow: 2 }}>
            <CardHeader
              title={<Typography variant="h6">Vaccinated analysts</Typography>}
            />
            <CardContent>
              {summaryData && (
                <VaccinatedChart
                  chartData={summaryData.userVaccinatedAnalyst}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={8}>
          <Card elevation={0} sx={{ boxShadow: 2 }}>
            <CardHeader
              title={<Typography variant="h6">Lastest Vaccine Lots</Typography>}
              action={
                <Button
                  variant="text"
                  disableElevation
                  component={Link}
                  to="/vaccine"
                >
                  Manage vaccine
                </Button>
              }
            />
            <CardContent>
              {summaryData && (
                <LastestVaccineLotTable list={summaryData.lastestVaccineLot} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
    </Stack>
  );
}

export default Dashboard;
