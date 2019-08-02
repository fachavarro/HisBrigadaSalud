import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/brigada">
      <Translate contentKey="global.menu.entities.brigada" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/servidor-api">
      <Translate contentKey="global.menu.entities.servidorApi" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/usuario">
      <Translate contentKey="global.menu.entities.usuario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/paciente">
      <Translate contentKey="global.menu.entities.paciente" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/atencion">
      <Translate contentKey="global.menu.entities.atencion" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/brigada">
      <Translate contentKey="global.menu.entities.brigada" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/servidor-api">
      <Translate contentKey="global.menu.entities.servidorApi" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/usuario">
      <Translate contentKey="global.menu.entities.usuario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/paciente">
      <Translate contentKey="global.menu.entities.paciente" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/medicamento">
      <Translate contentKey="global.menu.entities.medicamento" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/procedimiento">
      <Translate contentKey="global.menu.entities.procedimiento" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/atencion">
      <Translate contentKey="global.menu.entities.atencion" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
