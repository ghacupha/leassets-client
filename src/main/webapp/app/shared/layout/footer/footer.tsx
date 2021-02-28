import './footer.scss';

import React from 'react';

import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <p>leases and assets management version 0.0.1-SNAPSHOT</p>
      </Col>
    </Row>
  </div>
);

export default Footer;
