import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.png';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Vizir" />
          <Link to="/transparency">TRANSPARÊNCIAS</Link>
          <Link to="/plan">PLANOS</Link>
          <Link to="/rate">TAXAS</Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">
                <button type="button">Meu perfil</button>
              </Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
