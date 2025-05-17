import { useEffect, useState } from 'react';
import { tareaStore } from '../../../store/tareaStore';
import styles from './ListTareas.module.css';
import { getAllTareas } from '../../../http/tareas';
import { CartList } from '../CartList/CartList';
import { Modal } from '../Modal/Modal';
import type { ITarea } from '../../../types/ITarea';
import { useTareas } from '../../../hooks/useTareas';
export const ListTareas = () => {
 


    const setTareaActiva = tareaStore((state) => state.setTareaActiva);

    const {getTareas, tareas} = useTareas()
 

    useEffect(() => {
        getTareas();
    }, [])

    const [openModalTarea, setOpenModalTarea] = useState(false);

    const handleOpenModalCreate = () => {
    setTareaActiva(null); // Limpia la tarea activa
    setOpenModalTarea(true);
};

    const handleOpenModalEdit = (tarea:ITarea) => {
        setTareaActiva(tarea);
        setOpenModalTarea(true);
    }

    const handleCloseModal = () => {
        setOpenModalTarea(false);
    }
     
    return (
        <>
        <div className={styles.containerPrincipalListTareas}>
            <div className={styles.containerTitleAndButton}>
                <h2>Lista de Tareas</h2>
                <button onClick={handleOpenModalCreate}>Agregar Tarea</button>
            </div>
            <div className={styles.containerList}>
                {
                    tareas.length > 0 ?
                    tareas.map((tarea) => (<CartList key={tarea.id} handleOpenModalEdit={handleOpenModalEdit} tarea = {tarea} />)) : <div>
                        <h3>No hay Tareas</h3>
                    </div>
                }
            </div>
        </div>
        {openModalTarea && <Modal handleCloseModal={handleCloseModal} />}
        </>
    )
}
