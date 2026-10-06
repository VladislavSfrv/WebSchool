import * as yup from 'yup';

export const registrationSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(2, 'Введите имя и фамилию')
    .max(80, 'Имя должен содержать не более 80 символов')
    .required('Это поле обязательно'),
  email: yup
    .string()
    .trim()
    .email('Введите корректный email-адрес')
    .max(120, 'Email-адрес слишком длинный')
    .required('Это поле обязательно'),
  password: yup
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .matches(/[A-Za-z]/, 'Пароль должен содержать хотя бы одну латинскую букву')
    .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
    .required('Это поле обязательно'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Подтвердите пароль'),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Введите корректный email-адрес')
    .max(120, 'Email-адрес слишком длинный')
    .required('Это поле обязательно'),
  password: yup.string().required('Введите пароль'),
});

export type RegistrationValues = yup.InferType<typeof registrationSchema>;
export type RegistrationErrors = Partial<Record<keyof RegistrationValues, string>>;
export type LoginValues = yup.InferType<typeof loginSchema>;
export type LoginErrors = Partial<Record<keyof LoginValues, string>>;
