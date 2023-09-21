// ** React Imports
import { ReactNode, SyntheticEvent } from "react";

// ** Next Imports
import Link from "next/link";
import { useState } from "react";

// ** MUI Components
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box, { BoxProps } from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import Typography, { TypographyProps } from "@mui/material/Typography";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Hooks
import { useSettings } from "src/@core/hooks/useSettings";

// ** Demo Imports
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";

import { createClient } from "@supabase/supabase-js";

// Styled Components
const ForgotPasswordIllustrationWrapper = styled(Box)<BoxProps>(
  ({ theme }) => ({
    padding: theme.spacing(20),
    paddingRight: "0 !important",
    [theme.breakpoints.down("lg")]: {
      padding: theme.spacing(10),
    },
  })
);

const ForgotPasswordIllustration = styled("img")(({ theme }) => ({
  maxWidth: "53.125rem",
  [theme.breakpoints.down("lg")]: {
    maxWidth: "35rem",
  },
}));

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 450,
  },
}));

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    width: "100%",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
}));

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { mt: theme.spacing(8) },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  display: "flex",
  fontSize: "0.875rem",
  alignItems: "center",
  textDecoration: "none",
  justifyContent: "center",
  color: theme.palette.primary.main,
}));

const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme();
  const { settings } = useSettings();

  // ** Vars
  const { skin } = settings;
  const hidden = useMediaQuery(theme.breakpoints.down("md"));
  const [email, setEmail] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };
  const handleForgot = async (e: SyntheticEvent) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );
    console.log(email);
    let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/update-password",
    });
    console.log(data, error);
  };

  const imageSource =
    skin === "bordered"
      ? "auth-v2-forgot-password-illustration-bordered"
      : "auth-v2-forgot-password-illustration";

  return (
    <Box className="content-right">
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ForgotPasswordIllustrationWrapper>
            <ForgotPasswordIllustration
              alt="forgot-password-illustration"
              src={`/images/pages/health-medical-insurance-illustration-concept-isolated-people-patients-doctors_109722-583-removebg-preview.png`}
            />
          </ForgotPasswordIllustrationWrapper>
        </Box>
      ) : null}
      <RightWrapper
        sx={
          skin === "bordered" && !hidden
            ? { borderLeft: `1px solid ${theme.palette.divider}` }
            : {}
        }
      >
        <Box
          sx={{
            p: 12,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.paper",
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: "flex",
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width={50}
                height={50}
                viewBox="0 0 500.000000 500.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  id="logo"
                  transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
                  fill="#0072bb"
                  stroke="none"
                >
                  <path
                    d="M2232 4114 c-222 -35 -476 -134 -665 -257 -364 -237 -622 -608 -725
-1042 -25 -104 -27 -124 -27 -370 0 -233 2 -270 22 -358 49 -214 134 -412 257
-597 97 -146 301 -350 450 -449 460 -306 1014 -374 1529 -187 558 202 976 700
1083 1291 28 156 26 463 -4 614 -122 605 -548 1095 -1117 1284 -186 62 -285
78 -505 82 -150 3 -230 0 -298 -11z m788 -748 c336 -65 500 -192 531 -411 26
-188 -73 -355 -272 -454 -45 -23 -88 -41 -95 -41 -24 0 -15 -18 13 -25 55 -13
175 -81 226 -126 101 -90 146 -222 127 -371 -18 -143 -101 -259 -236 -330
-162 -85 -320 -110 -704 -112 l-275 -1 0 210 0 210 328 3 327 2 0 155 0 155
-327 2 -328 3 0 215 0 215 363 3 362 2 -2 161 -3 160 -520 0 c-286 -1 -532 -1
-547 -1 l-28 0 -2 -747 -3 -748 -210 0 -210 0 -3 948 -2 948 702 -4 c602 -3
715 -6 788 -21z"
                  />
                </g>
              </svg>
              <Typography
                variant="h6"
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  fontSize: "1.5rem !important",
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant="h5">
                Forgot Password? 🔒
              </TypographyStyled>
              <Typography variant="body2">
                Enter your email and we&prime;ll send you instructions to reset
                your password
              </Typography>
            </Box>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                autoFocus
                type="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                sx={{ display: "flex", mb: 4 }}
              />
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ mb: 5.25 }}
                onClick={handleForgot}
              >
                Send reset link
              </Button>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LinkStyled href="/login">
                  <Icon icon="mdi:chevron-left" />
                  <span>Back to login</span>
                </LinkStyled>
              </Typography>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  );
};

ForgotPassword.getLayout = (page: ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
);

ForgotPassword.guestGuard = true;

export default ForgotPassword;
