import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.png';

import { signUpRequest } from '~/store/modules/auth/actions';

import SubmitButton from '~/components/Button';
import TextInput from '~/components/TextInput';

import schema from '~/validators/SignUp';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="Vizir" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <TextInput
          name="name"
          type="text"
          label="NOME COMPLETO"
          placeholder="John Due"
        />
        <TextInput
          name="email"
          type="email"
          label="SEU E-MAIL"
          placeholder="exemplo@email.com"
        />
        <TextInput
          name="password"
          type="password"
          label="SUA SENHA"
          placeholder="*************"
        />

        <SubmitButton
          type="submit"
          color="#EE4D64"
          text={loading ? '' : 'Criar conta'}
          icon={loading && <AiOutlineLoading3Quarters size={20} color="#FFF" />}
          loading={loading}
        />
        <Link to="/">Já tenho conta</Link>
      </Form>
    </>
  );
}
