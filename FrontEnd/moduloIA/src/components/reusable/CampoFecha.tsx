import { useEffect, useId, useRef, useState } from 'react';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { format, isValid, parse } from 'date-fns';
import { DayPicker } from 'react-day-picker';

const CampoFecha = ({ selectedDate, setSelectedDate, isEditable = false }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const dialogId = useId();
    const headerId = useId();

    // Mantenga el mes en estado para controlar el calendario cuando cambien la entrada
    const [month, setMonth] = useState(new Date());

    // Mantener el valor de entrada en estado
    const [inputValue, setInputValue] = useState(selectedDate != null ? selectedDate.toLocaleDateString() : '');

    // Mantener la visibilidad del diagro de diálogo en estado
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Función para alterar la visibilidad del cuadro de diálogo
    const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

    // Hook para controlar el comportamiento de desplazamiento del cuerpo y el cambio de enfoque
    useEffect(() => {
        const handleBodyScroll = (isOpen: boolean) => {
            document.body.style.overflow = isOpen ? 'hidden' : '';
        };
        if (!dialogRef.current) return;
        if (isDialogOpen) {
            handleBodyScroll(true);
            dialogRef.current.showModal();
        } else {
            handleBodyScroll(false);
            dialogRef.current.close();
        }
        return () => {
            handleBodyScroll(false);
        };
    }, [isDialogOpen]);

    const handleDayPickerSelect = (date: Date | undefined) => {
        if (!date) {
            setInputValue('');
            setSelectedDate(undefined);
        } else {
            setSelectedDate(date);
            setInputValue(format(date, 'MM/dd/yyyy'));
        }
        dialogRef.current?.close();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); // Mantener el valor de entrada sincronizado

        const parsedDate = parse(e.target.value, 'MM/dd/yyyy', new Date());

        if (isValid(parsedDate)) {
            setSelectedDate(parsedDate);
            setMonth(parsedDate);
        } else {
            setSelectedDate(undefined);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                    style={{
                        fontSize: 'inherit',
                        border: '1px solid #ddd',
                        padding: '10px',
                        borderRadius: '10px',
                    }}
                    id="date-input"
                    type="text"
                    value={inputValue}
                    disabled={isEditable}
                    placeholder="MM/dd/yyyy"
                    onChange={handleInputChange}
                />
                {isEditable ? '':(
                  <button
                        style={{
                            fontSize: 'inherit',
                            backgroundColor: 'white',
                            border: '2px solid #ddd',
                            borderRadius: '10px',
                            cursor: 'pointer',
                        }}
                        onClick={() => toggleDialog()}
                        aria-controls="dialog"
                        aria-haspopup="dialog"
                        aria-expanded={isDialogOpen}
                        aria-label="Abrir el calendario para elegir la fecha de reserva"
                    >
                        <CalendarMonthRoundedIcon color="info" />
                    </button>
                )
              }
            </div>
            <p aria-live="assertive" aria-atomic="true">
                {selectedDate !== undefined
                    ? selectedDate.toDateString()
                    : isEditable ? '' : 'Por favor, escriba o elija una fecha'}
            </p>
            <dialog
                role="dialog"
                ref={dialogRef}
                id={dialogId}
                aria-modal
                aria-labelledby={headerId}
                onClose={(e) => {
                    e.stopPropagation();
                    setIsDialogOpen(false);
                }}
            >
                <DayPicker
                    month={month}
                    onMonthChange={setMonth}
                    autoFocus
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDayPickerSelect}
                    footer={
                        selectedDate !== undefined && `Selected: ${selectedDate.toDateString()}`
                    }
                />
            </dialog>
        </div>
    );
};
export { CampoFecha };
