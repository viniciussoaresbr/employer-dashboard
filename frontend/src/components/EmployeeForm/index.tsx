import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Select,
  Switch,
  useToast,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';

import React, { useState, useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EmployeeFormStyles } from './styles';
import {
  validatingCep,
  validatingCpf,
  validatingEmail,
} from '../../utils/validators';
import { IEmployee } from '../../types/employee';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchingCityByState,
  fetchingStatesData,
  fetchingAddressByCep,
} from '../../service/getLocation';
import { ICity, IState } from '../../types/location';
import { PictureIcon } from '../../assets/PictureIcon';
import { EmployeeContext } from '../../contexts/Employee';
import { AxiosError } from 'axios';

interface EmployeeFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialData?: IEmployee;
}

export const EmployeeForm = ({
  onSuccess,
  onCancel,
  initialData,
}: EmployeeFormProps) => {
  const { sendingImage, registerEmployee, updateEmployee } =
    useContext(EmployeeContext);
  const queryClient = useQueryClient();
  const [selectedState, setSelectedState] = useState(initialData?.state || '');
  const [avatarId, setAvatarId] = useState(initialData?.avatar || '');
  const [addressCity, setAddressCity] = useState(initialData?.city || '');
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<IEmployee>({
    mode: 'onBlur',
    defaultValues: initialData
      ? ({
          ...initialData,
          date: initialData.date
            ? new Date(initialData.date).toISOString().split('T')[0]
            : undefined,
          status: initialData.status === 'Ativo',
        } as any)
      : undefined,
  });

  useEffect(() => {
    if (initialData) {
      setSelectedState(initialData.state);
      setAvatarId(initialData.avatar || '');
      setAddressCity(initialData.city);
    }
  }, [initialData]);

  const onSubmit: SubmitHandler<IEmployee> = data => {
    const formattedData: IEmployee = {
      ...data,
      avatar: avatarId,
      status: data.status ? 'Ativo' : 'Inativo',
      date: new Date(data.date),
    };

    if (initialData?.id) {
      delete formattedData.id;
      delete formattedData.formattedDate;

      employeeUpdateMutate.mutate({
        id: initialData.id,
        employee: formattedData,
      });
    } else {
      employeeMutate.mutate(formattedData);
    }
  };

  const employeeUpdateMutate = useMutation<
    { message: string },
    Error,
    { id: string; employee: IEmployee }
  >(({ id, employee }) => updateEmployee(id, employee), {
    onSuccess: data => {
      queryClient.invalidateQueries(['employee']);
      toast({
        title: data.message,
        status: 'success',
        duration: 1600,
        isClosable: true,
      });
      if (onSuccess) onSuccess();
    },
    onError: error => {
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data.message,
          status: 'error',
          duration: 1600,
          isClosable: true,
        });
      }
    },
  });

  const employeeMutate = useMutation<{ message: string }, Error, IEmployee>(
    ['employee'],
    registerEmployee,
    {
      onSuccess: data => {
        queryClient.invalidateQueries(['employee']);
        reset();
        clearErrors();
        toast({
          title: data.message,
          status: 'success',
          duration: 1600,
          isClosable: true,
        });
        if (onSuccess) onSuccess();
      },
      onError: error => {
        if (error instanceof AxiosError) {
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
    enabled: !!selectedState,
  });

  useEffect(() => {
    if (citiesQuery.isSuccess && addressCity) {
      const cityExists = citiesQuery.data.some(
        city => city.nome === addressCity,
      );
      if (cityExists) {
        setValue('city', addressCity, { shouldValidate: true });
        setAddressCity('');
      }
    }
  }, [citiesQuery.isSuccess, citiesQuery.data, addressCity, setValue]);

  const handleSelectChange = (state: string) => {
    setSelectedState(state);
  };

  const handleCepChange = async (cep: string) => {
    const cleanedCep = cep.replace(/\D/g, '');
    if (cleanedCep.length === 8) {
      try {
        const address = await fetchingAddressByCep(cleanedCep);
        if (address && !address.erro) {
          setValue('state', address.uf, { shouldValidate: true });
          setSelectedState(address.uf);
          setValue('street', address.logradouro, { shouldValidate: true });
          setValue('district', address.bairro, { shouldValidate: true });
          setAddressCity(address.localidade);
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }
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
    if (!image) return;

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
    <VStack
      as="form"
      sx={EmployeeFormStyles.formWrapper}
      onSubmit={handleSubmit(onSubmit)}
      align="stretch"
      spacing={6}
    >
      {/* Personal Info Section */}
      <Box>
        <Text sx={EmployeeFormStyles.sectionTitle}>Informações Pessoais</Text>
        <Flex sx={EmployeeFormStyles.avatarSection} mb={4}>
          <FormControl isInvalid={!!errors.avatar} w="auto">
            {avatarId ? (
              <FormLabel htmlFor="upload-image" m={0}>
                <Image
                  src={`${process.env.REACT_APP_API_BASE_URL}/download/${avatarId}`}
                  sx={EmployeeFormStyles.imageUpload}
                />
              </FormLabel>
            ) : (
              <FormLabel
                htmlFor="upload-image"
                sx={EmployeeFormStyles.circleUpload}
                m={0}
              >
                <PictureIcon />
              </FormLabel>
            )}
            <Input
              display="none"
              accept="image/jpeg, image/png"
              id="upload-image"
              type="file"
              {...register('avatar', {
                onChange: event => appendImage(event.target.files[0]),
              })}
            />
          </FormControl>
          <FormControl display="flex" alignItems="center" w="auto">
            <FormLabel mb="0" sx={EmployeeFormStyles.formLabel} mr={3}>
              Status Ativo:
            </FormLabel>
            <Switch size="md" colorScheme="blue" {...register('status')} />
          </FormControl>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel sx={EmployeeFormStyles.formLabel}>
              Nome Completo
            </FormLabel>
            <Input
              sx={EmployeeFormStyles.input}
              placeholder="Ex: João Silva"
              {...register('name', {
                required: 'O nome é obrigatório',
              })}
            />
            <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
              {errors.name?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.cpf}>
            <FormLabel sx={EmployeeFormStyles.formLabel}>CPF</FormLabel>
            <Input
              sx={EmployeeFormStyles.input}
              placeholder="000.000.000-00"
              {...register('cpf', {
                required: 'O CPF é obrigatório',
                validate: validatingCpf,
              })}
            />
            <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
              {errors.cpf?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel sx={EmployeeFormStyles.formLabel}>E-mail</FormLabel>
            <Input
              sx={EmployeeFormStyles.input}
              placeholder="joao@exemplo.com"
              {...register('email', {
                required: 'O e-mail é obrigatório',
                validate: validatingEmail,
              })}
            />
            <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
              {errors.email?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.date}>
            <FormLabel sx={EmployeeFormStyles.formLabel}>
              Data de Contratação
            </FormLabel>
            <Input
              sx={EmployeeFormStyles.input}
              type="date"
              {...register('date', {
                required: 'A data é obrigatória',
              })}
            />
            <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
              {errors.date?.message}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>
      </Box>

      {/* Address Section */}
      <Box>
        <Text sx={EmployeeFormStyles.sectionTitle}>Endereço</Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <FormControl isInvalid={!!errors.cep}>
            <FormLabel sx={EmployeeFormStyles.formLabel}>CEP</FormLabel>
            <Input
              sx={EmployeeFormStyles.input}
              placeholder="00000-000"
              {...register('cep', {
                required: 'O CEP é obrigatório',
                validate: validatingCep,
                onChange: e => handleCepChange(e.target.value),
              })}
            />
            <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
              {errors.cep?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.state}>
            <FormLabel sx={EmployeeFormStyles.formLabel}>Estado</FormLabel>
            <Select
              sx={EmployeeFormStyles.select}
              placeholder="Selecione"
              {...register('state', {
                required: 'O estado é obrigatório',
                onChange: e => handleSelectChange(e.target.value),
              })}
            >
              {statesQuery.data?.map(({ sigla, nome }) => (
                <option key={sigla} value={sigla}>
                  {nome}
                </option>
              ))}
            </Select>
            <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
              {errors.state?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.city}>
            <FormLabel sx={EmployeeFormStyles.formLabel}>Cidade</FormLabel>
            <Select
              sx={EmployeeFormStyles.select}
              placeholder="Selecione"
              isDisabled={!selectedState}
              {...register('city', {
                required: 'A cidade é obrigatória',
              })}
            >
              {citiesQuery.data?.map(({ id, nome }) => (
                <option key={id} value={nome}>
                  {nome}
                </option>
              ))}
            </Select>
            <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
              {errors.city?.message}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
          <FormControl isInvalid={!!errors.street}>
            <FormLabel sx={EmployeeFormStyles.formLabel}>Logradouro</FormLabel>
            <Input
              sx={EmployeeFormStyles.input}
              placeholder="Rua, Avenida..."
              {...register('street', {
                required: 'O logradouro é obrigatório',
              })}
            />
            <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
              {errors.street?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.district}>
            <FormLabel sx={EmployeeFormStyles.formLabel}>Bairro</FormLabel>
            <Input
              sx={EmployeeFormStyles.input}
              placeholder="Nome do bairro"
              {...register('district', {
                required: 'O bairro é obrigatório',
              })}
            />
            <FormErrorMessage sx={EmployeeFormStyles.formErrorMessage}>
              {errors.district?.message}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>
      </Box>

      <Flex sx={EmployeeFormStyles.buttonWrapper}>
        <Button
          variant="ghost"
          sx={EmployeeFormStyles.button}
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          colorScheme="blue"
          sx={EmployeeFormStyles.button}
          type="submit"
          isLoading={employeeMutate.isLoading}
        >
          Salvar Funcionário
        </Button>
      </Flex>
    </VStack>
  );
};
