import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const DefaultSkelton = () => {
  return (
    <Box>
      <Stack>
        <Skeleton variant="rectangular" width="100%" height={200} />
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="100%" />
      </Stack>
    </Box>
  );
};

export default DefaultSkelton;
