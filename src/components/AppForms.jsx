import React, { useContext } from "react";
import { Form, Segment } from "semantic-ui-react";
import {
    AppContext,
    dispatchAddEvidence,
    dispatchLoading,
    dispatchRemoveEvidence,
    dispatchSetMetric,
} from "../context/AppContext";
import { postEvidence, putMetricData } from "../utils/data";
import Question from "./Question";

const AppForms = () => {
    const { state, dispatch } = useContext(AppContext);

    const onChangeSelect = (e, { name, value }) => {
        dispatch(dispatchSetMetric(name, value));
    };

    const onChangeInput = ({ target }) => {
        dispatch(dispatchSetMetric(target.name, target.value));
    };

    const onAddEvidence = (metricId, files) => {
        files.forEach(file => {
            if (file.size < (2 << 24 - 2048)) {
                dispatch(dispatchAddEvidence(metricId, file));
            } else {
                console.log('File too large')
            }
        })
    }

    const onRemoveEvidence = (metricId, evidenceId) => {
        dispatch(dispatchRemoveEvidence(metricId, evidenceId));
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(dispatchLoading(true));
        try {
            await Promise.all(
                state.metrics.map((el) => {
                    if (!el.hasData) return null

                    if (el?.data?.hasOwnProperty("options"))
                        return putMetricData(el.id, el.data.currentOption);
                    else
                        return putMetricData(el.id, el.data);
                })
            );
            await Promise.all(
                state.metrics.reduce((acc, metric) => {
                    return [...acc, ...metric.evidences.map(evidence => evidence.action === 'UPLOAD'
                        ? postEvidence(metric.id, evidence.data) : null)]
                }, [])
            );
        } catch (e) {
            console.log(`Server Response: ${e}`);
        } finally {
            window.location.reload()
        }
    };

    return (
        <div>
            <Segment>
                <Form onSubmit={onSubmit}>
                    {state.metrics.map((el) => (
                        <Question
                            q={el}
                            key={el.id}
                            onAddEvidence={onAddEvidence}
                            onRemoveEvidence={onRemoveEvidence}
                            onChangeInput={onChangeInput}
                            onChangeSelect={onChangeSelect}
                        />
                    ))}
                    <div className='app-footer'>
                        <Form.Button
                            primary
                            color="black"
                            size="large"
                            type="submit"
                            className="centered"
                        >
                            Salvar
                        </Form.Button>
                    </div>
                </Form>
            </Segment>
        </div>
    );
};

export default AppForms;
