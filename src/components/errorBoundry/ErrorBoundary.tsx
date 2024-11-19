import { Link } from "react-router-dom";
import { ErrorBoundary as Boundary } from "react-error-boundary";
import { Box, Typography, Link as MUILink, Button } from "@mui/material";
// import { logout } from "../../store/builders/auth/auth.builders";
import { FallbackProps } from "react-error-boundary";
import React, { ReactNode } from "react";
import { useAppDispatch } from "../../store/store";

// Define the type for FallbackComponent props (error and resetErrorBoundary)
const FallbackComponent: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const dispatch = useAppDispatch();

  const handleBackToSignIn = () => {
    // dispatch(logout());
    // removeUserSession()
    dispatch({ type: "auth/clearExtraReducers" }); // Clear extra reducer
    dispatch({ type: "branch/clearExtraReducers" });
    dispatch({ type: "course/clearExtraReducers" });
    dispatch({ type: "followup/clearExtraReducers" });
    dispatch({ type: "inquiry/clearExtraReducers" });
  };

  return (
    <Box
      sx={{
        p: 3,
        height: "90vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5">Looks like something went wrong!</Typography>
      <Box component="pre">{error.message}</Box>
      <Typography variant="body2">
        We track these errors automatically, but if the problem persists, feel free to{" "}
        <span className={"cursor-pointer"}>contact us</span>. In the meantime, try refreshing.
      </Typography>
      <Button onClick={resetErrorBoundary}>Try again</Button>
      <Box sx={{ my: 1 }}>OR</Box>
      <Typography variant="body2" sx={{ my: 1 }}>
        Go Back to{" "}
        <MUILink component={Link} to="/login" onClick={handleBackToSignIn}>
          Sign In Page
        </MUILink>
      </Typography>
    </Box>
  );
};

// Define the type for ErrorBoundary props (children)
interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return <Boundary FallbackComponent={FallbackComponent}>{children}</Boundary>;
};

export default ErrorBoundary;
