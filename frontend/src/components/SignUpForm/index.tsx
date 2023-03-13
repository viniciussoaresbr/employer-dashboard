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
import { SignUpFormStyles } from './styles';
import { useNavigate } from 'react-router-dom';
import {
  confirmingPassword,
  validatingEmail,
  validatingPassword,
} from '../../utils/validators';
import { ISignUpInputs, IUserSignUp } from '../../types/user';
import { useMutation } from '@tanstack/react-query';
import { UserContext } from '../../contexts/User';
import { AxiosError } from 'axios';

export const SignUpForm = () => {
  const { registerUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<ISignUpInputs>();
  const onSubmit: SubmitHandler<ISignUpInputs> = data => {
    delete data.confirmPassword;
    createUserMutation.mutate(data);
  };

  const createUserMutation = useMutation<
    { message: string },
    Error,
    IUserSignUp
  >(['registerUser'], registerUser, {
    onSuccess: data => {
      reset();
      clearErrors();
      toast({
        title: data.message,
        status: 'success',
        duration: 1600,
        isClosable: true,
      });
    },
    onError: error => {
      if (error instanceof AxiosError) {
        setError('email', {
          type: 'custom',
          message: error.response?.data.message,
        });
        toast({
          title: error.response?.data.message,
          status: 'error',
          duration: 1600,
          isClosable: true,
        });
      }
    },
  });

  return (
    <Flex sx={SignUpFormStyles.formContainer}>
      <Flex
        as="form"
        sx={SignUpFormStyles.formWrapper}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading sx={SignUpFormStyles.title}>Crie sua Conta</Heading>
        <FormControl
          isInvalid={!!errors.name}
          sx={SignUpFormStyles.formControl}
        >
          <FormLabel sx={SignUpFormStyles.formLabel}>Nome:</FormLabel>
          <Input
            sx={SignUpFormStyles.input}
            variant="filled"
            type="text"
            placeholder="Digite seu nome"
            {...register('name', {
              required: {
                value: true,
                message: 'O campo de nome não pode estar vazio',
              },
            })}
            name="name"
          />
          <Box sx={SignUpFormStyles.formErrorWrapper}>
            <FormErrorMessage sx={SignUpFormStyles.formErrorMessage}>
              {errors.name?.message}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <FormControl
          isInvalid={!!errors.lastname}
          sx={SignUpFormStyles.formControl}
        >
          <FormLabel sx={SignUpFormStyles.formLabel}>Sobrenome:</FormLabel>
          <Input
            sx={SignUpFormStyles.input}
            variant="filled"
            type="text"
            placeholder="Digite seu sobrenome"
            {...register('lastname', {
              required: {
                value: true,
                message: 'O campo de sobrenome não pode estar vazio',
              },
            })}
            name="lastname"
          />
          <Box sx={SignUpFormStyles.formErrorWrapper}>
            <FormErrorMessage sx={SignUpFormStyles.formErrorMessage}>
              {errors.lastname?.message}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <FormControl
          isInvalid={!!errors.email}
          sx={SignUpFormStyles.formControl}
        >
          <FormLabel sx={SignUpFormStyles.formLabel}>E-mail:</FormLabel>
          <Input
            sx={SignUpFormStyles.input}
            variant="filled"
            type="text"
            placeholder="Digite seu e-mail"
            {...register('email', {
              required: {
                value: true,
                message: 'O campo de e-mail não pode estar vazio',
              },
              validate: validatingEmail,
            })}
            name="email"
          />
          <Box sx={SignUpFormStyles.formErrorWrapper}>
            <FormErrorMessage sx={SignUpFormStyles.formErrorMessage}>
              {errors.email?.message}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <FormControl
          isInvalid={!!errors.password}
          sx={SignUpFormStyles.formControl}
        >
          <FormLabel sx={SignUpFormStyles.formLabel}>
            Digite sua senha:
          </FormLabel>
          <Box sx={SignUpFormStyles.inputPasswordWrapper}>
            <Input
              variant="filled"
              sx={SignUpFormStyles.inputPassword}
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              {...register('password', {
                required: {
                  value: true,
                  message: 'O campo de senha não pode estar vazio',
                },
                minLength: {
                  value: 8,
                  message: 'A senha deve conter pelo menos 8 caracteres',
                },
                maxLength: {
                  value: 18,
                  message: 'A senha deve conter no máximo 18 caracteres',
                },
                validate: validatingPassword,
              })}
              name="password"
            />
            {!showPassword ? (
              <ViewOffIcon
                sx={SignUpFormStyles.eyeIcon}
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <ViewIcon
                sx={SignUpFormStyles.eyeIcon}
                onClick={() => setShowPassword(false)}
              />
            )}
          </Box>
          <Box sx={SignUpFormStyles.formErrorWrapper}>
            <FormErrorMessage sx={SignUpFormStyles.formErrorMessage}>
              {errors.password?.message}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <FormControl
          isInvalid={!!errors.confirmPassword}
          sx={SignUpFormStyles.formControl}
        >
          <FormLabel sx={SignUpFormStyles.formLabel}>
            Confirme sua senha:
          </FormLabel>
          <Box sx={SignUpFormStyles.inputPasswordWrapper}>
            <Input
              variant="filled"
              sx={SignUpFormStyles.inputPassword}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirme sua senha"
              {...register('confirmPassword', {
                required: {
                  value: true,
                  message: 'O campo de confirmar senha não pode estar vazio',
                },
                validate: confirmingPassword,
              })}
              name="confirmPassword"
            />
            {!showConfirmPassword ? (
              <ViewOffIcon
                sx={SignUpFormStyles.eyeIcon}
                onClick={() => setShowConfirmPassword(true)}
              />
            ) : (
              <ViewIcon
                sx={SignUpFormStyles.eyeIcon}
                onClick={() => setShowConfirmPassword(false)}
              />
            )}
          </Box>
          <Box sx={SignUpFormStyles.formErrorWrapper}>
            <FormErrorMessage sx={SignUpFormStyles.formErrorMessage}>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <Flex sx={SignUpFormStyles.buttonWrapper}>
          <Flex>
            <Text sx={SignUpFormStyles.textAdvice}>Já tem cadastro ?</Text>
            <Link
              sx={SignUpFormStyles.link}
              onClick={() => navigate(ROUTES.login)}
            >
              Entrar
            </Link>
          </Flex>
          <Button sx={SignUpFormStyles.button} type="submit">
            Criar Conta
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
