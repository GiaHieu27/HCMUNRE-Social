import React from "react";
import PropTypes from "prop-types";
import { Box, Stack, Typography, colors } from "@mui/material";

const SummaryInfo = ({ title, number, icon, pending }) => {
  return (
    <>
      {pending ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack spacing={2}>
            <Typography variant="body2" fontWeight={"600"}>
              {title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight={"600"}
              sx={{ color: colors.red.A700 }}
            >
              {number}
            </Typography>
          </Stack>
          <div>{icon}</div>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack spacing={2}>
            <Typography variant="body2" fontWeight={"600"}>
              {title}
            </Typography>

            <Typography variant="h4" fontWeight={"600"}>
              {number}
            </Typography>
          </Stack>
          <div>{icon}</div>
        </Box>
      )}
    </>
  );
};

SummaryInfo.propTypes = {
  title: PropTypes.string,
  number: PropTypes.number,
  icon: PropTypes.object,
};

export default SummaryInfo;
