import { IError } from "models/general/ErrorType";
import { Link, useNavigate } from "react-router-dom";
import withAuthLayout from "src/hoc/withAuthLayout";
import { Images, InitialValues, Paths } from "constants/index";
import { IForgotResponse } from "src/models/api/ForgotResponse";
import { useForm, Controller } from "react-hook-form";
import { IForgotPassword } from "src/models/data/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordValidation } from "src/utils/Validations";
import { useForgotPasswordMutation } from "src/store/services/authService";
import Controls from "src/components/controls/Controls";
import { Box, Stack, Typography } from "@mui/material";
import { useNotification } from "src/hooks/useNotification";
import ButtonLoader from "src/components/common/Loader/ButtonLoader";

type ForgotPasswordResponseData = {
  data: IForgotResponse;
  error: IError;
};

const ForgotPassword = () => {
  const { displayNotification } = useNotification();
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<IForgotPassword>({
    resolver: yupResolver(forgotPasswordValidation),
    defaultValues: InitialValues.forgotPasswordValues,
  });

  const onSubmit = async (data: IForgotPassword) => {
    const forgotPasswordData: IForgotPassword = {
      email: data.email,
    };
    try {
      const { data, error } = (await forgotPassword(
        forgotPasswordData
      )) as ForgotPasswordResponseData;
      if (error) {
        console.error("Forgot password failed:", error);
        return;
      }
      console.log("Forgot password successful:", data);
      displayNotification({ message: "Email Verified" });
      navigate(Paths.OTP, { state: { email: getValues("email") } });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Stack
      justifyContent="center"
      width="270px"
      height="100%"
      mx="auto"
      gap="8px"
    >
      <Link
        className="pb-4 flex gap-x-2 items-center cursor-pointer w-max"
        to={Paths.LOGIN}
      >
        <img src={Images.BACK_ARROW} width={15} alt="back-arrow" />
        <Typography fontSize="12px" fontWeight={500}>
          Back
        </Typography>
      </Link>
      <Typography fontSize="16px" lineHeight="24px" fontWeight={700}>
        Forgot Password
      </Typography>
      <Typography fontSize="12px" lineHeight="16px" fontWeight={600}>
        Enter your email to recover the password.
      </Typography>
      <Typography variant="body1" fontSize="12px">
        We have sent a password recover instruction to your email.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack gap="10px">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Controls.Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={field.value}
                onChange={field.onChange}
                error={errors.email?.message}
              />
            )}
          />
          <Box mx="auto">
            <Controls.Button type="submit" disabled={isLoading}>
              Continue
              {isLoading && <ButtonLoader />}
            </Controls.Button>
          </Box>
        </Stack>
      </form>
    </Stack>
  );
};

export default withAuthLayout(ForgotPassword);
