import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Container, Grid, Header } from 'semantic-ui-react';
import CategoryScoreLabel from './CategoryScoreLabel';
import MetricScore from './MetricScore';

const CategoryScore = ({ data }) => {
  const { category, value, total, metricResults } = data;
  const score = {
    value,
    color: category.color || "green",
  };

  return (
    <Container>
      <Header content={`${category.name} [${category.weight}%]`} color={category.color} style={{ display: "inline-block", marginRight: 15 }} />
      <Grid padded style={{ height: 300 }}>
        <Grid.Row columns={3} verticalAlign="middle">
          <Grid.Column width={6}>
            <Grid.Row centered verticalAlign="middle">
              <PieChart
                rounded
                lineWidth="20"
                animate
                data={[score]}
                totalValue={total}
                label={(props) => <CategoryScoreLabel key={category.id} {...props} color={category.color} header={value} subheader={`/ ${total}`} />}
                labelPosition={0}
                background="#bfbfbf"
                lengthAngle={270}
                startAngle={135}
                viewBoxSize={[100, 87]}
                style={{ maxWidth: 250 }}
              />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={10} style={{ maxHeight: 300, overflowY: 'auto' }}>
            <Grid stackable divided="vertically">
              {metricResults.map(score => (
                <Grid.Row key={score.code}>
                  <MetricScore score={score} />
                </Grid.Row>
              ))}
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default CategoryScore;
