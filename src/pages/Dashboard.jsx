import React, { useState, useEffect, createRef } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Segment, Container, Breadcrumb, List, Button, Modal, Header, Icon, Sticky, Ref, Input, Form } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';
import { calculate, editDashboard, deleteDashboard, createCategory, updateCategory, deleteCategory } from '../api/score';
import CategoryEditor from '../components/CategoryEditor';
import CategoryScore from '../components/CategoryScore';
import CategoryScoreLabel from '../components/CategoryScoreLabel';
import urls from "../utils/urls";
import { v4 as uuidv4 } from 'uuid';

const copyData = data => (
  {
    ...data,
    dashboard: { ...data.dashboard },
    categoryResults: data.categoryResults.map(el => ({
      ...el,
      category: {
        ...el.category,
        metrics: [...el.category.metrics]
      }
    })),
  }
);

const Dashboard = ({ id }) => {
  const contextRef = createRef();
  const refToScroll = createRef();
  const nameInputRef = createRef();
  const formRef = createRef();
  const [state, setState] = useState({
    open: false,
    redirect: false,
    editing: false,
    processing: false,
    loading: true,
    data: null,
    viewData: null,
    scrollRef: false,
    removedCategories: [],
  });
  const { open, redirect, processing, data, viewData, loading, editing, scrollRef, removedCategories } = state;

  const fetchScore = () => {
    calculate(id)
      .then(response => {
        setState({ ...state, data: response.data, loading: false, processing: false, editing: false });
      })
      .catch(() => {
        setState({ ...state, loading: false, processing: false, editing: false });
      });
  }

  useEffect(fetchScore, []);

  useEffect(() => {
    if (scrollRef) {
      refToScroll.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [scrollRef]);

  useEffect(() => {
    if (!data) {
      return;
    }

    setState({ ...state, viewData: copyData(data) });
  }, [data]);

  const handleDelete = () => {
    setState({ ...state, processing: true });
    deleteDashboard(id)
      .then(() => {
        setState({ ...state, redirect: urls.dashboards });
      })
      .finally(() => {
        setState({ ...state, open: false, processing: false });
      });
  }

  const handleRemoveCategory = (i) => {
    const newCategories = [...state.viewData.categoryResults].map(el => {
      if (el.category.order > i + 1) {
        el.category.order--;
      }

      return el;
    });

    const removedCategory = newCategories.splice(i, 1)[0];
    if (!removedCategory.category.isNew) {
      removedCategories.push(removedCategory.category.id)
      setState({
        ...state,
        viewData: {
          ...viewData,
          categoryResults: newCategories,
        },
        removedCategories,
      });
    }
  }

  const handleAddCategory = () => {
    const newCategories = [...state.viewData.categoryResults].map(el => {
      el.category.order++;
      return el;
    });
    newCategories.unshift({
      category: {
        isNew: true,
        id: uuidv4(),
        dashboard: id,
        name: "",
        color: "",
        weight: 0,
        order: 1,
        metrics: [],
      },
      value: 0,
      total: 0,
      metricResults: [],
    })


    setState({
      ...state,
      viewData: {
        ...viewData,
        categoryResults: newCategories,
      },
      scrollRef: 0,
    });
  }

  const handleUpdate = async () => {
    setState({ ...state, processing: true });
    const newName = nameInputRef.current.inputRef.current.value;
    const promises = viewData.categoryResults.map(result => {
      const { isNew, ...category } = result.category;
      if (isNew) {
        return createCategory(category);
      }

      return updateCategory(category.id, category);
    });

    removedCategories.map(id => {
      deleteCategory(id);
    })

    if (data.dashboard.name != newName) {
      promises.push(editDashboard(id, newName));
    }

    try {
      await Promise.all(promises);
    } finally {
      fetchScore();
    }
  }

  const handleUpdateCancel = () => {
    setState({ ...state, editing: false, viewData: copyData(data) });
  }

  const handleOrderUp = (i) => {
    const newCategory = [...state.viewData.categoryResults];
    newCategory[i].category.order--;
    newCategory[i + 1].category.order++;
    newCategory[i] = newCategory.splice(i - 1, 1, newCategory[i])[0];
    setState({
      ...state,
      viewData: {
        ...viewData,
        categoryResults: newCategory,
      },
      scrollRef: i - 1,
    });
  };

  const handleOrderDown = (i) => {
    const newCategory = [...state.viewData.categoryResults];
    newCategory[i].category.order++;
    newCategory[i + 1].category.order--;
    newCategory[i] = newCategory.splice(i + 1, 1, newCategory[i])[0];
    setState({
      ...state,
      viewData: {
        ...viewData,
        categoryResults: newCategory,
      },
      scrollRef: i + 1,
    });
  };

  const handleChangeCategory = (i, newData) => {
    const newCategories = viewData.categoryResults;
    newCategories[i] = {
      ...newCategories[i],
      category: {
        ...newData,
      },
    };
    setState({
      ...state,
      viewData: {
        ...viewData,
        categoryResults: [
          ...newCategories
        ]
      }
    })
  };

  return (
    <Container>
      {redirect && <Redirect to={redirect} />}
      <Ref innerRef={contextRef}>
        <Segment.Group>
          <Sticky context={contextRef} offset={88}>
            <Segment>
              <Breadcrumb size="massive" style={{ height: 36, lineHeight: 1.4 }}>
                <Breadcrumb.Section href={urls.dashboards} >Painéis</Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section active>{id}</Breadcrumb.Section>
              </Breadcrumb>
              <span style={{ float: "right" }} hidden={editing}>
                <Button icon="pencil" basic onClick={() => setState({ ...state, editing: true })} />
                <Button icon="trash" basic onClick={() => setState({ ...state, open: true })} />
              </span>
              <span style={{ float: "right" }} hidden={!editing}>
                <Button icon="cancel" negative basic onClick={handleUpdateCancel} disabled={processing} />
                <Button icon="check" positive basic onClick={handleUpdate} loading={processing} />
              </span>
            </Segment>
          </Sticky>
          <Segment padded loading={loading || processing}>
            {viewData && <>
              <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginBottom: 50 }}>
                {editing ?
                  <Input name="name" defaultValue={viewData.dashboard.name} style={{ flexGrow: 0, marginBottom: 8 }} ref={nameInputRef} />
                  :
                  <Header content={viewData.dashboard.name} size="huge" textAlign="center" as="h2" />
                }
                <PieChart
                  rounded
                  lineWidth="20"
                  animate
                  data={[{ value: viewData.value, color: 'blue', }]}
                  totalValue={viewData.total}
                  label={(props) => <CategoryScoreLabel key={id} {...props} color="blue" header={viewData.value} subheader={`/ ${viewData.total}`} />}
                  labelPosition={0}
                  background="#bfbfbf"
                  lengthAngle={270}
                  startAngle={135}
                  viewBoxSize={[100, 87]}
                  style={{ maxWidth: 250 }}
                />
              </div>
              <Form ref={formRef}>
                <List relaxed="very">
                  {editing && <List.Item style={{ display: "flex", justifyContent: "center" }}>
                    <Button content="Adicionar categoria" icon="plus" primary basic labelPosition="left" onClick={handleAddCategory} />
                  </List.Item>}
                  {viewData.categoryResults.map((result, i, arr) => result && (
                    <List.Item key={result.category.id} style={{ paddingLeft: editing ? 0 : 80 }}>
                      <Ref innerRef={i == scrollRef ? refToScroll : undefined} >
                        <>
                          {editing && <div style={{ paddingRight: 15, marginTop: 20, float: "left", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Button.Group>
                              <Button icon="angle up" onClick={() => handleOrderUp(i)} disabled={i == 0} />
                              <Button.Or text={i + 1} />
                              <Button icon="angle down" onClick={() => handleOrderDown(i)} disabled={i == arr.length - 1} />
                            </Button.Group>
                            <Button icon="trash" style={{ margin: 5 }} onClick={() => handleRemoveCategory(i)} />
                          </div>}
                          {editing ? <CategoryEditor data={result} onChange={data => handleChangeCategory(i, data)} /> :
                            <CategoryScore data={result} editable={editing} onEdit={() => handleClickEditCategory(i)} />}
                        </>
                      </Ref>
                    </List.Item>
                  ))}
                </List>
              </Form>
            </>}
          </Segment>
        </Segment.Group>
      </Ref>
      <Modal open={open} size='tiny'>
        <Header icon><Icon name='trash' />Remover Painel</Header>
        <Modal.Content>Deseja excluir o Painel "{id}"</Modal.Content>
        <Modal.Actions>
          <Button basic onClick={() => setState({ ...state, open: false })} disabled={processing}>
            <Icon name='remove' /> Cancelar
          </Button>
          <Button primary onClick={() => handleDelete()} loading={processing}>
            <Icon name='checkmark' /> Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
}

export default Dashboard;
