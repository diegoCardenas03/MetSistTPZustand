import { useEffect, useState, type ChangeEvent, type FC, type FormEvent } from 'react';
import { tareaStore } from '../../../store/tareaStore';
import styles from './Modal.module.css';
import type { ITarea } from '../../../types/ITarea';
import { useTareas } from '../../../hooks/useTareas';

type IModal = {
    handleCloseModal: VoidFunction
}

const initialState: ITarea = {
    titulo: '',
    descripcion: '',
    fechaLimite: ''
}


export const Modal: FC<IModal> = ({ handleCloseModal }) => {
    const tareaActiva = tareaStore((state) => state.tareaActiva);
    const setTareaActiva = tareaStore((state) => state.setTareaActiva)

    const { crearTarea, putEditarTarea } = useTareas();

    const [formValues, setFormValues] = useState<ITarea>(initialState);

    useEffect(() => {
        if (tareaActiva) setFormValues(tareaActiva);
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [`${name}`]: value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (tareaActiva) {
            putEditarTarea(formValues);
        } else {
            crearTarea({ ...formValues, id: new Date().toDateString() });
        }
        setTareaActiva(null);
        handleCloseModal()
    }

    return (
        <div className={styles.containerPrincipalModal}>

            <div className={styles.contentPopUP}>
                <div>
                    <h3>{tareaActiva ? "Editar Tarea" : "Crear Tarea"}</h3>
                </div>
                <form onSubmit={handleSubmit} className={styles.formContent}>
                    <div>
                        <input placeholder='Ingrese un Titulo' type='text' required
                            value={formValues.titulo}
                            onChange={handleChange} autoComplete='off' name='titulo' />
                        <textarea placeholder='Ingrese una descripcion' required
                            onChange={handleChange}
                            value={formValues.descripcion} name="descripcion"></textarea>
                        <input type='date' required
                            onChange={handleChange}
                            value={formValues.fechaLimite} autoComplete='off' name='fechaLimite' />
                    </div>
                    <div className={styles.buttonCard}>
                        <button onClick={handleCloseModal}>Cancelar</button>
                        <button type='submit'>{tareaActiva ? "Editar Tarea" : "Crear Tarea"}</button>

                    </div>
                </form>
            </div>
            <div />
        </div>
    )
}
