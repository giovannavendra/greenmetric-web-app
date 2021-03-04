
import React, { useState, useEffect } from 'react';
import { Segment, Container, Breadcrumb, List, Header } from "semantic-ui-react";
import { listDashboards } from '../api/score';
import urls from '../utils/urls';

const ListDashboard = () => {
  const [dashboards, setDashboards] = useState(null);

  useEffect(() => {
    listDashboards().then(response => {
      setDashboards(response.data);
    });
  }, [])

  return (
    <Container>
      <Segment.Group>
        <Segment loading={!dashboards}>
          <Breadcrumb size="massive">
            <Breadcrumb.Section active>Painéis</Breadcrumb.Section>
          </Breadcrumb>
        </Segment>
        <Segment>
          <List divided relaxed>
            <List.Item href={`${urls.dashboardCreation}`}>
              <List.Icon name='plus' size='large' verticalAlign='middle' style={{ paddingLeft: 2, paddingRight: 9 }} />
              <List.Content verticalAlign="middle">
                <Header color="blue" size="small">Criar novo Dashboard</Header>
              </List.Content>
            </List.Item>
            {dashboards && dashboards.map(dash => (
              <List.Item href={`${urls.dashboardDetails}/${dash.id}`} key={dash.id}>
                <List.Icon name='chart pie' size='large' verticalAlign='middle' />
                <List.Content>
                  <Header color="blue" size="small">{dash.name}</Header>
                  <List.Description>id: {dash.id}</List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      </Segment.Group>
    </Container>
  );
}

export default ListDashboard;
