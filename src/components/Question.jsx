import React, { useRef } from "react";
import { parseSelect } from "../utils/utils";
import { Form, Button, Icon } from "semantic-ui-react";
import { servAddr } from '../utils/constants'
import { deleteEvidence } from '../utils/data'

const Question = ({
    q, disabled, onChangeSelect, onChangeInput, onAddEvidence, onRemoveEvidence
}) => {
    const inputImg = useRef(null);

    return (
        <div className="question">
            <h4>{`${q.id}. ${q.title} ${q.code ? `(${q.code})` : ""}`}</h4>
            <p>{q.description}</p>
            {q?.data?.hasOwnProperty("options") ? (
                <>
                    <Form.Select
                        disabled={disabled}
                        name={q.id}
                        options={parseSelect(q.data.options)}
                        value={q.data.currentOption}
                        onChange={onChangeSelect}
                    />
                </>
            ) : (
                    <>
                        <Form.Group widths="equal">
                            {q.hasData && (
                                <Form.Input
                                    disabled={disabled}
                                    label="Valor"
                                    name={q.id}
                                    value={q.data}
                                    onChange={onChangeInput}
                                />
                            )}
                            <Form.Input
                                label="Valor Computado"
                                disabled
                                name={q.id}
                                value={q.value}
                                onChange={onChangeInput}
                            />
                        </Form.Group>
                    </>
                )}
            {q.evidenceRequirement !== "NONE" && (
                <div
                    name="evidenceRequirement"
                    style={{
                        justifyContent:
                            q.evidenceRequirement === "REQUIRED" ? "space-between" : "flex-end",
                    }}
                >
                    {q.evidenceRequirement === "REQUIRED" && <p>Evidência Obrigatória*</p>}
                    <Button
                        disabled={disabled}
                        icon="archive"
                        type='button'
                        content="Anexar Evidência"
                        className="secondary-button"
                        onClick={() => inputImg.current.click()}
                    />
                    <input
                        onChange={({ target }) => onAddEvidence(q.id, Array.from(target.files))}
                        ref={inputImg}
                        type="file"
                        multiple
                        className="hidden" />
                </div>
            )}
            {!disabled && q.evidences.length > 0 && <div className='evidences'>
                <div className={'evidence'}>
                    <span>Baixar ZIP</span>
                    <a href={`${servAddr}/metrics/${q.id.replace('/', '-')}/zip`} >
                        <Icon name='download' />
                    </a>
                </div>
                {q.evidences.map(evidence => (
                    evidence.action !== 'DELETE'
                        ? <div key={evidence.id || evidence?.data.name} className={'evidence'}>
                            <span>{evidence.filename || evidence?.data?.name}</span>
                            {evidence.action !== 'UPLOAD' && <a href={`${servAddr}/evidence/${evidence.id}`} >
                                <Icon name='download' />
                            </a>}
                            <Icon className="clickable" name='close' onClick={() => {
                                onRemoveEvidence(q.id, evidence.id);
                                deleteEvidence(q.id, evidence.id)
                            }} />
                        </div>
                        : null
                ))}
            </div>}
        </div>
    );
};

export default Question;
