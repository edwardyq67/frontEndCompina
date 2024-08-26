import React, { useEffect } from 'react';
import { Scheduler } from '@aldabil/react-scheduler';

function Inicio({secionid}) {
  const arregloGuardado = localStorage.getItem('miArreglo');
  const miArregloRecuperado = arregloGuardado ? JSON.parse(arregloGuardado) : [];

 
  const NueEventosStar = miArregloRecuperado.user.asistencia?.map(item => {
    const horarioInicioUTC = new Date(item.horarioInicio.split('.')[0]);
    const offsetLima = -5 * 60; // Lima está en UTC-5
    const startDate = new Date(horarioInicioUTC.getTime() + offsetLima * 60 * 1000);
    
    return {
        event_id: item.id,
        title: "Entrada",
        start: startDate,
        end: startDate // La misma hora para el inicio y fin del evento
    };
}) || [];
const NueEventosEnd = miArregloRecuperado.user.asistencia?.map(item => {
  if (!item.horarioSalida) {
      // Si horarioSalida no tiene valor, retornar un objeto vacío o un evento con valores por defecto
      return {
          event_id: item.id,
          title: "Salida",
          start: null,
          end: null
      };
  }

  // Convertir la fecha y hora a la zona horaria de Lima (UTC-5)
  const horarioSalidaUTC = new Date(item.horarioSalida.split('.')[0]);
  const offsetLima = -5 * 60; // Lima está en UTC-5
  const endDate = new Date(horarioSalidaUTC.getTime() + offsetLima * 60 * 1000);

  return {
      event_id: item.id,
      title: "Salida",
      start: endDate,
      end: endDate
  };
}) || [];

  const eventosCombinados = [...NueEventosStar, ...NueEventosEnd];
  return (
    <div className='z-20'>
      <h2 className='text-xl font-semibold'>Bienveni@: <span className='text-[#0087c8]'>{miArregloRecuperado.user.usuario} </span></h2>
      <span className='text-sm font-extralight text-[#0087c8]'>{miArregloRecuperado.user.correo}</span>
      <Scheduler
        view="month" // Configura la vista para que solo sea mensual
        selectedDate={new Date("2024-08-19")}
        editable={false}  // Desactiva la edición de eventos
        creatable={false} // Desactiva la creación de nuevos eventos
        deletable={false} // Desactiva la eliminación de eventos
        draggable={false} // Desactiva el arrastre de eventos
        resizable={false} // Desactiva el redimensionamiento de eventos
        selectable={false} // Desactiva la selección de eventos
        showToolbar={false} // Desactiva la barra de herramientas si está disponible
        events={eventosCombinados}// Asegúrate de pasar los eventos correctamente
        translations={{
          navigation: {
            month: "Mes",
            week: "Semana",
            day: "Día",
            today: "Hoy"
          },
          form: {
            addTitle: "Agregar",
            editTitle: "Título",
            confirm: "Confirmar",
            delete: "Eliminar",
            cancel: "Cancelar"
          },
          event: {
            title: "Título",
            subtitle: "Subtítulo",
            start: "Inicio",
            end: "Fin",
            allDay: "Todo el día"
          },
          validation: {
            required: "Requerido",
            invalidEmail: "Correo inválido",
            onlyNumbers: "Solo números permitidos",
            min: "Mínimo {{min}} letras",
            max: "Máximo {{max}} letras"
          },
          moreEvents: "Más...",
          noDataToDisplay: "No hay datos para mostrar",
          loading: "Cargando...",
          daysOfWeek: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
          months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
        }}
      />
      <style >{`
        .css-e572m3:first-of-type {
          z-index: 20;
        }
        .css-1j5p8wz:first-of-type {
          z-index: 20;
        }
        .css-1of3mzj .rs__cell.rs__time {
          z-index: 20;
        }
        .css-xkctyi:first-of-type {
          z-index: 20;
        }
        .css-anhyye .rs__cell.rs__time {
          z-index: 20;
        }
      `}</style>
    </div>
  );
}

export default Inicio;
