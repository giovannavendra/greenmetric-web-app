import React, { useEffect, useState } from 'react'
import ContextMenu from '../components/ContextMenu'
import MetricsEditor from '../components/MetricsEditor'
import NavigationSidebar from '../components/NavigationSidebar'
import { deleteDirectory, copyDiretory } from '../utils/data'
import { Form, Modal, Button } from 'semantic-ui-react'

const PageEditMetric = ({ }) => {
    const [id, setId] = useState(null)
    const [open, setOpen] = useState(false)
    const [copyName, setCopyName] = useState(null)
    const [srcName, setSrcName] = useState(null)
    const [copyType, setCopyType] = useState(null)

    const editMetric = (e, id, showMenu) => {
        e.stopPropagation();
        setId(id)
        showMenu(false)
    }

    const deleteDir = async (e, id, showMenu, type) => {
        e.stopPropagation();
        await deleteDirectory(id, type)
        showMenu(false)
        window.location.reload()
    }

    const copyDirModal = async (e, id, showMenu, type) => {
        e.stopPropagation();
        setSrcName(id)
        setCopyType(type)
        setCopyName(`${id}.copy`)
        setOpen(true)
        showMenu(false)
    }

    const copyDir = async () => {
        try {
            await copyDiretory(copyName, srcName, copyType);
        } catch (e) {
            console.log(e)
        } finally {
            window.location.reload()
        }
    }

    return (
        <div className='sidebar-page'>
            <div>
                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                >
                    <Modal.Header>Escolha um nome para o novo diretório</Modal.Header>
                    <Modal.Content >
                        <Form>
                            <Form.Input
                                value={copyName}
                                onChange={({ target }) => { setCopyName(target.value) }}
                            />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={() => copyDir()}>
                            Copiar
                        </Button>
                    </Modal.Actions>
                </Modal>
                <ContextMenu triggersList={[".metric", ".directory"]}>
                    {({ target, setShowMenu }) =>
                        <div>
                            {target?.classList.contains("directory") && (
                                <div>
                                    <p className="clickable" onClick={(e) => editMetric(e, target?.id, setShowMenu)}>
                                        Adicionar métrica ao diretório {target?.id}
                                    </p>
                                    <p className="clickable" onClick={(e) => deleteDir(e, target?.id, setShowMenu, 'dir')}>
                                        Deletar diretório {target?.id}
                                    </p>
                                    <p className="clickable" onClick={(e) => copyDirModal(e, target?.id, setShowMenu, 'dir')}>
                                        Copiar diretório {target?.id}
                                    </p>
                                </div>
                            )}
                            {target?.classList.contains("metric") && (
                                <div>
                                    <p className="clickable" onClick={(e) => editMetric(e, target?.id, setShowMenu)}>
                                        Editar métrica {target?.id}
                                    </p>
                                    <p className="clickable" onClick={(e) => deleteDir(e, target?.id, setShowMenu, 'metric')}>
                                        Deletar métrica {target?.id}
                                    </p>
                                    <p className="clickable" onClick={(e) => copyDirModal(e, target?.id, setShowMenu, 'metric')}>
                                        Copiar métrica {target?.id}
                                    </p>
                                </div>
                            )}
                        </div>
                    }
                </ContextMenu>
                <NavigationSidebar />
            </div>
            <MetricsEditor id={id} />
            <div></div>
        </div>
    )
}

export default PageEditMetric