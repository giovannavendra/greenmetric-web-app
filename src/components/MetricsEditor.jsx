import React, { useEffect, useState } from 'react'
import { Form, Checkbox, Segment } from 'semantic-ui-react'
import { getMetricbyId, putMetric, postMetric } from '../utils/data'

const typesOptions = [
    { key: '1', text: 'Inteiro', value: 'INTEGER' },
    { key: '2', text: 'Real', value: 'FLOAT' },
    { key: '3', text: 'Opções', value: 'SELECT' },
]

const hasDataOptions = [
    { key: '1', text: 'Sim', value: true },
    { key: '2', text: 'Não', value: false },
]

const evidenceRequirementOptions = [
    { key: '1', text: 'Nenhuma evidência', value: 'NONE' },
    { key: '2', text: 'Evidência opcional', value: 'OPTIONAL' },
    { key: '3', text: 'Evidência obrigatória', value: 'REQUIRED' },
]

const defaultState = {
    valueType: '',
    hasData: '',
    evidenceRequirement: '',
    unit: '',
    id: '',
    title: '',
    description: '',
    expression: '',
    dependencies: '',
    data: null
}

const MetricsEditor = ({ id }) => {

    const [info, setInfo] = useState({ ...defaultState })
    const [isNewMetric, setIsNewMetric] = useState(true)
    const [options, setOptions] = useState([])
    const [orignalValueType, setOriginalValueType] = useState(null)

    useEffect(() => {
        const fetchData = async (id) => {

            setInfo(defaultState)

            if (!id) return

            try {
                const { data } = await getMetricbyId(id)
                setIsNewMetric(!!!data)
                setInfo(data)
                setOriginalValueType(data.valueType)
                if (data?.data?.hasOwnProperty('options'))
                    setOptions(data?.data?.options)
            } catch {
                setIsNewMetric(true)
                setInfo({ ...defaultState, id: `${id}/` })
            }
        }

        fetchData(id)
    }, [id])

    const handleChange = (name, value) => {
        setInfo({ ...info, [name]: value })
    }

    // TODO, it makes the metric always be a SELECT
    const onSubmit = async () => {
        let data = { ...info.data, options: options }
        if (!info.data || orignalValueType !== info.valueType)
            data = info.valueType === 'SELECT'
                ? { currentOption: options[0], options: options }
                : ''

        const submitInfo = { ...info, data }

        try {
            if (isNewMetric)
                await postMetric(submitInfo)
            else
                await putMetric(submitInfo)
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }

    const addOption = () => {
        setOptions([...options, ''])
    }

    const removeOption = () => {
        setOptions(options.slice(0, -1))
    }

    const handleChangeOption = (index, value) => {
        const newOptions = [...options]
        newOptions[index] = value
        setOptions(newOptions)
    }

    return (
        <Segment>
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <Checkbox
                        checked={!isNewMetric}
                        label={'Atualizar ID'}
                        onChange={(e, { checked }) => { setIsNewMetric(!checked) }} />
                </Form.Field>
                <Form.Group widths='equal'>
                    <Form.Select
                        options={typesOptions}
                        placeholder='Tipo'
                        label='Tipo'
                        name='valueType'
                        value={info.valueType}
                        onChange={(e, { name, value }) => handleChange(name, value)}
                    />
                    <Form.Select
                        options={hasDataOptions}
                        placeholder='O campo é editável?'
                        label='Resposta'
                        name='hasData'
                        value={info.hasData}
                        onChange={(e, { name, value }) => handleChange(name, value)}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Select
                        options={evidenceRequirementOptions}
                        placeholder='O campo possui evidência?'
                        label='Evidência'
                        name='evidenceRequirement'
                        value={info.evidenceRequirement}
                        onChange={(e, { name, value }) => handleChange(name, value)}
                    />
                    <Form.Input
                        label="Unidade"
                        placeholder="Ex: m², %"
                        name='unit'
                        value={info.unit}
                        onChange={({ target }) => handleChange(target.name, target.value)}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input
                        disabled={!isNewMetric}
                        label="ID"
                        placeholder="Valor único de identificação da métrica no banco de dados"
                        name='id'
                        value={info.id}
                        onChange={({ target }) => handleChange(target.name, target.value)}
                    />
                    <Form.Input
                        label="Título"
                        placeholder="Nome da métrica"
                        name='title'
                        value={info.title}
                        onChange={({ target }) => handleChange(target.name, target.value)}
                    />
                </Form.Group>
                <Form.TextArea
                    label="Descrição"
                    placeholder="Descreva em palavras como calcular esta métrica"
                    name='description'
                    value={info.description}
                    onChange={({ target }) => handleChange(target.name, target.value)}
                />
                <Form.Input
                    label="Expressão"
                    placeholder="Fórmula matemática para calcular a métrica"
                    name='expression'
                    value={info.expression}
                    onChange={({ target }) => handleChange(target.name, target.value)}
                />
                {info.valueType === 'SELECT' &&
                    <>
                        <p>Opções</p>
                        {options.map((el, index) =>
                            <Form.Input
                                key={index}
                                placeholder="Opção 1"
                                name='options'
                                value={el}
                                onChange={({ target }) => handleChangeOption(index, target.value)}
                            />)}
                        <Form.Group>
                            <Form.Button
                                color='green'
                                type='button'
                                onClick={() => { addOption() }}>
                                Adicionar
                            </Form.Button>
                            <Form.Button
                                color='red'
                                type='button'
                                onClick={() => { removeOption() }}>
                                Remover
                            </Form.Button>
                        </Form.Group>
                    </>
                }
                <div className='app-footer'>
                    <Form.Button
                        primary
                        className="centered"
                        color='black'
                        type='submit'>Enviar</Form.Button>
                </div>
            </Form>
        </Segment>
    )
}

export default MetricsEditor