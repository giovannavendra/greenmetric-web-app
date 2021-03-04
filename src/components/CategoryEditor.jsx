import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Grid } from 'semantic-ui-react';
import { PieChart } from 'react-minimal-pie-chart';
import { AppContext } from '../context/AppContext'

const CategoryEditor = ({ data, onChange }) => {
  const { category } = data;
  const { register, getValues } = useForm();
  const { state } = useContext(AppContext);
  const [values, setValues] = useState();
  const [debounce, setDebounce] = useState();
  const availableColors = [
    { style: { backgroundColor: "red" }, key: "red", value: "red" },
    { style: { backgroundColor: "orange" }, key: "orange", value: "orange" },
    { style: { backgroundColor: "yellow" }, key: "yellow", value: "yellow" },
    { style: { backgroundColor: "olive" }, key: "olive", value: "olive" },
    { style: { backgroundColor: "green" }, key: "green", value: "green" },
    { style: { backgroundColor: "teal" }, key: "teal", value: "teal" },
    { style: { backgroundColor: "blue" }, key: "blue", value: "blue" },
    { style: { backgroundColor: "violet" }, key: "violet", value: "violet" },
    { style: { backgroundColor: "purple" }, key: "purple", value: "purple" },
    { style: { backgroundColor: "pink" }, key: "pink", value: "pink" },
    { style: { backgroundColor: "brown" }, key: "brown", value: "brown" },
    { style: { backgroundColor: "grey" }, key: "grey", value: "grey" },
    { style: { backgroundColor: "black" }, key: "black", value: "black" },
  ]

  const flushChanges = () => {
    clearTimeout(debounce);
    const ref = setTimeout(() => {
      onChange({
        ...category,
        ...values,
        ...getValues(),
      })
    }, 300);
    setDebounce(ref);
  };

  useEffect(flushChanges, [values]);

  const handleChange = (_, props) => {
    setValues({
      ...values,
      [props.name]: props.value,
    });
  }

  return (
    <>
      <Form.Group widths="equal">
        <Form.Field>
          <label htmlFor="name">Nome</label>
          <input name="name" defaultValue={category.name} ref={register({ required: "O campo Nome é obrigatório." })} onChange={flushChanges} />
        </Form.Field>
        <Form.Field required>
          <label htmlFor="weight">Peso</label>
          <input type="number" name="weight" defaultValue={category.weight} ref={register({ required: "O campo Peso é obrigatório." })} onChange={flushChanges} />
        </Form.Field>
      </Form.Group>
      <Grid padded style={{ height: 300 }}>
        <Grid.Row columns={3} verticalAlign="middle">
          <Grid.Column width={6}>
            <Grid.Row centered verticalAlign="middle">
              <PieChart
                rounded
                lineWidth="20"
                animate
                data={[{ value: 50, color: category.color }]}
                totalValue={100}
                background="#bfbfbf"
                lengthAngle={270}
                startAngle={135}
                viewBoxSize={[100, 87]}
                style={{ width: 250, height: 220, position: "absolute" }}
              />
              <Form.Dropdown
                required
                label="Cor"
                name="color"
                defaultValue={category.color}
                selection
                fluid
                options={availableColors}
                onChange={handleChange}
                style={{ backgroundColor: category.color, width: 55 }}
              />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={10} style={{ maxHeight: 300 }}>
            <Form.Dropdown
              required
              label="Métricas"
              name="metrics"
              defaultValue={category.metrics}
              multiple
              selection
              search
              clearable
              options={state.metrics.map((metric) => ({ key: metric.id, text: metric.id, value: metric.id }))}
              onChange={handleChange}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default CategoryEditor;
