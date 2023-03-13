import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ROUTES } from '../../routes/routes';
import { SignInFormStyles } from './styles';
import { useNavigate } from 'react-router-dom';
import { IUserSignIn } from '../../types/user';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AuthContext, IAuthResponse } from '../../contexts/Auth';

export const SignInForm = () => {
  const { handleLogin } = useContext(AuthContext);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<IUserSignIn>();
  const onSubmit: SubmitHandler<IUserSignIn> = data => {
    createUserMutation.mutate(data);
  };

  const createUserMutation = useMutation<IAuthResponse, Error, IUserSignIn>(
    ['login'],
    handleLogin,
    {
      onSuccess: ({ accessToken, userId }: IAuthResponse) => {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('userId', userId);
        toast({
          title: 'Usuário logado',
          status: 'success',
          duration: 1600,
          isClosable: true,
        });
        reset();
        clearErrors();
        navigate(ROUTES.home);
      },
      onError: error => {
        if (error instanceof AxiosError) {
          setError('email', { type: 'custom' });
          setError('password', { type: 'custom' });
          toast({
            title: error.response?.data.message,
            status: 'error',
            duration: 1600,
            isClosable: true,
          });
        }
      },
    },
  );

  return (
    <Flex sx={SignInFormStyles.formContainer}>
      <Flex
        as="form"
        sx={SignInFormStyles.formWrapper}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading sx={SignInFormStyles.title}>Login</Heading>
        <FormControl
          isInvalid={!!errors.email}
          sx={SignInFormStyles.formControl}
        >
          <FormLabel sx={SignInFormStyles.formLabel}>E-mail:</FormLabel>
          <Input
            sx={SignInFormStyles.input}
            variant="filled"
            type="text"
            placeholder="Digite seu e-mail"
            {...register('email', {
              required: {
                value: true,
                message: 'O campo de e-mail não pode estar vazio',
              },
            })}
            name="email"
          />
          <Box sx={SignInFormStyles.formErrorWrapper}>
            <FormErrorMessage sx={SignInFormStyles.formErrorMessage}>
              {errors.email?.message}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <FormControl
          isInvalid={!!errors.password}
          sx={SignInFormStyles.formControl}
        >
          <FormLabel sx={SignInFormStyles.formLabel}>Senha:</FormLabel>
          <Box sx={SignInFormStyles.inputPasswordWrapper}>
            <Input
              variant="filled"
              sx={SignInFormStyles.inputPassword}
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              {...register('password', {
                required: {
                  value: true,
                  message: 'O campo de senha não pode estar vazio',
                },
              })}
              name="password"
            />
            {!showPassword ? (
              <ViewOffIcon
                sx={SignInFormStyles.eyeIcon}
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <ViewIcon
                sx={SignInFormStyles.eyeIcon}
                onClick={() => setShowPassword(false)}
              />
            )}
          </Box>
          <Box sx={SignInFormStyles.formErrorWrapper}>
            <FormErrorMessage sx={SignInFormStyles.formErrorMessage}>
              {errors.password?.message}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <Flex sx={SignInFormStyles.buttonWrapper}>
          <Flex sx={SignInFormStyles.adviceContainer}>
            <Text sx={SignInFormStyles.textAdvice}>Não tem cadastro ?</Text>
            <Link
              sx={SignInFormStyles.link}
              onClick={() => navigate(ROUTES.signUp)}
            >
              Criar Conta
            </Link>
          </Flex>
          <Button sx={SignInFormStyles.button} type="submit">
            Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
