import React from 'react';
import { MdDone } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from '@rocketseat/unform';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import schema from '~/validators/Profile';

import Header from '~/components/Title';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';

import { Container, Content } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} schema={schema} onSubmit={handleSubmit}>
        <Header text="Gerenciando perfil" />
        <Content>
          <TextInput
            name="name"
            label="NOME COMPLETO"
            type="text"
            placeholder="John Due"
          />
          <TextInput
            name="email"
            label="ENDEREÇO DE E-MAIL"
            type="email"
            placeholder="exemplo@email.com"
          />
          <hr />
          <TextInput
            name="oldPassword"
            label="SENHA ATUAL"
            type="password"
            placeholder="*************"
          />
          <TextInput
            name="password"
            label="NOVA SENHA"
            type="password"
            placeholder="*************"
          />
          <TextInput
            name="confirmPassword"
            label="CONFIRMAÇÃO DE SENHA"
            type="password"
            placeholder="*************"
          />

          <Button
            type="submit"
            color="#21507c"
            text="SALVAR"
            icon={<MdDone size={20} color="#FFF" />}
          />

          <Button
            type="button"
            color="#EE4D64"
            text="SAIR DO SISTEMA"
            onClick={handleSignOut}
            icon={<FiLogOut size={20} color="#FFF" />}
          />
        </Content>
      </Form>
    </Container>
  );
}
