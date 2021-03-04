import React from 'react';
import { List, Header, Grid } from 'semantic-ui-react';

const MetricScore = ({ score, short }) => {
  const fullView = true && !short;
  const calculated = score.ranges.find(item => item.checked);
  const value = score.points * calculated.multiplier;
  const scoreColor = value == score.points ? "green" : value == 0 ? "red" : "yellow";

  return (
    <Grid centered columns={2} divided>
      <Grid.Row verticalAlign="middle">
        <Grid.Column>
          <Header content={`(${score.code}) ${score.name}`} as="h4" />
          <List>
            {score.ranges.map((item, i) => ((fullView || item.checked) &&
              <List.Item
                key={`${score.code}-range-${i}`}
                active={item.checked}
                style={{
                  padding: 5,
                  backgroundColor: item.checked ? scoreColor : "none"
                }}
              >
                <List.Content floated='right'>x {item.multiplier}</List.Content>
                <List.Content>
                  <List.Icon name={item.checked ? "dot circle outline" : "circle outline"} />{item.label}
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Grid.Column>
        <Grid.Column textAlign="center" width={3}>
          <Grid.Row centered>
            <Header size="huge"
              color={scoreColor}
              content={value}
              subheader={`/ ${score.points}`}
            />
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}


export default MetricScore;
