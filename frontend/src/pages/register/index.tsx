// ** React Imports
import { ReactNode, useState, Fragment, MouseEvent } from "react";

// ** Next Imports
import Link from "next/link";

// ** MUI Components
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Box, { BoxProps } from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import useMediaQuery from "@mui/material/useMediaQuery";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography, { TypographyProps } from "@mui/material/Typography";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Third Party Imports
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Hooks
import { useAuth } from "src/hooks/useAuth";
import { useSettings } from "src/@core/hooks/useSettings";

// ** Demo Imports
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";



const defaultValues = {
  email: "",
  username: "",
  password: "",
  terms: false,
};
interface FormData {
  email: string;
  terms: boolean;
  username: string;
  password: string;
}

// ** Styled Components
const RegisterIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10),
  },
}));

const RegisterIllustration = styled("img")(({ theme }) => ({
  maxWidth: "46rem",
  [theme.breakpoints.down("lg")]: {
    maxWidth: "35rem",
  },
}));

const TreeIllustration = styled("img")(({ theme }) => ({
  bottom: 0,
  left: "1.875rem",
  position: "absolute",
  [theme.breakpoints.down("lg")]: {
    left: 0,
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
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // ** Hooks
  const theme = useTheme();
  const { register } = useAuth();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  // ** Vars
  const { skin } = settings;
  const schema = yup.object().shape({
    password: yup.string().min(5).required(),
    username: yup.string().min(3).required(),
    email: yup.string().email().required(),
    terms: yup
      .bool()
      .oneOf([true], "You must accept the privacy policy & terms"),
  });

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const { email, username, password } = data;
   
    register({ email, username, password }, (err) => {
      if (err.email) {
        setError("email", {
          type: "manual",
          message: err.email,
        });
      }
      if (err.username) {
        setError("username", {
          type: "manual",
          message: err.username,
        });
      }
    });
  };

  const imageSource =
    skin === "bordered"
      ? "auth-v2-register-illustration-bordered"
      : "auth-v2-register-illustration";

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
          <RegisterIllustrationWrapper>
            <RegisterIllustration
              alt="register-illustration"
              src={`/images/pages/insurance-ill-removebg-preview.png`}
            />
          </RegisterIllustrationWrapper>
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
                A healthy life starts here 🚀
              </TypographyStyled>
              <Typography variant="body2">
                Make your insurance management easy!
              </Typography>
            </Box>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      value={value}
                      onBlur={onBlur}
                      label="Username"
                      onChange={onChange}
                      placeholder="johndoe"
                      error={Boolean(errors.username)}
                    />
                  )}
                />
                {errors.username && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.username.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      label="Email"
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder="user@email.com"
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel
                  htmlFor="auth-login-v2-password"
                  error={Boolean(errors.password)}
                >
                  Password
                </InputLabel>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      label="Password"
                      onBlur={onBlur}
                      onChange={onChange}
                      id="auth-login-v2-password"
                      error={Boolean(errors.password)}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon
                              icon={
                                showPassword
                                  ? "mdi:eye-outline"
                                  : "mdi:eye-off-outline"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                sx={{ mt: 1.5, mb: 4 }}
                error={Boolean(errors.terms)}
              >
                <Controller
                  name="terms"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <FormControlLabel
                        sx={{
                          ...(errors.terms ? { color: "error.main" } : null),
                          "& .MuiFormControlLabel-label": {
                            fontSize: "0.875rem",
                          },
                        }}
                        control={
                          <Checkbox
                            checked={value}
                            onChange={onChange}
                            sx={errors.terms ? { color: "error.main" } : null}
                          />
                        }
                        label={
                          <Fragment>
                            <Typography
                              variant="body2"
                              component="span"
                              sx={{ color: errors.terms ? "error.main" : "" }}
                            >
                              I agree to{" "}
                            </Typography>
                            <LinkStyled
                              href="/"
                              onClick={(e: MouseEvent<HTMLElement>) =>
                                e.preventDefault()
                              }
                            >
                              privacy policy & terms
                            </LinkStyled>
                          </Fragment>
                        }
                      />
                    );
                  }}
                />
                {errors.terms && (
                  <FormHelperText sx={{ mt: 0, color: "error.main" }}>
                    {errors.terms.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ mb: 7 }}
              >
                Sign up
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Already have an account?
                </Typography>
                <Typography variant="body2">
                  <LinkStyled href="/login">Sign in instead</LinkStyled>
                </Typography>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  );
};

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

Register.guestGuard = true;

export default Register;
