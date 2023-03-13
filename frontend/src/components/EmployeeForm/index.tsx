import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  Switch,
  useToast,
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import React, { useState, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EmployeeFormStyles } from './styles';
import { useNavigate } from 'react-router-dom';
import {
  validatingCep,
  validatingCpf,
  validatingEmail,
} from '../../utils/validators';
import { IEmployee } from '../../types/employee';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchingCityByState,
  fetchingStatesData,
} from '../../service/getLocation';
import { ICity, IState } from '../../types/location';
import { ROUTES } from '../../routes/routes';
import { PictureIcon } from '../../assets/PictureIcon';
import { EmployeeContext } from '../../contexts/Employee';
import { AxiosError } from 'axios';

export const EmployeeForm = () => {
  const { sendingImage, registerEmployee } = useContext(EmployeeContext);
  const [selectedState, setSelectedState] = useState('');
  const [avatarId, setAvatarId] = useState('');
  const toast = useToast();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<IEmployee>();
  const onSubmit: SubmitHandler<IEmployee> = data => {
    delete data.avatar;
    const formattedData: IEmployee = {
      ...data,
      avatar: avatarId,
      status: data.status ? 'Ativo' : 'Inativo',
      date: new Date(data.date),
    };

    employeeMutate.mutate(formattedData);
  };

  const employeeMutate = useMutation<{ message: string }, Error, IEmployee>(
    ['employee'],
    registerEmployee,
    {
      onSuccess: data => {
        reset();
        clearErrors();
        toast({
          title: data.message,
          status: 'success',
          duration: 1600,
          isClosable: true,
        });
        navigate(ROUTES.home);
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
    },
  );

  const statesQuery = useQuery<IState[], Error>({
    queryKey: ['states'],
    queryFn: fetchingStatesData,
  });

  const citiesQuery = useQuery<ICity[], Error>({
    queryKey: ['cities', selectedState],
    queryFn: () => fetchingCityByState(selectedState),
    refetchOnWindowFocus: false,
  });

  const handleSelectChange = (state: string) => {
    setSelectedState(state);
  };

  const uploadImageMutate = useMutation<string, Error, FormData>(
    ['upload'],
    sendingImage,
    {
      onSuccess: (data: string) => {
        if (data) setAvatarId(data);
      },
    },
  );

  const maxImageSize = 2 * 1024 * 1024;

  const appendImage = (image: File) => {
    if (!image) {
      return;
    }

    if (image?.type !== 'image/jpeg' && image?.type !== 'image/png') {
      toast({
        title: 'Arquivo inválido',
        description: 'Formato de arquivo inválido',
        status: 'error',
        duration: 1600,
        isClosable: true,
      });
      return;
    }

    if (image?.size > maxImageSize) {
      toast({
        title: 'Ultrapassou o tamanho limite',
        description: 'O tamanho máximo é de 2mb',
        status: 'error',
        duration: 1600,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('avatar', image);
    uploadImageMutate.mutate(formData);
  };

  return (
    <Flex
      as="form"
      sx={EmployeeFormStyles.formWrapper}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading sx={EmployeeFormStyles.title}>Cadastrar Funcionário</Heading>
      <Flex sx={EmployeeFormStyles.formControllWrapper}>
        <FormControl isInvalid={!!errors.avatar}>
          <FormLabel sx={EmployeeFormStyles.formLabelAvatar}>
            Foto de perfil :
          </FormLabel>
          {avatarId ? (
            <FormLabel htmlFor="upload-image">
              <Image
                src={`${process.env.REACT_APP_API_BASE_URL}/download/${avatarId}`}
                sx={EmployeeFormStyles.imageUpload}
              />
            </FormLabel>
          ) : (
            <FormLabel
              htmlFor="upload-image"
              sx={EmployeeFormStyles.circleUpload}
            >
              <PictureIcon />
            </FormLabel>
          )}
          <Input
            display="none"
            accept="image/jpeg, image/png"
            htmlSize={maxImageSize}
            id="upload-image"
            type="file"
            {...register('avatar', {
              onChange: event => appendImage(event.target.files[0]),
            })}
            name="avatar"
          />
          <Box sx={EmployeeFormStyles.formErrorWrapper}>
            <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
              {errors.avatar?.message}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <FormControl isInvalid={!!errors.status}>
          <FormLabel
            pointerEvents="none"
            sx={EmployeeFormStyles.formLabelStatus}
          >
            Ativo :
          </FormLabel>
          <Switch size="lg" {...register('status')} name="status" />
        </FormControl>
      </Flex>
      <FormControl
        isInvalid={!!errors.name}
        sx={EmployeeFormStyles.formControl}
      >
        <FormLabel sx={EmployeeFormStyles.formLabel}>Nome:</FormLabel>
        <Input
          sx={EmployeeFormStyles.input}
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
        <Box sx={EmployeeFormStyles.formErrorWrapper}>
          <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
            {errors.name?.message}
          </FormErrorMessage>
        </Box>
      </FormControl>
      <FormControl isInvalid={!!errors.cpf} sx={EmployeeFormStyles.formControl}>
        <FormLabel sx={EmployeeFormStyles.formLabel}>CPF:</FormLabel>
        <Input
          sx={EmployeeFormStyles.input}
          variant="filled"
          type="text"
          placeholder="Ex: 000.000.000-00"
          {...register('cpf', {
            required: {
              value: true,
              message: 'O campo de cpf não pode estar vazio',
            },
            validate: validatingCpf,
          })}
          name="cpf"
        />
        <Box sx={EmployeeFormStyles.formErrorWrapper}>
          <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
            {errors.cpf?.message}
          </FormErrorMessage>
        </Box>
      </FormControl>
      <FormControl
        isInvalid={!!errors.email}
        sx={EmployeeFormStyles.formControl}
      >
        <FormLabel sx={EmployeeFormStyles.formLabel}>E-mail:</FormLabel>
        <Input
          sx={EmployeeFormStyles.input}
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
        <Box sx={EmployeeFormStyles.formErrorWrapper}>
          <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
            {errors.email?.message}
          </FormErrorMessage>
        </Box>
      </FormControl>
      <FormControl
        isInvalid={!!errors.date}
        sx={EmployeeFormStyles.formControl}
      >
        <FormLabel sx={EmployeeFormStyles.formLabel}>
          Data de Contratação:
        </FormLabel>
        <Input
          sx={EmployeeFormStyles.input}
          type="date"
          {...register('date', {
            required: {
              value: true,
              message: 'A data não pode estar vazia',
            },
          })}
          name="date"
        />
        <Box sx={EmployeeFormStyles.formErrorWrapper}>
          <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
            {errors.date?.message}
          </FormErrorMessage>
        </Box>
      </FormControl>
      <FormControl isInvalid={!!errors.cep} sx={EmployeeFormStyles.formControl}>
        <FormLabel sx={EmployeeFormStyles.formLabel}>CEP:</FormLabel>
        <Input
          variant="filled"
          sx={EmployeeFormStyles.input}
          type="text"
          placeholder="Ex: 00000-000"
          {...register('cep', {
            required: {
              value: true,
              message: 'O campo de cep não pode estar vazio',
            },
            validate: validatingCep,
          })}
          name="cep"
        />
        <Box sx={EmployeeFormStyles.formErrorWrapper}>
          <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
            {errors.cep?.message}
          </FormErrorMessage>
        </Box>
      </FormControl>
      <FormControl
        isInvalid={!!errors.state}
        sx={EmployeeFormStyles.formControl}
      >
        <FormLabel sx={EmployeeFormStyles.formLabel}>Estado:</FormLabel>
        <Select
          disabled={statesQuery.isLoading}
          width="80%"
          sx={EmployeeFormStyles.select}
          variant="filled"
          icon={<ChevronDownIcon position="absolute" right="5px" />}
          {...register('state', {
            required: {
              value: true,
              message: 'O campo de estado não pode estar vazio',
            },
            onChange: e => {
              handleSelectChange(e.target.value);
            },
          })}
          name="state"
        >
          <option value="">Selecione um estado</option>
          {statesQuery.data?.map(({ sigla, nome }) => (
            <option key={sigla} value={sigla}>
              {nome}
            </option>
          ))}
        </Select>
        <Box sx={EmployeeFormStyles.formErrorWrapper}>
          <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
            {errors.state?.message}
          </FormErrorMessage>
        </Box>
      </FormControl>
      <FormControl
        isInvalid={!!errors.city}
        sx={EmployeeFormStyles.formControl}
      >
        <FormLabel sx={EmployeeFormStyles.formLabel}>Cidades:</FormLabel>
        <Select
          isDisabled={citiesQuery.data?.length === 0}
          width="80%"
          sx={EmployeeFormStyles.select}
          variant="filled"
          icon={<ChevronDownIcon position="absolute" right="5px" />}
          {...register('city', {
            required: {
              value: true,
              message: 'O campo de cidades não pode estar vazio',
            },
          })}
          name="city"
        >
          {citiesQuery.data?.map(({ id, nome }) => (
            <option key={id} value={nome}>
              {nome}
            </option>
          ))}
        </Select>
        <Box sx={EmployeeFormStyles.formErrorWrapper}>
          <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
            {errors.city?.message}
          </FormErrorMessage>
        </Box>
      </FormControl>
      <FormControl
        isInvalid={!!errors.street}
        sx={EmployeeFormStyles.formControl}
      >
        <FormLabel sx={EmployeeFormStyles.formLabel}>Logradouro:</FormLabel>
        <Input
          sx={EmployeeFormStyles.input}
          variant="filled"
          type="text"
          {...register('street', {
            required: {
              value: true,
              message: 'O campo de nome não pode estar vazio',
            },
          })}
          name="street"
        />
        <Box sx={EmployeeFormStyles.formErrorWrapper}>
          <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
            {errors.street?.message}
          </FormErrorMessage>
        </Box>
      </FormControl>
      <FormControl
        isInvalid={!!errors.district}
        sx={EmployeeFormStyles.formControl}
      >
        <FormLabel sx={EmployeeFormStyles.formLabel}>Bairro:</FormLabel>
        <Input
          sx={EmployeeFormStyles.input}
          variant="filled"
          type="text"
          {...register('district', {
            required: {
              value: true,
              message: 'O campo de nome não pode estar vazio',
            },
          })}
          name="district"
        />
        <Box sx={EmployeeFormStyles.formErrorWrapper}>
          <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
            {errors.district?.message}
          </FormErrorMessage>
        </Box>
      </FormControl>
      <Flex sx={EmployeeFormStyles.buttonWrapper}>
        <Button
          sx={EmployeeFormStyles.buttonBack}
          onClick={() => navigate(ROUTES.home)}
        >
          Cancelar
        </Button>
        <Button sx={EmployeeFormStyles.button} type="submit">
          Cadastrar
        </Button>
      </Flex>
    </Flex>
  );
};
